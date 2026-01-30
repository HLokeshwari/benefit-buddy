import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ComparePage() {
  return (
    <Layout>
      <div className="container px-4 py-6 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground">Plan Comparison</h1>
          <p className="text-muted-foreground">
            Compare benefits across different insurance plans
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-20 text-center"
        >
          <div className="mb-6 rounded-full bg-primary/10 p-4">
            <BarChart3 className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Coming Soon
          </h2>
          <p className="mb-6 max-w-md text-muted-foreground">
            Plan comparison features are currently in development. Soon you'll be
            able to compare coverage across multiple insurance plans side-by-side.
          </p>
          <Button asChild>
            <Link to="/" className="gap-2">
              Start a Search
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Preview of what's coming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h3 className="mb-4 font-semibold text-foreground">What to expect:</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Side-by-Side Comparison",
                description: "Compare up to 3 plans at once",
              },
              {
                title: "Highlight Differences",
                description: "Quickly spot coverage gaps",
              },
              {
                title: "Cost Analysis",
                description: "Estimate total costs per plan",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {index + 1}
                </div>
                <h4 className="font-medium text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
