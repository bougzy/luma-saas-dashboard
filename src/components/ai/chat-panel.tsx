"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
} from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { suggestedQuestions } from "@/lib/mock-data";
import { generateId, cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

export function AIChatPanel() {
  const { aiPanelOpen, setAiPanelOpen } = useDashboard();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingConfidence, setStreamingConfidence] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (aiPanelOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [aiPanelOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: text.trim(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsStreaming(true);
      setStreamingConfidence(null);

      const assistantId = generateId();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          timestamp: new Date().toISOString(),
        },
      ]);

      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text.trim() }),
        });

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) throw new Error("No reader");

        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = JSON.parse(line.slice(6));

            if (data.type === "confidence") {
              setStreamingConfidence(data.value);
            } else if (data.type === "token") {
              fullContent += data.value;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: fullContent } : m
                )
              );
            } else if (data.type === "done") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: fullContent, confidence: streamingConfidence ?? undefined }
                    : m
                )
              );
            }
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: "Sorry, I encountered an error. Please try again." }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, streamingConfidence]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <AnimatePresence>
      {aiPanelOpen && (
        <>
          {/* Backdrop - mobile only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setAiPanelOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[440px] bg-slate-950 border-l border-white/5 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">Lumina AI</h2>
                  <p className="text-xs text-slate-400">Business Intelligence Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setAiPanelOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Ask Lumina AI
                  </h3>
                  <p className="text-sm text-slate-400 mb-6 max-w-xs">
                    Get instant insights about your business metrics, customer health, and strategic recommendations.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestedQuestions.slice(0, 4).map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-start shrink-0">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-indigo-400" />
                      </div>
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                      msg.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-900/80 border border-white/5 text-slate-300"
                    )}
                  >
                    {msg.role === "assistant" && !msg.content && isStreaming ? (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-xs">Analyzing...</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div
                          className={cn(
                            "whitespace-pre-wrap leading-relaxed",
                            msg.role === "assistant" &&
                              isStreaming &&
                              messages[messages.length - 1]?.id === msg.id &&
                              "typing-cursor"
                          )}
                        >
                          {msg.content}
                        </div>
                        {msg.confidence && (
                          <div className="pt-1">
                            <ConfidenceBadge value={msg.confidence} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex items-start shrink-0">
                      <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-300" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Streaming confidence indicator */}
              {isStreaming && streamingConfidence && (
                <div className="flex items-center gap-2 pl-10 text-xs text-slate-500">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  Confidence: {streamingConfidence}%
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested follow-ups when messages exist */}
            {messages.length > 0 && !isStreaming && (
              <div className="px-5 pb-2">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {suggestedQuestions.slice(0, 3).map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-400 hover:text-indigo-300 hover:border-indigo-500/30 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-5 pb-5 pt-3 border-t border-white/5"
            >
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900/80 border border-white/5 focus-within:border-indigo-500/40 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your business..."
                  disabled={isStreaming}
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
