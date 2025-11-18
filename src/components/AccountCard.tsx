import React from "react";
import { motion } from "framer-motion";
import type { Account } from "../App";

interface Props {
  account: Account;
  formatCurrency: (amount: number) => string;
}

const AccountCard: React.FC<Props> = ({ account, formatCurrency }) => {
  return (
    <motion.div
      key={account.balance}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 18 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500/90 via-sky-600/90 to-indigo-600/90 dark:from-slate-800 dark:via-slate-900 dark:to-sky-900 text-white shadow-xl p-5 sm:p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-100/80">
            {account.label}
          </p>
          <h2 className="text-lg sm:text-xl font-semibold">{account.name}</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-sky-100/70">
            Balance
          </p>
          <p className="text-xl sm:text-2xl font-semibold">
            {formatCurrency(account.balance)}
          </p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-sky-100/80">
        <span>•••• •••• •••• {account.id === "main" ? "1123" : "8847"}</span>
        <span>Fintech NeoBank</span>
      </div>

      <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 -top-16 h-32 w-32 rounded-full bg-indigo-300/20 blur-3xl" />
    </motion.div>
  );
};

export default AccountCard;
