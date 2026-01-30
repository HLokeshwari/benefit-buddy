import { DollarSign, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { PlanData } from "./ComparisonTable";
import { cn } from "@/lib/utils";

interface CostSummaryProps {
  plans: PlanData[];
}

function parseAmount(value: string): number {
  return parseFloat(value.replace(/[$,]/g, "")) || 0;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CostSummary({ plans }: CostSummaryProps) {
  if (plans.length === 0) return null;

  const planCosts = plans.map((plan) => {
    const premium = parseAmount(plan.premium) * 12;
    const deductible = parseAmount(plan.deductible);
    const estimatedUsage = 
      parseAmount(plan.copayPrimaryCare) * 4 + // 4 primary visits
      parseAmount(plan.copaySpecialist) * 2 + // 2 specialist visits
      parseAmount(plan.rxGeneric) * 12; // 12 months generic rx

    return {
      ...plan,
      annualPremium: premium,
      estimatedTotal: premium + estimatedUsage,
      deductible,
    };
  });

  const lowestCost = Math.min(...planCosts.map((p) => p.estimatedTotal));
  const highestCost = Math.max(...planCosts.map((p) => p.estimatedTotal));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-primary/10 p-2">
          <DollarSign className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Estimated Annual Cost</h3>
          <p className="text-xs text-muted-foreground">
            Based on typical usage (4 primary, 2 specialist visits, 12mo generic Rx)
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {planCosts.map((plan) => {
          const isLowest = plan.estimatedTotal === lowestCost;
          const isHighest = plan.estimatedTotal === highestCost && plans.length > 1;
          const savingsVsHighest = highestCost - plan.estimatedTotal;

          return (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-xl border p-4 transition-all",
                isLowest
                  ? "border-success/50 bg-success-light"
                  : "border-border bg-muted/30"
              )}
            >
              {isLowest && plans.length > 1 && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-success px-2 py-0.5 text-xs font-medium text-success-foreground">
                  Best Value
                </span>
              )}
              <p className="mb-1 text-sm font-medium text-foreground">{plan.name}</p>
              <p className="mb-3 text-2xl font-bold text-foreground">
                {formatCurrency(plan.estimatedTotal)}
                <span className="text-sm font-normal text-muted-foreground">/year</span>
              </p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Annual Premium</span>
                  <span>{formatCurrency(plan.annualPremium)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deductible</span>
                  <span>{formatCurrency(plan.deductible)}</span>
                </div>
              </div>
              {savingsVsHighest > 0 && plans.length > 1 && (
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-success">
                  <TrendingDown className="h-3 w-3" />
                  Save {formatCurrency(savingsVsHighest)} vs highest
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        * Estimates are for illustrative purposes only. Actual costs depend on individual usage.
      </p>
    </motion.div>
  );
}
