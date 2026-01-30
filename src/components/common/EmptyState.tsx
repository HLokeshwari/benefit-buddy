import { Search, FileQuestion, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  type: "no-results" | "no-history" | "error";
  title?: string;
  description?: string;
}

const configs = {
  "no-results": {
    icon: FileQuestion,
    title: "No Results Found",
    description: "We couldn't find information about this. Try rephrasing or check the benefit document directly.",
    showAction: true,
  },
  "no-history": {
    icon: History,
    title: "No Searches Yet",
    description: "Your search history will appear here. Try asking about coverage above.",
    showAction: true,
  },
  error: {
    icon: FileQuestion,
    title: "Something Went Wrong",
    description: "We encountered an error processing your request. Please try again.",
    showAction: true,
  },
};

export function EmptyState({ type, title, description }: EmptyStateProps) {
  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {title || config.title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        {description || config.description}
      </p>
      {config.showAction && (
        <Button asChild>
          <Link to="/" className="gap-2">
            <Search className="h-4 w-4" />
            New Search
          </Link>
        </Button>
      )}
    </div>
  );
}
