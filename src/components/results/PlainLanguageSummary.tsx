import { Lightbulb, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PlainLanguageSummaryProps {
  summary: string;
  status: "covered" | "not-covered" | "partial";
}

const statusConfig = {
  covered: {
    icon: CheckCircle2,
    bgClass: "bg-success-light border-success/30",
    iconClass: "text-success",
    label: "Covered",
  },
  "not-covered": {
    icon: XCircle,
    bgClass: "bg-destructive-light border-destructive/30",
    iconClass: "text-destructive",
    label: "Not Covered",
  },
  partial: {
    icon: AlertCircle,
    bgClass: "bg-warning-light border-warning/30",
    iconClass: "text-warning",
    label: "Partial Coverage",
  },
};

export function PlainLanguageSummary({ summary, status }: PlainLanguageSummaryProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("rounded-xl border-2 p-6", config.bgClass)}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className={cn("rounded-full p-2", config.bgClass)}>
          <Icon className={cn("h-6 w-6", config.iconClass)} />
        </div>
        <div>
          <span className={cn("text-sm font-semibold", config.iconClass)}>
            {config.label}
          </span>
          <h3 className="text-lg font-semibold text-foreground">
            Plain English Answer
          </h3>
        </div>
      </div>
      <p className="text-lg leading-relaxed text-foreground/90">{summary}</p>
    </motion.div>
  );
}
