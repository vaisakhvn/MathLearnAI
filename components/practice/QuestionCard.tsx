'use client';

import { motion } from 'framer-motion';
import { Target, BarChart2 } from 'lucide-react';
import { MathRenderer } from '@/components/MathRenderer';

// this component displays the main math problem to the user
// it uses framer motion for entrance animations and katex for math rendering
export function QuestionCard({
    problem = "Loading problem...",
    title = "Math Problem"
}: { problem?: string, title?: string }) {

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-6 mb-4 relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        {title}
                    </h2>
                    <span className="text-xs text-muted-foreground">AI Generated • Standard Difficulty</span>
                </div>
                <div className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700">
                    <BarChart2 className="w-3 h-3 text-yellow-500" />
                    <span>XP: 50</span>
                </div>
            </div>

            <div className="text-xl font-medium leading-relaxed font-mono bg-slate-900/50 p-4 rounded-lg border border-white/5">
                <MathRenderer content={problem} className="text-slate-100" />
            </div>

            {/* Decorative math symbols in background */}
            <div className="absolute -right-4 -bottom-4 text-9xl font-serif text-white/5 select-none pointer-events-none">
                ∫
            </div>
        </motion.div>
    );
}
