import { useState } from "react";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface PlanData {
  id: string;
  name: string;
  type: string;
  carrier: string;
  premium: string;
  deductible: string;
  outOfPocketMax: string;
  copayPrimaryCare: string;
  copaySpecialist: string;
  copayUrgentCare: string;
  copayER: string;
  coinsurance: string;
  rxGeneric: string;
  rxBrand: string;
  rxSpecialty: string;
  mentalHealth: string;
  physicalTherapy: string;
  imaging: string;
  labWork: string;
  preventiveCare: string;
  telehealth: string;
}

interface ComparisonTableProps {
  plans: PlanData[];
  onRemovePlan?: (planId: string) => void;
}

type RowConfig = {
  key: keyof PlanData;
  label: string;
  category: string;
  isCurrency?: boolean;
  isPercentage?: boolean;
  lowerIsBetter?: boolean;
};

const rowConfigs: RowConfig[] = [
  { key: "premium", label: "Monthly Premium", category: "Costs", isCurrency: true, lowerIsBetter: true },
  { key: "deductible", label: "Annual Deductible", category: "Costs", isCurrency: true, lowerIsBetter: true },
  { key: "outOfPocketMax", label: "Out-of-Pocket Max", category: "Costs", isCurrency: true, lowerIsBetter: true },
  { key: "coinsurance", label: "Coinsurance", category: "Costs", isPercentage: true, lowerIsBetter: true },
  { key: "copayPrimaryCare", label: "Primary Care Visit", category: "Copays", isCurrency: true, lowerIsBetter: true },
  { key: "copaySpecialist", label: "Specialist Visit", category: "Copays", isCurrency: true, lowerIsBetter: true },
  { key: "copayUrgentCare", label: "Urgent Care", category: "Copays", isCurrency: true, lowerIsBetter: true },
  { key: "copayER", label: "Emergency Room", category: "Copays", isCurrency: true, lowerIsBetter: true },
  { key: "rxGeneric", label: "Generic Drugs", category: "Prescriptions", isCurrency: true, lowerIsBetter: true },
  { key: "rxBrand", label: "Brand Name Drugs", category: "Prescriptions", isCurrency: true, lowerIsBetter: true },
  { key: "rxSpecialty", label: "Specialty Drugs", category: "Prescriptions", isPercentage: true, lowerIsBetter: true },
  { key: "preventiveCare", label: "Preventive Care", category: "Services" },
  { key: "mentalHealth", label: "Mental Health", category: "Services" },
  { key: "physicalTherapy", label: "Physical Therapy", category: "Services" },
  { key: "imaging", label: "Imaging (MRI, CT)", category: "Services" },
  { key: "labWork", label: "Lab Work", category: "Services" },
  { key: "telehealth", label: "Telehealth", category: "Services" },
];

const categories = ["Costs", "Copays", "Prescriptions", "Services"];

function parseValue(value: string): number {
  const cleaned = value.replace(/[$,%]/g, "").replace(/,/g, "");
  return parseFloat(cleaned) || 0;
}

function getBestValue(values: string[], lowerIsBetter: boolean): number {
  const parsed = values.map(parseValue);
  return lowerIsBetter ? Math.min(...parsed) : Math.max(...parsed);
}

function CoverageCell({ value, isBest, isDifferent }: { value: string; isBest: boolean; isDifferent: boolean }) {
  const isFullCoverage = value.toLowerCase().includes("covered") || value === "$0" || value === "0%";
  const isNotCovered = value.toLowerCase().includes("not covered");

  return (
    <td
      className={cn(
        "px-4 py-3 text-center text-sm font-medium transition-colors",
        isDifferent && "bg-warning/10",
        isBest && !isNotCovered && "text-success",
        isNotCovered && "text-destructive"
      )}
    >
      <div className="flex items-center justify-center gap-1.5">
        {isFullCoverage && <Check className="h-4 w-4 text-success" />}
        {isNotCovered && <X className="h-4 w-4 text-destructive" />}
        <span>{value}</span>
      </div>
    </td>
  );
}

export function ComparisonTable({ plans, onRemovePlan }: ComparisonTableProps) {
  if (plans.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-xl border border-border"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          {/* Header with plan names */}
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="sticky left-0 z-10 bg-muted/50 px-4 py-4 text-left text-sm font-semibold text-foreground">
                Coverage Details
              </th>
              {plans.map((plan, index) => (
                <th
                  key={plan.id}
                  className="min-w-[180px] px-4 py-4 text-center"
                >
                  <div className="space-y-1">
                    <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {plan.type}
                    </span>
                    <p className="font-semibold text-foreground">{plan.name}</p>
                    <p className="text-xs text-muted-foreground">{plan.carrier}</p>
                    {onRemovePlan && plans.length > 1 && (
                      <button
                        onClick={() => onRemovePlan(plan.id)}
                        className="mt-1 text-xs text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <>
                {/* Category header */}
                <tr key={category} className="border-b border-border bg-muted/30">
                  <td
                    colSpan={plans.length + 1}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {category}
                  </td>
                </tr>

                {/* Rows in this category */}
                {rowConfigs
                  .filter((row) => row.category === category)
                  .map((row) => {
                    const values = plans.map((p) => p[row.key]);
                    const uniqueValues = new Set(values);
                    const isDifferent = uniqueValues.size > 1;
                    const bestValue = row.lowerIsBetter !== undefined
                      ? getBestValue(values, row.lowerIsBetter)
                      : null;

                    return (
                      <tr key={row.key} className="border-b border-border last:border-0 hover:bg-muted/20">
                        <td className="sticky left-0 z-10 bg-card px-4 py-3 text-sm text-foreground">
                          {row.label}
                        </td>
                        {plans.map((plan) => {
                          const value = plan[row.key];
                          const isBest = bestValue !== null && parseValue(value) === bestValue;
                          return (
                            <CoverageCell
                              key={plan.id}
                              value={value}
                              isBest={isBest}
                              isDifferent={isDifferent}
                            />
                          );
                        })}
                      </tr>
                    );
                  })}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 border-t border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-warning/30" />
          <span>Difference between plans</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="h-3 w-3 text-success" />
          <span>Best value / Fully covered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <X className="h-3 w-3 text-destructive" />
          <span>Not covered</span>
        </div>
      </div>
    </motion.div>
  );
}
