import { useState, FormEvent } from "react";
import { Search, Mic, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  defaultValue?: string;
}

export function SearchBar({ onSearch, isLoading = false, defaultValue = "" }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div
        className={cn(
          "relative flex items-center overflow-hidden rounded-xl border-2 bg-card transition-all duration-200",
          isFocused
            ? "border-primary shadow-focus"
            : "border-border hover:border-primary/30 hover:shadow-elevated"
        )}
      >
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask about coverage... (e.g., 'Does this plan cover MRI for lower back pain?')"
          className="h-14 w-full bg-transparent pl-12 pr-24 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          disabled={isLoading}
        />
        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Voice input (coming soon)"
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all",
              query.trim() && !isLoading
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground"
            )}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </form>
  );
}
