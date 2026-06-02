'use client';

import { TutorChat } from '@/components/practice/TutorChat';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';

// this page allows users to ask general math doubts to the ai tutor
// it initializes a chat session with a specific context for general doubts
export default function DoubtPage() {
    return (
        <div className="h-screen flex flex-col bg-background text-foreground">
            {/* Header */}
            <header className="h-14 border-b border-white/10 flex items-center px-4 justify-between bg-slate-900/50 backdrop-blur-sm z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <MessageCircleQuestion className="w-5 h-5 text-accent" />
                        <h1 className="font-semibold">Instant Doubt Solver</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col min-h-0">
                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-4 shrink-0">
                    <h2 className="text-xl font-bold mb-2 text-primary">Stuck on a problem?</h2>
                    <p className="text-muted-foreground">
                        Type your question below. MathLearnAI will help you break it down.
                        No specific chapter required—ask anything from Arithmetic to Calculus.
                    </p>
                </div>

                {/* Chat Wrapper */}
                <div className="flex-1 border border-white/10 rounded-xl overflow-hidden bg-slate-900 shadow-2xl relative min-h-0">
                    <TutorChat
                        problemContext="General Math Doubt - Any Topic"
                        initialMessage="Hello! What is your doubt today? I can help you with any math concept."
                    />
                </div>
            </div>
        </div>
    );
}
