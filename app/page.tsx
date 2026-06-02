'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain, GraduationCap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';

// this is the main landing page component for the application
// it checks if the user is authenticated and renders the hero section
// with animations using framer motion and various interactive elements
export default function Home() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-primary/30">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
      </div>

      {/* Navbar overlay */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-white/10"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-slate-300">The Future of Math Learning</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 text-transparent bg-clip-text"
        >
          Master Math with <br />
          <span className="text-primary/90">Intelligent Guidance</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          This was built around guiding you instead of handing over the answer. <br />
          An AI tutor that leads you step-by-step, detects your logic, and helps you think like a mathematician.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 w-full max-w-md md:w-auto"
        >
          <Link href={user ? "/dashboard" : "/signup"} className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:scale-105 transition-all shadow-xl shadow-primary/30">
            {user ? "Go to Dashboard" : "Start Learning"}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Brain className="w-8 h-8 text-pink-500" />,
              title: "Step-by-Step Logic",
              desc: "We analyze your reasoning line by line, not just the final result."
            },
            {
              icon: <Sparkles className="w-8 h-8 text-cyan-500" />,
              title: "Adaptive Hints",
              desc: "Get intelligent nudges that guide you without giving away the answer."
            },
            {
              icon: <GraduationCap className="w-8 h-8 text-yellow-500" />,
              title: "Curriculum Aligned",
              desc: "Tailored for CBSE, ICSE, and IB syllabi from Class 6 to 12."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-colors group"
            >
              <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto">
        <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/5 max-w-4xl mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-2">Core Belief</p>
              <h2 className="text-3xl md:text-4xl font-bold">The Philosophy: Cognitive Friction</h2>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Most AI tools just give you the answer. But where's the learning in that? This was built on a different principle: <strong>No Direct Answers First</strong>. It uses a Socratic approach to guide users step-by-step. It's about "Productive Struggle"—because the moment you struggle is the moment you actually learn. Deep reasoning &gt; Fast answers.
          </p>

          <div className="border-t border-white/10 pt-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-2">The Journey</p>
            <p className="text-muted-foreground leading-relaxed">
              It wasn't built completely solo—this project grew with a lot of "vibe coding" along the way. It has been a huge learning curve: integrating APIs, facing failure after failure, but never giving up. Free APIs with no limits and free hosting were searched for relentlessly. It's not perfect, but it proves that if you keep trying, you can build anything. 🚀
            </p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2025 MathLearnAI. Built with a Socratic learning approach.</p>
        <Link href="https://github.com/vaisakhvn" target="_blank" className="text-primary hover:text-primary/80">
          GitHub: vaisakhvn
        </Link>
      </footer>
    </main>
  );
}
