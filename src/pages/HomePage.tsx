import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/search/SearchBar";
import { QuickFilters } from "@/components/search/QuickFilters";
import { ExampleQueries } from "@/components/search/ExampleQueries";
import { RecentQueries, RecentQuery } from "@/components/search/RecentQueries";
import { motion } from "framer-motion";
import { Cross, Shield, Zap, FileCheck } from "lucide-react";

// Mock recent queries for demo
const mockRecentQueries: RecentQuery[] = [
  {
    id: "1",
    query: "Does plan cover physical therapy for shoulder injury?",
    timestamp: new Date(Date.now() - 1800000),
    status: "covered",
  },
  {
    id: "2",
    query: "MRI coverage for knee pain diagnosis",
    timestamp: new Date(Date.now() - 7200000),
    status: "partial",
  },
  {
    id: "3",
    query: "Mental health counseling session limits",
    timestamp: new Date(Date.now() - 86400000),
    status: "covered",
  },
];

const features = [
  {
    icon: Zap,
    title: "Instant Answers",
    description: "Get plain-language coverage answers in seconds",
  },
  {
    icon: Shield,
    title: "Accurate",
    description: "AI-powered analysis of benefit documents",
  },
  {
    icon: FileCheck,
    title: "Source Verified",
    description: "Every answer includes document references",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      navigate(`/results?q=${encodeURIComponent(query)}`);
    }, 500);
  };

  return (
    <Layout>
      <div className="gradient-hero min-h-[calc(100vh-64px)]">
        <div className="container px-4 py-12 md:px-6 md:py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Cross className="h-4 w-4" />
              Provider Benefits Portal
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Understand Member Benefits{" "}
              <span className="text-primary">Instantly</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Get clear, plain-language answers to complex benefit questions.
              No more digging through 100+ page documents.
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto max-w-2xl space-y-6"
          >
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <QuickFilters />
          </motion.div>

          {/* Example Queries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <ExampleQueries onQueryClick={handleSearch} />
          </motion.div>

          {/* Recent Queries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mx-auto mt-10 max-w-3xl"
          >
            <RecentQueries queries={mockRecentQueries} />
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-card"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
