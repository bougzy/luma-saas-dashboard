"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { useFinishLoading } from "@/hooks/use-auth";

const STEPS = [
  "Connecting to Lumina...",
  "Loading your workspace...",
  "Initializing AI engine...",
  "Preparing dashboard...",
];

export function LoadingScreen() {
  const finishLoading = useFinishLoading();
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Advance through steps
    const stepTimer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 600);

    // Smooth progress bar
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        // Ease-out progression
        const remaining = 100 - prev;
        const increment = Math.max(0.8, remaining * 0.06);
        return Math.min(100, prev + increment);
      });
    }, 30);

    // Finish after 2.8 seconds
    const doneTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setExiting(true);
        setTimeout(() => finishLoading(), 500);
      }, 300);
    }, 2800);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      clearTimeout(doneTimer);
    };
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px]"
            />
          </div>

          {/* Logo with pulse ring */}
          <div className="relative mb-10">
            {/* Outer pulse rings */}
            <motion.div
              animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-2xl bg-indigo-500/20"
            />
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
              className="absolute inset-0 rounded-2xl bg-indigo-500/15"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-2xl shadow-indigo-500/30"
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
          </div>

          {/* Brand */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white tracking-tight mb-2"
          >
            Lumina
          </motion.h1>

          {/* Step text */}
          <div className="h-5 mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={stepIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-sm text-slate-400"
              >
                {STEPS[stepIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="w-56 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Spinner dots below progress */}
          <div className="flex items-center gap-1.5 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
