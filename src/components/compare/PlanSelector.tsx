import { useState } from "react";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlanData } from "./ComparisonTable";

interface PlanSelectorProps {
  availablePlans: PlanData[];
  selectedPlans: PlanData[];
  onPlanSelect: (plan: PlanData) => void;
  onPlanRemove: (planId: string) => void;
  maxPlans?: number;
}

export function PlanSelector({
  availablePlans,
  selectedPlans,
  onPlanSelect,
  onPlanRemove,
  maxPlans = 3,
}: PlanSelectorProps) {
  const [open, setOpen] = useState(false);

  const unselectedPlans = availablePlans.filter(
    (plan) => !selectedPlans.find((sp) => sp.id === plan.id)
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {selectedPlans.map((plan) => (
          <div
            key={plan.id}
            className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{plan.name}</p>
              <p className="text-xs text-muted-foreground">{plan.carrier}</p>
            </div>
            <button
              onClick={() => onPlanRemove(plan.id)}
              className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {selectedPlans.length < maxPlans && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Plan
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search plans..." />
                <CommandList>
                  <CommandEmpty>No plans found.</CommandEmpty>
                  <CommandGroup>
                    {unselectedPlans.map((plan) => (
                      <CommandItem
                        key={plan.id}
                        value={plan.name}
                        onSelect={() => {
                          onPlanSelect(plan);
                          setOpen(false);
                        }}
                        className="flex flex-col items-start gap-0.5"
                      >
                        <span className="font-medium">{plan.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {plan.carrier} • {plan.type}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {selectedPlans.length >= maxPlans && (
        <p className="text-xs text-muted-foreground">
          Maximum {maxPlans} plans can be compared at once
        </p>
      )}
    </div>
  );
}
