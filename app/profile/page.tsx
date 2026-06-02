'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Ensure we have auth instance if needed, or use useAuth if it exposed user object directly (it does)
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { User, Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// this page displays the user's profile information and allows them to update it
// it synchronizes with firebase auth to show current user details
export default function ProfilePage() {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    // Initialize name from user
    useEffect(() => {
        if (user?.displayName) {
            setName(user.displayName);
        }
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setSuccess('');

        try {
            await updateProfile(user, {
                displayName: name
            });
            setSuccess("Profile updated successfully!");
            // Optional: force refresh or update context if needed, but Firebase usually handles auth state updates.
            // A reload might be needed to see changes in Navbar immediately if context doesn't listen to deep object changes.
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground relative">
            <Navbar />

            <div className="pt-32 px-4 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-lg glass-card p-8 rounded-2xl border border-white/10"
                >
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-xl shadow-primary/20">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                        <h1 className="text-2xl font-bold">{user?.displayName || "Student"}</h1>
                        <p className="text-muted-foreground">{user?.email}</p>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 ml-1">Display Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        {success && (
                            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm p-3 rounded-lg text-center">
                                {success}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading || !name.trim()}
                            className="w-full h-11 bg-primary hover:bg-primary/90"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
