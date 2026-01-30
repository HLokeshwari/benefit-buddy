import { Sparkles, FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface ConfidenceIndicatorProps {
  confidence: number;
  sourcePage?: number;
  sourceSection?: string;
  documentName?: string;
}

export function ConfidenceIndicator({
  confidence,
  sourcePage,
  sourceSection,
  documentName = "Member Benefit Document",
}: ConfidenceIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="rounded-xl border border-border bg-card p-4"
    >
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        AI Confidence
      </div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-2xl font-bold text-foreground">{confidence}%</span>
        <span className="text-sm text-muted-foreground">Confident</span>
      </div>
      <Progress value={confidence} className="h-2" />

      {sourcePage && (
        <div className="mt-4 border-t border-border pt-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FileText className="h-4 w-4" />
            Source Reference
          </div>
          <button className="group flex w-full items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm transition-colors hover:bg-muted">
            <span className="flex-1 text-left text-foreground">
              {documentName}, Page {sourcePage}
              {sourceSection && `, ${sourceSection}`}
            </span>
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
