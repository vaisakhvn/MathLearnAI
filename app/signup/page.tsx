'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// this page handles new user registration creating accounts in firebase
// it validates inputs and handles errors like weak passwords or existing emails
export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update the user profile with the provided name
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: name
                });
            }

            router.push('/onboarding');
        } catch (err: any) {
            console.error(err);
            let msg = "Failed to create account.";
            if (err.code === 'auth/email-already-in-use') msg = "Email already in use.";
            if (err.code === 'auth/weak-password') msg = "Password is too weak.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-foreground p-4 relative overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white mb-6 px-4 py-2 rounded-full hover:bg-white/5 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                {/* Main Card */}
                <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden group">

                    {/* Top Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50 block" />

                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold bg-gradient-to-br from-white via-white to-pink-200 bg-clip-text text-transparent mb-2">Create Account</h1>
                        <p className="text-slate-400">Join MathLearnAI and start mastering.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm mb-6"
                        >
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                            <div className="relative group/input">
                                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within/input:text-pink-500 transition-colors" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all text-white placeholder:text-slate-600"
                                    placeholder="John Doe"
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within/input:text-pink-500 transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all text-white placeholder:text-slate-600"
                                    placeholder="student@example.com"
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within/input:text-pink-500 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all text-white placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    suppressHydrationWarning
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-slate-500 hover:text-white transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold mt-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-lg shadow-pink-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-slate-400">
                        Already have an account? <Link href="/login" className="text-pink-400 hover:text-pink-300 font-medium hover:underline transition-colors">Log in here</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
