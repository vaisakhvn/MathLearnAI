'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Info } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// this page showcases a demo video of the application in action
// it is accessible even without logging in
export default function DemoPage() {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Header */}
            <header className="h-16 border-b border-white/10 flex items-center px-6 sticky top-0 bg-slate-900/80 backdrop-blur-md z-50">
                <Link href="/">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-5xl z-10 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 text-transparent bg-clip-text">
                        See MathLearnAI in Action
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                        Experience how our AI Tutor guides you step-by-step through complex problems,
                        just like a real teacher sitting next to you.
                    </p>

                    {/* Video Player Container */}
                    <div className="relative aspect-video bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden group">
                        {/* Placeholder Content - In production, this would be a <video> or <iframe> */}
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 group-hover:bg-slate-950/30 transition-colors z-10">
                            <div className="text-center p-8">
                                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm mx-auto mb-4 border border-white/20 group-hover:scale-110 transition-transform cursor-pointer shadow-2xl shadow-primary/20">
                                    <Play className="w-10 h-10 text-white ml-1 fill-white" />
                                </div>
                                <p className="text-sm text-white font-medium drop-shadow-md">Watch Promo Video</p>
                            </div>
                        </div>

                        {/* Thumbnail Image */}
                        <img
                            src="/demo-thumbnail.png"
                            alt="MathLearnAI Demo"
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                        />

                        {/* Interactive UI Overlay Simulation */}
                        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-xs font-medium text-white/90">MathLearnAI Demo.mp4</span>
                            </div>
                            <div className="text-xs text-white/50">02:15</div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link href="/signup">
                            <Button size="lg" className="px-8 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
                                Start Your Free Trial
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 rounded-lg bg-white/5 border border-white/5">
                            <Info className="w-4 h-4 text-accent" />
                            <span>This is a demo preview. No actual video file generated.</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
