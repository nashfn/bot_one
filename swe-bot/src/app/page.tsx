"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Animated claw SVG icon ─── */
function ClawIcon({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Open claw — three prongs radiating outward */}
      <motion.path
        d="M32 36 L18 10 Q14 4 10 10 L22 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      <motion.path
        d="M32 36 L32 6 Q32 0 28 6 L30 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
      <motion.path
        d="M32 36 L46 10 Q50 4 54 10 L42 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      />
      {/* Base arc */}
      <motion.path
        d="M20 40 Q32 52 44 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      />
      {/* Center dot */}
      <motion.circle
        cx="32"
        cy="36"
        r="3"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      />
    </motion.svg>
  );
}

/* ─── Typewriter terminal block ─── */
function TerminalBlock() {
  const lines = [
    { prompt: "~", cmd: "swe-bot fix auth-service --remote staging", delay: 0 },
    { prompt: "", cmd: '  scanning 847 files...', delay: 1.5, dim: true },
    { prompt: "", cmd: '  found root cause in src/middleware/jwt.ts:42', delay: 2.5, dim: true },
    { prompt: "", cmd: '  applied patch + tests passing (14/14)', delay: 3.5, accent: true },
    { prompt: "~", cmd: "swe-bot refactor ./api --to typescript", delay: 5 },
    { prompt: "", cmd: '  converting 23 modules...', delay: 6.5, dim: true },
    { prompt: "", cmd: '  done. zero type errors.', delay: 7.5, accent: true },
  ];

  return (
    <div className="relative rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden font-mono text-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/80">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-muted tracking-wider uppercase">
          terminal
        </span>
      </div>
      {/* Content */}
      <div className="p-5 space-y-1 min-h-[220px]">
        {lines.map((line, i) => (
          <TerminalLine key={i} {...line} />
        ))}
        <motion.span
          className="inline-block w-2 h-4 bg-accent ml-1 cursor-blink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8.5 }}
        />
      </div>
    </div>
  );
}

