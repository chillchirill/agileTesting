import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Account, AccountId, Transaction } from "../App";

interface Props {
  accounts: Record<AccountId, Account>;
  transactions: Transaction[];
  formatCurrency: (amount: number) => string;
}

const typeLabelMap: Record<string, string> = {
  deposit: "Deposit",
  withdraw: "Withdrawal",
  transfer: "Transfer",
};

const TransactionHistory: React.FC<Props> = ({
  accounts,
  transactions,
  formatCurrency,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 18, delay: 0.15 }}
      className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 shadow-sm p-4 sm:p-5 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm sm:text-base font-semibold">Recent activity</h3>
        <span className="text-[10px] text-slate-500 dark:text-slate-400">
          Last {transactions.length} operations
        </span>
      </div>

      {transactions.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          No transactions yet. Make your first deposit, withdrawal or transfer.
        </p>
      ) : (
        <div className="space-y-2 overflow-auto max-h-72 pr-1">
          <AnimatePresence initial={false}>
            {transactions.map((tx) => {
              const date = new Date(tx.timestamp);
              const timeLabel = date.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              });

              let description = "";
              if (tx.type === "deposit") {
                description = `to ${accounts[tx.target!].name}`;
              } else if (tx.type === "withdraw") {
                description = `from ${accounts[tx.source!].name}`;
              } else if (tx.type === "transfer") {
                description = `from ${accounts[tx.source!].name} → ${
                  accounts[tx.target!].name
                }`;
              }

              return (
                <motion.div
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
                  className="flex items-center justify-between rounded-xl bg-slate-50/80 dark:bg-slate-800/80 px-3 py-2"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">
                      {typeLabelMap[tx.type]}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {description}
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className={`block text-xs font-semibold ${
                        tx.type === "withdraw"
                          ? "text-rose-500"
                          : tx.type === "deposit"
                          ? "text-emerald-500"
                          : "text-sky-500"
                      }`}
                    >
                      {tx.type === "withdraw" ? "-" : "+"}
                      {formatCurrency(tx.amount)}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {timeLabel}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionHistory;
