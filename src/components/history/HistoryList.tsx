import { Link } from "react-router-dom";
import { Clock, ArrowRight, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface HistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  status: "covered" | "not-covered" | "partial";
  planName?: string;
}

interface HistoryListProps {
  items: HistoryItem[];
}

const statusConfig = {
  covered: {
    icon: CheckCircle2,
    label: "Covered",
    badgeClass: "badge-covered",
  },
  "not-covered": {
    icon: XCircle,
    label: "Not Covered",
    badgeClass: "badge-not-covered",
  },
  partial: {
    icon: AlertCircle,
    label: "Partial",
    badgeClass: "badge-partial",
  },
};

export function HistoryList({ items }: HistoryListProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday =
      new Date(now.getTime() - 86400000).toDateString() === date.toDateString();

    if (isToday) return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    if (isYesterday) return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const config = statusConfig[item.status];
        const Icon = config.icon;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Link
              to={`/results?id=${item.id}`}
              className="history-card group block"
            >
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-2 sm:line-clamp-1">
                    {item.query}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDate(item.timestamp)}
                    {item.planName && (
                      <>
                        <span>•</span>
                        <span>{item.planName}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn(config.badgeClass)}>
                    <Icon className="h-3.5 w-3.5" />
                    {config.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
