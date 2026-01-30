import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
}

export function LoadingState({
  message = "Analyzing benefit documents...",
  subMessage = "This usually takes 3-5 seconds",
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 rounded-full bg-primary/10 p-4"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-lg font-medium text-foreground"
      >
        {message}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-1 text-sm text-muted-foreground"
      >
        {subMessage}
      </motion.p>
    </div>
  );
}

export function SkeletonResults() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Summary skeleton */}
      <div className="rounded-xl border-2 border-border bg-muted/30 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="h-5 w-36 rounded bg-muted" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 h-8 w-8 rounded-lg bg-muted" />
            <div className="h-6 w-16 rounded bg-muted" />
            <div className="mt-1 h-4 w-24 rounded bg-muted" />
          </div>
        ))}
      </div>

      {/* Checklist skeleton */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border bg-muted/30 px-4 py-3">
          <div className="h-5 w-28 rounded bg-muted" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-0">
            <div className="h-5 w-5 rounded-full bg-muted" />
            <div className="h-4 w-48 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
