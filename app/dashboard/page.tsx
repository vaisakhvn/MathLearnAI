'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, MessageCircleQuestion, Trophy, Target, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';

// this is the main dashboard page that displays user statistics and quick actions
// it fetches user stats from firebase on component mount using the user id
export default function DashboardPage() {
    const { user, logout } = useAuth();


    return (
        <main className="min-h-screen bg-background text-foreground p-6 pt-24">
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <header className="flex justify-between items-center mb-10 max-w-7xl mx-auto w-full">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Welcome back, {user?.displayName || user?.email?.split('@')[0] || "Student"}!
                    </h1>
                    <p className="text-muted-foreground mt-1">Ready to solve some math today?</p>
                </div>
                {/* Mobile logout can go here, but main nav usually handles it. */}
            </header>


            {/* Quick Actions */}
            <section className="max-w-7xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/onboarding" className="group">
                        <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 p-8 rounded-2xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all cursor-pointer h-full relative overflow-hidden">
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
                                <BookOpen className="w-48 h-48" />
                            </div>
                            <div className="relative z-10">
                                <div className="p-3 bg-indigo-500 w-fit rounded-lg mb-4 text-white">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Practice Math</h3>
                                <p className="text-muted-foreground mb-6">Pick a chapter and start solving problems on the whiteboard.</p>
                                <Button className="bg-indigo-600 hover:bg-indigo-700">Continue Learning</Button>
                            </div>
                        </div>
                    </Link>

                    <Link href="/doubt" className="group">
                        <div className="bg-gradient-to-br from-cyan-900/50 to-slate-900 p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-pointer h-full relative overflow-hidden">
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
                                <MessageCircleQuestion className="w-48 h-48" />
                            </div>
                            <div className="relative z-10">
                                <div className="p-3 bg-cyan-500 w-fit rounded-lg mb-4 text-white">
                                    <MessageCircleQuestion className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Instant Doubt Solver</h3>
                                <p className="text-muted-foreground mb-6">Stuck on a specific question? Ask our AI tutor for a hint.</p>
                                <Button variant="secondary" className="bg-cyan-950 text-cyan-200 hover:bg-cyan-900">Ask a Doubt</Button>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    );
}

