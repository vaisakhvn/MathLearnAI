'use client';

import { useSearchParams } from 'next/navigation';
import { TutorChat } from '@/components/practice/TutorChat';
import { QuestionCard } from '@/components/practice/QuestionCard';
import { StepList } from '@/components/practice/StepList';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Loader2, ArrowUpRight, MessageSquare, X } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { getFallbackQuestion } from '@/lib/question-bank';
import { useAuth } from '@/context/AuthContext';
import { updateUserProgress } from '@/lib/user-stats';
import { motion, AnimatePresence } from 'framer-motion';

// this component handles the core practice experience including fetching problems
// and managing the state of the question card and tutor chat
function PracticeContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const board = searchParams.get('board') || 'CBSE';
    const grade = searchParams.get('grade') || '10';
    const rawChapter = searchParams.get('chapters')?.split(',')[0];
    const chapterName = rawChapter || 'General Math';

    const [question, setQuestion] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isProblemSolved, setIsProblemSolved] = useState(false);

    // UI State for Chat
    const [isChatOpen, setIsChatOpen] = useState(false);

    const fetchProblem = async (difficulty: string = 'medium') => {
        setLoading(true);
        try {
            const res = await fetch('/api/generate-problem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ board, grade, chapter: chapterName, difficulty })
            });

            if (!res.ok) throw new Error("Failed to generate");

            const data = await res.json();
            setQuestion({
                id: 'gen-' + Date.now(),
                text: data.text,
                title: data.title,
                hint: data.hint
            });
        } catch (err) {
            console.warn("AI generation failed, using fallback:", err);
            const fallback = getFallbackQuestion(chapterName);
            setQuestion({
                id: fallback.id,
                text: fallback.text,
                title: fallback.title,
                hint: fallback.hint
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (chapterName) {
            fetchProblem();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board, grade, chapterName]);

    const handleProblemComplete = async () => {
        setIsProblemSolved(true);
        if (user) {
            updateUserProgress(user.uid, true).catch(console.error);
        }
    };

    const handleNextProblem = () => {
        setIsProblemSolved(false);
        setQuestion(null);
        fetchProblem();
    };

    return (
        <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden relative">
            {/* Header */}
            <header className="h-14 border-b border-white/10 flex items-center px-4 justify-between bg-slate-900/50 backdrop-blur-sm z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/onboarding">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="font-semibold text-sm md:text-base capitalize">{chapterName.replace(/-/g, ' ')}</h1>
                        <p className="text-xs text-muted-foreground">{board} Class {grade}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={loading}
                        onClick={() => fetchProblem('hard')}
                        className="hidden md:flex bg-slate-800 border-white/10 hover:bg-slate-700 text-slate-300"
                    >
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Try Harder
                    </Button>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden relative">
                <div className="flex-1 flex flex-col p-4 gap-4 min-w-0 h-full">
                    {loading ? (
                        <div className="glass-card p-6 rounded-2xl border border-white/10 animate-pulse">
                            <div className="h-6 w-1/3 bg-slate-700 rounded mb-4"></div>
                            <div className="h-4 w-full bg-slate-800 rounded mb-2"></div>
                            <div className="h-4 w-2/3 bg-slate-800 rounded"></div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 flex-1 min-h-0 h-full">
                            <QuestionCard problem={question?.text} title={question?.title} />

                            {/* Static Chat Trigger Button */}
                            {!isChatOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-end"
                                >
                                    <Button
                                        onClick={() => setIsChatOpen(true)}
                                        variant="ghost"
                                        className="text-primary hover:text-primary/80 hover:bg-primary/10 gap-2 text-sm font-medium"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        Ask help from AI Tutor
                                    </Button>
                                </motion.div>
                            )}

                            <div className="flex-1 min-h-0 relative h-full">
                                {isProblemSolved ? (
                                    <div className="glass-card p-8 rounded-2xl border border-green-500/20 bg-green-500/5 text-center flex flex-col items-center justify-center gap-4 h-full">
                                        <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-2">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Problem Solved!</h3>
                                        <p className="text-slate-400 max-w-md">
                                            Great job working through the steps. You've earned XP for your persistence.
                                        </p>
                                        <Button
                                            onClick={handleNextProblem}
                                            size="lg"
                                            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            Next Problem <ArrowUpRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                ) : (
                                    <StepList
                                        problemStatement={question?.text}
                                        onProblemComplete={handleProblemComplete}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Collapsible Tutor Chat Panel */}
                <AnimatePresence>
                    {isChatOpen && (
                        <>
                            {/* Backdrop for mobile */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsChatOpen(false)}
                                className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
                            />

                            {/* Chat Slide-over */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="absolute top-0 right-0 h-full w-full md:w-[400px] border-l border-white/10 bg-slate-900 shadow-2xl z-30 flex flex-col"
                            >
                                <div className="flex items-center justify-between p-3 border-b border-white/10 bg-slate-900/50">
                                    <span className="font-medium text-sm pl-2">AI Tutor</span>
                                    <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="h-8 w-8 hover:bg-white/10">
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex-1 overflow-hidden relative">
                                    <TutorChat
                                        externalTrigger={0}
                                        problemContext={question ? JSON.stringify(question) : undefined}
                                        initialMessage="Hello! I am MathLearnAI. I'm here to help you break this down step-by-step."
                                    />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Floating Chat Toggle Button Removed */}
            </div>
        </div>
    );
}

// this is the main entry point for the practice page wrapped in suspense for loading states
export default function PracticePage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-background text-foreground">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <PracticeContent />
        </Suspense>
    );
}
