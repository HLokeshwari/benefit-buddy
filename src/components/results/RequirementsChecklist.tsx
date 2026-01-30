import { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Requirement {
  id: string;
  label: string;
  required: boolean;
  details?: string;
}

interface RequirementsChecklistProps {
  requirements: Requirement[];
}

function RequirementItem({ requirement }: { requirement: Requirement }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => requirement.details && setIsExpanded(!isExpanded)}
        className={cn(
          "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
          requirement.details && "hover:bg-muted/50 cursor-pointer"
        )}
        disabled={!requirement.details}
      >
        {requirement.required ? (
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-success" />
        ) : (
          <XCircle className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        )}
        <span className="flex-1 text-sm font-medium text-foreground">
          {requirement.label}
        </span>
        {requirement.details && (
          isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )
        )}
      </button>
      <AnimatePresence>
        {isExpanded && requirement.details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-muted/30 px-4 py-3 pl-12 text-sm text-muted-foreground">
              {requirement.details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RequirementsChecklist({ requirements }: RequirementsChecklistProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <h3 className="font-semibold text-foreground">Requirements</h3>
      </div>
      <div>
        {requirements.map((req) => (
          <RequirementItem key={req.id} requirement={req} />
        ))}
      </div>
    </motion.div>
  );
}
