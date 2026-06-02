'use client';

import { ArrowLeft, Construction } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// this is a placeholder page for features that are still in development
// it shows a coming soon message and a button to go back
export default function ComingSoonPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center z-10"
            >
                <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <Construction className="w-8 h-8 text-yellow-500" />
                    </div>

                    <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Coming Soon
                    </h1>

                    <p className="text-muted-foreground mb-8 text-lg">
                        We are working hard to bring this curriculum to MathLearnAI. Stay tuned for updates!
                    </p>

                    <Link href="/onboarding">
                        <Button className="w-full h-12 text-base bg-white/10 hover:bg-white/20 border border-white/10">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
