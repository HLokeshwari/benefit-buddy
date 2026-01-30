import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface RecentQuery {
  id: string;
  query: string;
  timestamp: Date;
  status: "covered" | "not-covered" | "partial";
}

interface RecentQueriesProps {
  queries: RecentQuery[];
}

export function RecentQueries({ queries }: RecentQueriesProps) {
  if (queries.length === 0) return null;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Clock className="h-4 w-4" />
        Recent Searches
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {queries.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            to={`/results?id=${item.id}`}
            className="history-card group"
          >
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {item.query}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatTime(item.timestamp)}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}
