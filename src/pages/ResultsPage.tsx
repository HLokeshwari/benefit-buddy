import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/search/SearchBar";
import { PlainLanguageSummary } from "@/components/results/PlainLanguageSummary";
import { CoverageDetailsGrid } from "@/components/results/CoverageDetailsGrid";
import { RequirementsChecklist } from "@/components/results/RequirementsChecklist";
import { ConfidenceIndicator } from "@/components/results/ConfidenceIndicator";
import { MemberInfoCard } from "@/components/results/MemberInfoCard";
import { ActionButtons } from "@/components/results/ActionButtons";
import { FeedbackSection } from "@/components/results/FeedbackSection";
import { LoadingState, SkeletonResults } from "@/components/common/LoadingState";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Mock data for demo
const mockResults = {
  summary:
    "Yes, MRI for lower back pain is covered. You'll pay 20% coinsurance after meeting your $1,500 deductible. Prior authorization is required — submit within 48 hours with diagnosis code M54.5.",
  status: "covered" as const,
  coverageDetails: {
    copay: "$50",
    coinsurance: "20%",
    deductible: "$1,500",
    outOfPocketMax: "$6,000",
  },
  requirements: [
    {
      id: "1",
      label: "Prior Authorization Required",
      required: true,
      details:
        "Submit PA request to UMO within 48 hours of scheduled procedure. Include diagnosis code M54.5, clinical notes, and conservative treatment history.",
    },
    {
      id: "2",
      label: "In-Network Provider Required",
      required: true,
      details:
        "Service must be performed at an in-network imaging facility. Out-of-network services are covered at 50% with higher out-of-pocket costs.",
    },
    {
      id: "3",
      label: "Referral Required",
      required: false,
    },
  ],
  confidence: 92,
  sourcePage: 47,
  sourceSection: "Section 8.2 - Diagnostic Imaging",
  member: {
    memberId: "XYZ-123456789",
    name: "John Smith",
    planName: "Blue Shield PPO Gold",
    planType: "PPO",
  },
};

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<typeof mockResults | null>(null);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    const timer = setTimeout(() => {
      setResults(mockResults);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [query]);

  const handleNewSearch = (newQuery: string) => {
    window.location.href = `/results?q=${encodeURIComponent(newQuery)}`;
  };

  const handleExport = () => {
    toast.success("Summary exported successfully");
  };

  const handleEmail = () => {
    toast.success("Email sent to patient");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFeedback = (helpful: boolean, comment?: string) => {
    toast.success(helpful ? "Thanks for your feedback!" : "Feedback submitted. We'll improve our answers.");
  };

  return (
    <Layout>
      <div className="container px-4 py-6 md:px-6">
        {/* Back button and search */}
        <div className="mb-6">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Link>
          <div className="max-w-2xl">
            <SearchBar
              onSearch={handleNewSearch}
              defaultValue={query}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Query display */}
        {query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <p className="text-sm text-muted-foreground">Results for:</p>
            <p className="text-lg font-medium text-foreground">"{query}"</p>
          </motion.div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <SkeletonResults />
            <div className="space-y-4">
              <div className="skeleton h-40 w-full" />
              <div className="skeleton h-32 w-full" />
              <div className="skeleton h-24 w-full" />
            </div>
          </div>
        )}

        {/* Results */}
        {!isLoading && results && (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Main content */}
            <div className="space-y-6">
              <PlainLanguageSummary
                summary={results.summary}
                status={results.status}
              />
              <CoverageDetailsGrid details={results.coverageDetails} />
              <RequirementsChecklist requirements={results.requirements} />
              <ConfidenceIndicator
                confidence={results.confidence}
                sourcePage={results.sourcePage}
                sourceSection={results.sourceSection}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <MemberInfoCard member={results.member} />
              <ActionButtons
                onExport={handleExport}
                onEmail={handleEmail}
                onPrint={handlePrint}
              />
              <FeedbackSection onFeedback={handleFeedback} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
