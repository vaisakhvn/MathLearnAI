'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MathRenderer } from '@/components/MathRenderer';
import { INITIAL_STATE, SessionState, updateSessionState, getNextAllowedHintType, HintType } from '@/lib/cognitive-state';

interface Message {
    id: string;
    role: 'ai' | 'user';
    content: string;
}

interface TutorChatProps {
    problemContext?: string;
    externalTrigger?: number;
    initialMessage?: string;
}

// this is the core chat component where the ai tutor interacts with the user
// it manages the conversation history and cognitive state of the session
export function TutorChat({
    problemContext = "General Math Help",
    externalTrigger = 0,
    initialMessage = "Hello! I am MathLearnAI. How would you start solving this problem?"
}: TutorChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'ai', content: initialMessage }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Cognitive State
    const [sessionState, setSessionState] = useState<SessionState>(INITIAL_STATE);

    // Handle external trigger (Submit button)
    useEffect(() => {
        if (externalTrigger > 0) {
            const submitMsg: Message = {
                id: Date.now().toString(),
                role: 'user',
                content: "I want to submit my answer. Can you check my reasoning?"
            };
            setMessages(prev => [...prev, submitMsg]);

            // Treat submission as an attempt
            const nextState = updateSessionState(sessionState, { type: 'attempt' });
            setSessionState(nextState);

            // Trigger AI response automatically
            fetchResponse([...messages, submitMsg], nextState);
        }
    }, [externalTrigger]);

    const fetchResponse = async (history: Message[], currentState: SessionState) => {
        setIsLoading(true);
        try {
            // Calculate Hint Level based on POLICY
            const hintLevel = getNextAllowedHintType(currentState);
            console.log("Requesting AI with Hint Level:", hintLevel);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: history,
                    problemContext,
                    hintLevel // Send the policy level
                }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data = await response.json();

            // Should properly parse if it was a hint vs just chatter, but for now treat AI response as turn end

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: data.content
            }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: "I'm having trouble connecting to the server. Check your internet or API key."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Update state based on user action (simple turn counting for now)
        // If they ask for a hint explicitly, we might want to track that specifically,
        // but for now, every input increases "attempts" context or just progresses time.
        // Let's assume general chat is neutral, but if we wanted to be strict, we'd only increment attempts on "submissions".
        // For Phase 1, let's treat every interaction as an "attempt" to solve or get help.

        let nextState = sessionState;
        if (input.toLowerCase().includes("hint") || input.toLowerCase().includes("help")) {
            nextState = updateSessionState(sessionState, { type: 'hint', payload: 'meta' }); // track that they asked
        } else {
            nextState = updateSessionState(sessionState, { type: 'attempt' });
        }
        setSessionState(nextState);

        await fetchResponse([...messages, userMsg], nextState);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-900/50 border-l border-white/10">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/20 rounded-lg">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-sm">MathLearnAI</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "flex gap-3 max-w-[90%]",
                            msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            msg.role === 'ai' ? "bg-primary/20 text-primary" : "bg-slate-700 text-slate-300"
                        )}>
                            {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>

                        <div className={cn(
                            "p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                            msg.role === 'ai'
                                ? "bg-slate-800 border border-slate-700 rounded-tl-sm"
                                : "bg-primary text-primary-foreground rounded-tr-sm"
                        )}>
                            {msg.content && <MathRenderer content={msg.content} />}
                        </div>
                    </motion.div>
                ))}

                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900 border-t border-white/10 space-y-3">
                {/* Suggestion Chips */}
                <div className="flex gap-2 text-xs overflow-x-auto pb-2 scrollbar-none">
                    <button
                        onClick={() => setInput("Can you give me a hint?")}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors whitespace-nowrap"
                    >
                        <Lightbulb className="w-3 h-3" />
                        Give me a hint
                    </button>
                    <button
                        onClick={() => setInput("What is the formula?")}
                        className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors whitespace-nowrap"
                    >
                        Show formula
                    </button>
                </div>

                <div className="relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Explain your step or ask for help..."
                        className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 pr-12 text-sm focus:ring-primary min-h-[50px] resize-none"
                        rows={2}
                        disabled={isLoading}
                    />
                    <Button
                        size="icon"
                        className="absolute right-2 bottom-2 h-8 w-8 rounded-lg"
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
