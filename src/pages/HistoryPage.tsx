import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { HistoryFilters } from "@/components/history/HistoryFilters";
import { HistoryList, HistoryItem } from "@/components/history/HistoryList";
import { EmptyState } from "@/components/common/EmptyState";
import { motion } from "framer-motion";

// Mock history data
const mockHistory: HistoryItem[] = [
  {
    id: "1",
    query: "Does this plan cover MRI for lower back pain?",
    timestamp: new Date(Date.now() - 1800000),
    status: "covered",
    planName: "Blue Shield PPO Gold",
  },
  {
    id: "2",
    query: "Physical therapy session limits and coverage",
    timestamp: new Date(Date.now() - 7200000),
    status: "covered",
    planName: "Blue Shield PPO Gold",
  },
  {
    id: "3",
    query: "Is arthroscopic knee surgery covered without referral?",
    timestamp: new Date(Date.now() - 86400000),
    status: "partial",
    planName: "Aetna HMO Basic",
  },
  {
    id: "4",
    query: "Mental health counseling session annual limits",
    timestamp: new Date(Date.now() - 172800000),
    status: "covered",
    planName: "Blue Shield PPO Gold",
  },
  {
    id: "5",
    query: "Chiropractic care coverage and visit limits",
    timestamp: new Date(Date.now() - 259200000),
    status: "not-covered",
    planName: "United Healthcare Bronze",
  },
  {
    id: "6",
    query: "Prescription drug tier for Humira",
    timestamp: new Date(Date.now() - 345600000),
    status: "covered",
    planName: "Blue Shield PPO Gold",
  },
  {
    id: "7",
    query: "Telehealth visit copay amount",
    timestamp: new Date(Date.now() - 432000000),
    status: "covered",
    planName: "Aetna HMO Basic",
  },
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredHistory = useMemo(() => {
    return mockHistory.filter((item) => {
      // Search filter
      if (
        searchQuery &&
        !item.query.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Date filter
      if (dateFilter !== "all") {
        const now = new Date();
        const itemDate = new Date(item.timestamp);
        const diffMs = now.getTime() - itemDate.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (dateFilter === "today" && diffDays > 1) return false;
        if (dateFilter === "week" && diffDays > 7) return false;
        if (dateFilter === "month" && diffDays > 30) return false;
      }

      // Status filter
      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [searchQuery, dateFilter, statusFilter]);

  return (
    <Layout>
      <div className="container px-4 py-6 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground">Search History</h1>
          <p className="text-muted-foreground">
            Review your previous benefit queries
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <HistoryFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        </motion.div>

        {filteredHistory.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <HistoryList items={filteredHistory} />
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Showing {filteredHistory.length} of {mockHistory.length} results
            </div>
          </motion.div>
        ) : (
          <EmptyState
            type={mockHistory.length === 0 ? "no-history" : "no-results"}
            title={mockHistory.length === 0 ? undefined : "No matching results"}
            description={
              mockHistory.length === 0
                ? undefined
                : "Try adjusting your filters or search query"
            }
          />
        )}
      </div>
    </Layout>
  );
}
