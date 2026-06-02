'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, BookOpen, GraduationCap, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SYLLABUS_DATA, type Board, type Grade, type Chapter } from '@/lib/syllabus';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

// this is the onboarding wizard that helps users customize their learning experience
// it guides them through selecting their board grade and specific chapters
export default function Onboarding() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [board, setBoard] = useState<Board | null>(null);
    const [grade, setGrade] = useState<Grade | null>(null);
    const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

    const handleNext = () => setStep((s) => s + 1);
    const handleBack = () => {
        if (step === 1) {
            router.push('/dashboard');
        } else {
            setStep((s) => s - 1);
        }
    };

    const toggleChapter = (id: string) => {
        setSelectedChapters((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const startSession = () => {
        // In a real app, save to backend/context
        const params = new URLSearchParams();
        if (board) params.set('board', board);
        if (grade) params.set('grade', grade);
        if (selectedChapters.length > 0) params.set('chapters', selectedChapters.join(','));

        // Navigate to Whiteboard/Practice area
        router.push(`/practice?${params.toString()}`);
    };

    // Get available chapters based on selection
    const availableChapters = (board && grade && SYLLABUS_DATA[board] && SYLLABUS_DATA[board][grade])
        ? SYLLABUS_DATA[board][grade]
        : [];

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-4xl z-10">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Let's Personalize Your Learning
                    </h1>
                    <p className="text-muted-foreground mt-2">Step {step} of 3</p>
                    {/* Progress Bar */}
                    <div className="w-full max-w-sm mx-auto h-2 bg-secondary rounded-full mt-4 overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex justify-center"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                                <Button
                                    variant="outline"
                                    className={cn("h-32 text-xl flex flex-col gap-2 border-2", board === 'CBSE' ? "border-primary bg-primary/10" : "border-border")}
                                    onClick={() => setBoard('CBSE')}
                                >
                                    <School className="w-8 h-8" />
                                    CBSE
                                </Button>
                                <Button
                                    variant="outline"
                                    className={cn("h-32 text-xl flex flex-col gap-2 border-2", board === 'ICSE' ? "border-primary bg-primary/10" : "border-border")}
                                    onClick={() => {
                                        setBoard('ICSE');
                                        router.push('/coming-soon');
                                    }}
                                >
                                    <BookOpen className="w-8 h-8" />
                                    ICSE
                                </Button>
                                <Button
                                    variant="outline"
                                    className={cn("h-32 text-xl flex flex-col gap-2 border-2", board === 'IB' ? "border-primary bg-primary/10" : "border-border")}
                                    onClick={() => {
                                        setBoard('IB');
                                        router.push('/coming-soon');
                                    }}
                                >
                                    <GraduationCap className="w-8 h-8" />
                                    IB
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col items-center"
                        >
                            <h2 className="text-xl font-semibold mb-6">Which grade are you in?</h2>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                {['6', '7', '8', '9', '10', '11', '12'].map((g) => (
                                    <Button
                                        key={g}
                                        variant="outline"
                                        className={cn("h-16 w-24 text-lg border-2", grade === g ? "border-primary bg-primary/10" : "border-border")}
                                        onClick={() => setGrade(g as Grade)}
                                    >
                                        Class {g}
                                    </Button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full"
                        >
                            <h2 className="text-xl font-semibold mb-6 text-center">Select chapters to practice</h2>

                            {availableChapters.length === 0 ? (
                                <div className="text-center text-muted-foreground p-8 border border-dashed rounded-lg">
                                    No chapters found for this Board/Grade combination in our demo data. <br />
                                    (Try CBSE Class 10)
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {availableChapters.map((chapter) => (
                                        <div
                                            key={chapter.id}
                                            onClick={() => toggleChapter(chapter.id)}
                                            className={cn(
                                                "cursor-pointer p-4 rounded-xl border transition-all hover:scale-[1.02]",
                                                selectedChapters.includes(chapter.id)
                                                    ? "bg-primary/20 border-primary shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                                                    : "bg-card border-border hover:border-primary/50"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg">{chapter.title}</h3>
                                                {selectedChapters.includes(chapter.id) && <Check className="w-5 h-5 text-primary" />}
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">{chapter.description}</p>
                                            <div className="flex gap-2 flex-wrap mt-3">
                                                {chapter.topics.slice(0, 2).map((t, i) => (
                                                    <span key={i} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Navigation */}
                <div className="mt-12 flex justify-between items-center max-w-2xl mx-auto w-full">
                    <Button variant="ghost" onClick={handleBack}>
                        Back
                    </Button>

                    <Button
                        onClick={step === 3 ? startSession : handleNext}
                        disabled={(step === 1 && !board) || (step === 2 && !grade) || (step === 3 && selectedChapters.length === 0)}
                        className="px-8"
                        size="lg"
                    >
                        {step === 3 ? "Start Learning" : "Next"}
                        {step !== 3 && <ChevronRight className="ml-2 w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </main>
    );
}
