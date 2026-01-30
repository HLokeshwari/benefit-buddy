import { DollarSign, Percent, Wallet, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface CoverageDetails {
  copay: string;
  coinsurance: string;
  deductible: string;
  outOfPocketMax: string;
}

interface CoverageDetailsGridProps {
  details: CoverageDetails;
}

const statItems = [
  { key: "copay" as const, label: "Copay", icon: DollarSign, color: "text-primary" },
  { key: "coinsurance" as const, label: "Coinsurance", icon: Percent, color: "text-success" },
  { key: "deductible" as const, label: "Deductible", icon: Wallet, color: "text-warning" },
  { key: "outOfPocketMax" as const, label: "Out-of-Pocket Max", icon: Shield, color: "text-primary" },
];

export function CoverageDetailsGrid({ details }: CoverageDetailsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="stat-card"
        >
          <div className="flex items-center gap-2">
            <div className={`rounded-lg bg-muted p-2 ${item.color}`}>
              <item.icon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-foreground">{details[item.key]}</p>
            <p className="text-sm text-muted-foreground">{item.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
