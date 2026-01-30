import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PlanSelector } from "@/components/compare/PlanSelector";
import { ComparisonTable, PlanData } from "@/components/compare/ComparisonTable";
import { CostSummary } from "@/components/compare/CostSummary";
import { motion } from "framer-motion";
import { BarChart3, Info } from "lucide-react";

// Mock plan data
const availablePlans: PlanData[] = [
  {
    id: "1",
    name: "Blue Shield PPO Gold",
    type: "PPO",
    carrier: "Blue Shield",
    premium: "$450",
    deductible: "$1,500",
    outOfPocketMax: "$6,000",
    copayPrimaryCare: "$25",
    copaySpecialist: "$50",
    copayUrgentCare: "$75",
    copayER: "$250",
    coinsurance: "20%",
    rxGeneric: "$10",
    rxBrand: "$40",
    rxSpecialty: "30%",
    mentalHealth: "$25 copay",
    physicalTherapy: "$40 copay, 30 visits/year",
    imaging: "20% after deductible",
    labWork: "Covered 100%",
    preventiveCare: "Covered 100%",
    telehealth: "$0 copay",
  },
  {
    id: "2",
    name: "Aetna HMO Basic",
    type: "HMO",
    carrier: "Aetna",
    premium: "$320",
    deductible: "$2,500",
    outOfPocketMax: "$7,500",
    copayPrimaryCare: "$20",
    copaySpecialist: "$60",
    copayUrgentCare: "$100",
    copayER: "$350",
    coinsurance: "30%",
    rxGeneric: "$15",
    rxBrand: "$50",
    rxSpecialty: "40%",
    mentalHealth: "$30 copay",
    physicalTherapy: "$50 copay, 20 visits/year",
    imaging: "30% after deductible",
    labWork: "20% after deductible",
    preventiveCare: "Covered 100%",
    telehealth: "$15 copay",
  },
  {
    id: "3",
    name: "United Healthcare Silver",
    type: "EPO",
    carrier: "United Healthcare",
    premium: "$380",
    deductible: "$2,000",
    outOfPocketMax: "$6,500",
    copayPrimaryCare: "$30",
    copaySpecialist: "$55",
    copayUrgentCare: "$85",
    copayER: "$300",
    coinsurance: "25%",
    rxGeneric: "$12",
    rxBrand: "$45",
    rxSpecialty: "35%",
    mentalHealth: "$35 copay",
    physicalTherapy: "$45 copay, 25 visits/year",
    imaging: "25% after deductible",
    labWork: "Covered 100%",
    preventiveCare: "Covered 100%",
    telehealth: "$10 copay",
  },
  {
    id: "4",
    name: "Cigna HDHP Bronze",
    type: "HDHP",
    carrier: "Cigna",
    premium: "$250",
    deductible: "$4,000",
    outOfPocketMax: "$8,000",
    copayPrimaryCare: "$0 after deductible",
    copaySpecialist: "$0 after deductible",
    copayUrgentCare: "$0 after deductible",
    copayER: "$0 after deductible",
    coinsurance: "20%",
    rxGeneric: "$0 after deductible",
    rxBrand: "$0 after deductible",
    rxSpecialty: "30%",
    mentalHealth: "20% after deductible",
    physicalTherapy: "20% after deductible",
    imaging: "20% after deductible",
    labWork: "20% after deductible",
    preventiveCare: "Covered 100%",
    telehealth: "$0 after deductible",
  },
  {
    id: "5",
    name: "Kaiser Permanente Platinum",
    type: "HMO",
    carrier: "Kaiser Permanente",
    premium: "$580",
    deductible: "$500",
    outOfPocketMax: "$4,000",
    copayPrimaryCare: "$15",
    copaySpecialist: "$35",
    copayUrgentCare: "$50",
    copayER: "$150",
    coinsurance: "10%",
    rxGeneric: "$5",
    rxBrand: "$30",
    rxSpecialty: "20%",
    mentalHealth: "$15 copay",
    physicalTherapy: "$30 copay, 60 visits/year",
    imaging: "10% after deductible",
    labWork: "Covered 100%",
    preventiveCare: "Covered 100%",
    telehealth: "$0 copay",
  },
];

export default function ComparePage() {
  const [selectedPlans, setSelectedPlans] = useState<PlanData[]>([
    availablePlans[0],
    availablePlans[1],
  ]);

  const handlePlanSelect = (plan: PlanData) => {
    if (selectedPlans.length < 3) {
      setSelectedPlans([...selectedPlans, plan]);
    }
  };

  const handlePlanRemove = (planId: string) => {
    setSelectedPlans(selectedPlans.filter((p) => p.id !== planId));
  };

  return (
    <Layout>
      <div className="container px-4 py-6 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Plan Comparison</h1>
          </div>
          <p className="text-muted-foreground">
            Compare coverage details across different insurance plans side-by-side
          </p>
        </motion.div>

        {/* Plan Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6 rounded-xl border border-border bg-card p-4"
        >
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
            <span>Select Plans to Compare</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {selectedPlans.length}/3
            </span>
          </div>
          <PlanSelector
            availablePlans={availablePlans}
            selectedPlans={selectedPlans}
            onPlanSelect={handlePlanSelect}
            onPlanRemove={handlePlanRemove}
          />
        </motion.div>

        {/* Cost Summary */}
        {selectedPlans.length > 0 && (
          <div className="mb-6">
            <CostSummary plans={selectedPlans} />
          </div>
        )}

        {/* Comparison Table */}
        {selectedPlans.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <ComparisonTable
              plans={selectedPlans}
              onRemovePlan={handlePlanRemove}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-16 text-center"
          >
            <div className="mb-4 rounded-full bg-muted p-4">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              Select Plans to Compare
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Add at least one plan using the selector above to start comparing coverage details.
            </p>
          </motion.div>
        )}

        {/* Info Note */}
        {selectedPlans.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex items-start gap-2 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground"
          >
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>
              This comparison is based on standard benefit summaries. Actual coverage may vary 
              based on specific procedures, network status, and prior authorization requirements. 
              Always verify coverage details with the insurance carrier.
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
