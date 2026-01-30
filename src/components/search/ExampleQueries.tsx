import { MessageSquare } from "lucide-react";

const exampleQueries = [
  "What's the copay for specialist visits?",
  "Is prior authorization required for knee arthroscopy?",
  "What's covered for diabetes management?",
  "Inpatient hospital coverage details?",
];

interface ExampleQueriesProps {
  onQueryClick: (query: string) => void;
}

export function ExampleQueries({ onQueryClick }: ExampleQueriesProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <MessageSquare className="h-4 w-4" />
        Try asking...
      </div>
      <div className="flex flex-wrap gap-2">
        {exampleQueries.map((query) => (
          <button
            key={query}
            onClick={() => onQueryClick(query)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground transition-all hover:border-primary/50 hover:bg-secondary hover:text-secondary-foreground"
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  );
}
