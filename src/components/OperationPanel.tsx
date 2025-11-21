import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Account, AccountId } from "../App";

interface Props {
  accounts: Record<AccountId, Account>;
  onDeposit: (accountId: AccountId, amount: number) => void;
  onWithdraw: (accountId: AccountId, amount: number) => void;
}

const OperationPanel: React.FC<Props> = ({
  accounts,
  onDeposit,
  onWithdraw,
}) => {
  const [selectedAccount, setSelectedAccount] = useState<AccountId>("main");
  const [amountInput, setAmountInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const currentAccount = accounts[selectedAccount];

  const parseAmount = (): number | null => {
    const val = parseFloat(amountInput);
    if (isNaN(val) || val <= 0) {
      return null;
    }
    return parseFloat(val.toFixed(2));
  };

  const handleDepositClick = () => {
    const amount = parseAmount();
    if (amount === null) {
      setError("Enter a positive amount.");
      return;
    }
    setError(null);
    onDeposit(selectedAccount, amount);
    setAmountInput("");
  };

  const handleWithdrawClick = () => {
    const amount = parseAmount();
    if (amount === null) {
      setError("Enter a positive amount.");
      return;
    }
    if (amount > currentAccount.balance) {
      setError("Insufficient funds.");
      return;
    }
    setError(null);
    onWithdraw(selectedAccount, amount);
    setAmountInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 18, delay: 0.05 }}
      className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 shadow-sm p-4 sm:p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm sm:text-base font-semibold">
          Deposit &amp; Withdraw
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Quick actions
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Account
          </label>
          <select
            data-testid="operation-account-select"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value as AccountId)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="main">Main account</option>
            <option value="savings">Savings account</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Amount
          </label>
          <input
            data-testid="operation-amount-input"
            type="number"
            min="0"
            step="0.01"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-end mt-1 sm:mt-0">
          <motion.button
            data-testid="deposit-btn"
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDepositClick}
            className="flex-1 rounded-xl bg-sky-600 text-xs sm:text-sm text-white font-medium px-3 py-2 shadow-sm hover:bg-sky-700 transition-colors"
          >
            Deposit
          </motion.button>
          <motion.button
            data-testid="withdraw-btn"
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWithdrawClick}
            className="flex-1 rounded-xl bg-slate-900 text-xs sm:text-sm text-white font-medium px-3 py-2 shadow-sm hover:bg-black/90 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
          >
            Withdraw
          </motion.button>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs text-rose-500 font-medium">{error}</p>
      )}
    </motion.div>
  );
};

export default OperationPanel;
