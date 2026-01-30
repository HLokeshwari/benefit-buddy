import { useState } from "react";
import { ThumbsUp, ThumbsDown, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface FeedbackSectionProps {
  onFeedback?: (helpful: boolean, comment?: string) => void;
}

export function FeedbackSection({ onFeedback }: FeedbackSectionProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");

  const handleFeedback = (type: "up" | "down") => {
    setFeedback(type);
    if (type === "down") {
      setShowComment(true);
    } else {
      onFeedback?.(true);
    }
  };

  const handleSubmitComment = () => {
    onFeedback?.(false, comment);
    setShowComment(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="mb-3 text-sm font-medium text-foreground">Was this helpful?</p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleFeedback("up")}
          className={cn(
            "rounded-lg p-2 transition-colors",
            feedback === "up"
              ? "bg-success/10 text-success"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <ThumbsUp className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleFeedback("down")}
          className={cn(
            "rounded-lg p-2 transition-colors",
            feedback === "down"
              ? "bg-destructive/10 text-destructive"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <ThumbsDown className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {showComment && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 overflow-hidden"
          >
            <Textarea
              placeholder="What was incorrect or unhelpful?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-2 min-h-[80px] resize-none"
            />
            <Button size="sm" onClick={handleSubmitComment}>
              Submit Feedback
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <Flag className="h-3 w-3" />
        Report Issue
      </button>
    </div>
  );
}
