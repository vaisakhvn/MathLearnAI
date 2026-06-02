'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// this page handles user authentication allowing existing users to sign in
// it uses firebase auth and manages error states for invalid credentials
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (err: any) {
            console.error(err);
            let msg = "Failed to login.";
            if (err.code === 'auth/invalid-credential') msg = "Invalid email or password.";
            if (err.code === 'auth/user-not-found') msg = "No account found with this email.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-foreground p-4 relative overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
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
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 block" />

                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold bg-gradient-to-br from-white via-white to-slate-400 bg-clip-text text-transparent mb-2">Welcome Back</h1>
                        <p className="text-slate-400">Sign in to continue your mastery.</p>
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

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within/input:text-primary transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all text-white placeholder:text-slate-600"
                                    placeholder="student@example.com"
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within/input:text-primary transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all text-white placeholder:text-slate-600"
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
                            className="w-full h-12 text-base font-semibold mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-slate-400">
                        Don't have an account? <Link href="/signup" className="text-primary hover:text-primary-foreground font-medium hover:underline transition-colors">Create one now</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
