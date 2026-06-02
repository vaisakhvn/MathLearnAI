'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Brain, LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface NavbarProps {
    className?: string;
}

// this is the main navigation bar that appears across the application
// it handles responsive menu toggling and authentication state display
export function Navbar({ className }: NavbarProps) {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Get display name or fallback to email username
    const displayName = user?.displayName || user?.email?.split('@')[0] || "Student";
    const initial = displayName[0].toUpperCase();

    return (
        <nav className={cn("fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center glass border-b-0 border-white/5", className)}>
            <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold tracking-tight">MathLearnAI</span>
            </div>
            <div className="gap-2 hidden md:flex items-center">
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-3 pl-4 border-l border-white/10 hover:opacity-80 transition-opacity"
                        >
                            <div className="text-right hidden lg:block">
                                <p className="text-sm font-medium leading-none">{displayName}</p>
                                <p className="text-xs text-muted-foreground">Student</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                                {initial}
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-3 w-56 rounded-xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-4 py-3 border-b border-white/5">
                                    <p className="text-sm text-white">Signed in as</p>
                                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                </div>

                                {/* Conditional Links based on current page */}
                                {pathname === '/profile' ? (
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        <UserIcon className="w-4 h-4" />
                                        My Profile
                                    </Link>
                                )}

                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link href="/login" className="px-4 py-2 hover:text-primary transition-colors">Login</Link>
                        <Link href="/signup" className="px-5 py-2 bg-primary hover:bg-primary/90 rounded-full text-white font-medium transition-all shadow-lg shadow-primary/25">
                            Get Started
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Button - Visible on small screens */}
            <div className="md:hidden flex items-center gap-4">
                {user ? (
                    <Link href="/dashboard" className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                        {initial}
                    </Link>
                ) : null}

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                    {isMenuOpen ? (
                        <LogOut className="w-6 h-6 rotate-180" /> // Using LogOut as X alternative as requested before
                    ) : (
                        // Standard Hamburger Icon
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute top-20 left-0 w-full p-4 md:hidden z-40 animate-in slide-in-from-top-4 duration-200">
                    <div className="glass-card bg-slate-900/95 border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2">
                        {!user && (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-3 rounded-xl hover:bg-white/5 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-3 rounded-xl bg-primary text-white font-medium text-center transition-transform active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}

                        {user && (
                            <>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-3 rounded-xl hover:bg-white/5 font-medium transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 font-medium text-left transition-colors"
                                >
                                    Sign Out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