function TerminalLine({
  prompt,
  cmd,
  delay,
  dim,
  accent,
}: {
  prompt: string;
  cmd: string;
  delay: number;
  dim?: boolean;
  accent?: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setDisplayed(cmd.slice(0, idx));
      if (idx >= cmd.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [started, cmd]);

  if (!started) return null;

  const textColor = accent
    ? "text-accent"
    : dim
    ? "text-secondary"
    : "text-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="leading-relaxed"
    >
      {prompt && (
        <span className="text-accent/60 mr-2">{prompt} $</span>
      )}
      <span className={textColor}>{displayed}</span>
    </motion.div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({
  icon,
  title,
  description,
  index,
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="group relative rounded-xl border border-border bg-card/40 backdrop-blur-sm p-8 md:p-9 hover:border-accent/30 transition-all duration-500"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="text-2xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-foreground mb-2 font-sans tracking-tight">
          {title}
        </h3>
        <p className="text-secondary text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Workflow step ─── */
function WorkflowStep({
  step,
  label,
  detail,
  index,
}: {
  step: string;
  label: string;
  detail: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="flex gap-8 py-10 border-b border-border/30 last:border-0"
    >
      <span className="font-mono text-accent/40 text-sm pt-1 shrink-0">
        {step}
      </span>
      <div>
        <h3 className="text-xl font-semibold mb-2 tracking-tight">
          {label}
        </h3>
        <p className="text-secondary text-sm leading-relaxed max-w-xl">
          {detail}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Signup form ─── */
function SignupForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto"
    >
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="you@company.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 h-13 px-5 rounded-xl border border-border bg-card/60 backdrop-blur-sm text-foreground placeholder:text-muted font-mono text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="h-13 px-8 rounded-xl bg-accent text-[#06060a] font-semibold text-sm tracking-wide hover:bg-accent/90 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] active:scale-[0.97] transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Request Early Access"}
              </button>
            </div>
            {error && (
              <p className="text-red-400 font-mono text-xs text-center">
                {error}
              </p>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-5 px-6 rounded-xl border border-accent/30 bg-accent/5"
          >
            <p className="text-accent font-mono text-sm">
              You&apos;re on the list. We&apos;ll be in touch.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Floating particles ─── */
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Features data ─── */
const features = [
  {
    icon: ">>",
    title: "Local & Remote",
    description:
      "Operates on your local machine or SSHs into remote hosts, containers, and cloud instances. One interface, any environment.",
  },
  {
    icon: "{}",
    title: "Full-Stack Capable",
    description:
      "From frontend components to database migrations, CI/CD pipelines to infrastructure-as-code. No task is out of scope.",
  },
  {
    icon: "~/",
    title: "Codebase Aware",
    description:
      "Deeply understands your project structure, dependencies, and conventions. Operates with context, not guesswork.",
  },
  {
    icon: "&&",
    title: "Multi-Step Execution",
    description:
      "Chains complex workflows — diagnose, fix, test, deploy. Handles the entire lifecycle of a software task end-to-end.",
  },
  {
    icon: "^^",
    title: "Open Claw Architecture",
    description:
      "Extensible by design. Plug in your own tools, scripts, and integrations. The claw grips whatever you hand it.",
  },
  {
    icon: "**",
    title: "Audit Trail",
    description:
      "Every action logged, every change traceable. Full transparency into what was modified and why.",
  },
];

/* ─── Main page ─── */
export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen">
      {/* ─── Nav ─── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClawIcon className="w-7 h-7 text-accent" />
            <span className="font-mono font-semibold text-sm tracking-wider text-foreground">
              SWE Bot
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="text-secondary text-sm hover:text-foreground transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#signup"
              className="text-sm font-mono px-4 py-2 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300"
            >
              Get Access
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center grid-bg">
        <Particles />
        <div className="absolute inset-0 hero-glow opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-secondary tracking-wider uppercase">
              Limited Early Alpha
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-7"
          >
            Your AI engineer
            <br />
            <span className="gradient-text">for every task</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            Open-claw architecture that reaches into any codebase — local or
            remote — and handles the full spectrum of software engineering work.
          </motion.p>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="max-w-2xl mx-auto"
          >
            <TerminalBlock />
          </motion.div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="relative py-36 md:py-44 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 md:mb-28"
          >
            <span className="inline-block font-mono text-xs text-accent tracking-widest uppercase mb-5">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              One bot. Every layer.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="relative py-36 md:py-44 px-8 md:px-16 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 md:mb-28"
          >
            <span className="inline-block font-mono text-xs text-accent tracking-widest uppercase mb-5">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Point. Command. Done.
            </h2>
          </motion.div>

          <div className="space-y-0">
            {[
              {
                step: "01",
                label: "Describe the task",
                detail:
                  'Natural language or structured — "fix the flaky test in payments", "add rate limiting to /api/users", "migrate the DB schema".',
              },
              {
                step: "02",
                label: "SWE Bot operates",
                detail:
                  "Reads the codebase, reasons about the change, writes code, runs tests. On your machine or a remote host — you choose.",
              },
              {
                step: "03",
                label: "Review & ship",
                detail:
                  "Full diff, test results, and rationale presented for your review. Approve and it pushes, deploys, or hands off.",
              },
            ].map((item, i) => (
              <WorkflowStep
                key={item.step}
                step={item.step}
                label={item.label}
                detail={item.detail}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / Signup ─── */}
      <section
        id="signup"
        className="relative py-36 md:py-48 px-8 md:px-16 border-t border-border/40"
      >
        <div className="absolute inset-0 hero-glow opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ClawIcon className="w-14 h-14 text-accent mx-auto mb-10" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Join the early alpha
            </h2>
            <p className="text-secondary text-lg mb-12 max-w-md mx-auto leading-relaxed">
              We&apos;re onboarding a limited number of teams. Drop your email
              and we&apos;ll reach out when it&apos;s your turn.
            </p>
          </motion.div>
          <SignupForm />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted text-xs font-mono mt-8 tracking-wide"
          >
            No spam. No credit card. Just early access.
          </motion.p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/30 py-12 px-8 md:px-16">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ClawIcon className="w-5 h-5 text-accent/50" />
            <span className="font-mono text-xs text-muted tracking-wider">
              SWE Bot
            </span>
          </div>
          <p className="font-mono text-xs text-muted">
            &copy; {new Date().getFullYear()} SWE Bot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
