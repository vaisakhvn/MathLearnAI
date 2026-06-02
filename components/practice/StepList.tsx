'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, X, ArrowRight, Loader2, Lightbulb, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { MathRenderer } from '@/components/MathRenderer';
import { cn } from '@/lib/utils';

interface Step {
    id: string;
    content: string;
    status: 'pending' | 'valid' | 'invalid';
    feedback?: string;
}

interface StepListProps {
    problemStatement: string;
    onProblemComplete?: () => void;
}

// this component manages the list of steps the user has taken
// it handles step validaton against the api and displays feedback
export function StepList({ problemStatement, onProblemComplete }: StepListProps) {
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const handleValidateStep = async () => {
        if (!currentInput.trim() || isValidating) return;

        setIsValidating(true);
        setValidationError(null);

        try {
            // Optimistic UI? No, strict logic requires server check first.
            const response = await fetch('/api/validate-step', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    problem: problemStatement,
                    previousSteps: steps.map(s => s.content),
                    currentStep: currentInput
                }),
            });

            const data = await response.json();

            if (data.isValid) {
                // Add to steps list
                const newStep: Step = {
                    id: Date.now().toString(),
                    content: currentInput,
                    status: 'valid',
                    feedback: data.feedback
                };
                setSteps(prev => [...prev, newStep]);
                setCurrentInput(''); // Clear input for next step

                // If it looks like a final answer?
                // For now, we just keep adding steps. The User can claim they are done later, 
                // or we could have the AI detect "Final Answer" state.

            } else {
                setValidationError(data.feedback || "This step doesn't seem to follow logically. Check your math.");
            }

        } catch (error) {
            console.error(error);
            setValidationError("Failed to validate step. Please try again.");
        } finally {
            setIsValidating(false);
        }
    };

    // Auto-scroll to bottom when steps change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [steps, validationError]);

    return (
        <div className="flex flex-col h-full space-y-4">
            {/* Previous Valid Steps List */}
            <div className="flex-1 space-y-4 overflow-y-auto px-1">
                <AnimatePresence>
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3"
                        >
                            <div className="flex flex-col items-center gap-1 pt-1">
                                <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center shrink-0 border border-green-500/30">
                                    <Check className="w-3.5 h-3.5" />
                                </div>
                                {index !== steps.length - 1 && <div className="w-0.5 grow bg-white/10" />}
                            </div>

                            <div className="flex-1 pb-4">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                                    <MathRenderer content={step.content} />
                                </div>
                                {step.feedback && (
                                    <p className="text-xs text-green-400 mt-1 ml-2 flex items-center gap-1">
                                        <Lightbulb className="w-3 h-3" /> {step.feedback}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {steps.length === 0 && (
                    <div className="text-center text-slate-500 py-8 italic border border-dashed border-white/10 rounded-xl">
                        Break your solution down into small steps. <br />
                        Start by writing the first equation or logical deduction.
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Current Step Input Area */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-4 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">
                        Step {steps.length + 1}
                    </span>
                    {steps.length > 2 && (
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground hover:text-white" onClick={onProblemComplete}>
                            I'm done
                        </Button>
                    )}
                </div>

                <div className="relative">
                    <textarea
                        value={currentInput}
                        onChange={(e) => {
                            setCurrentInput(e.target.value);
                            if (validationError) setValidationError(null); // Clear error on edit
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleValidateStep();
                            }
                        }}
                        placeholder="e.g. 2x + 5 = 15"
                        className={cn(
                            "w-full bg-black/20 border rounded-xl px-4 py-3 text-base focus:ring-2 transition-all resize-none min-h-[80px]",
                            validationError
                                ? "border-red-500/50 focus:ring-red-500/20"
                                : "border-white/10 focus:ring-primary/50 focus:border-transparent"
                        )}
                        suppressHydrationWarning
                        disabled={isValidating}
                    />

                    <Button
                        size="sm"
                        onClick={handleValidateStep}
                        disabled={!currentInput.trim() || isValidating}
                        className={cn(
                            "absolute right-3 bottom-3 py-1 px-3 h-8 rounded-lg shadow-lg transition-all",
                            isValidating ? "bg-slate-700" : "bg-primary hover:bg-primary/90"
                        )}
                    >
                        {isValidating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                Check <ArrowRight className="w-3 h-3 ml-1.5" />
                            </>
                        )}
                    </Button>
                </div>

                {/* Validation Feedback Display */}
                <AnimatePresence>
                    {validationError && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 flex items-start gap-2 text-sm text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                        >
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-semibold block mb-0.5">Logical Gap Detected:</span>
                                {validationError}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
