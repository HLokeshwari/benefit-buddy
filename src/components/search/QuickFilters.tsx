import { useState } from "react";
import { Scan, Stethoscope, FlaskConical, Accessibility, Brain, Pill } from "lucide-react";
import { cn } from "@/lib/utils";

const filters = [
  { id: "imaging", label: "Imaging", icon: Scan },
  { id: "surgery", label: "Surgery", icon: Stethoscope },
  { id: "lab", label: "Lab Tests", icon: FlaskConical },
  { id: "dme", label: "DME", icon: Accessibility },
  { id: "mental", label: "Mental Health", icon: Brain },
  { id: "medications", label: "Medications", icon: Pill },
];

interface QuickFiltersProps {
  onFilterChange?: (filters: string[]) => void;
}

export function QuickFilters({ onFilterChange }: QuickFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter((f) => f !== filterId)
      : [...activeFilters, filterId];
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        return (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={cn(
              "filter-pill",
              isActive && "filter-pill-active"
            )}
          >
            <filter.icon className="h-4 w-4" />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
