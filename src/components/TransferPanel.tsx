import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Account, AccountId } from "../App";

interface Props {
  accounts: Record<AccountId, Account>;
  onTransfer: (from: AccountId, to: AccountId, amount: number) => void;
}

const TransferPanel: React.FC<Props> = ({ accounts, onTransfer }) => {
  const [fromAccount, setFromAccount] = useState<AccountId>("main");
  const [toAccount, setToAccount] = useState<AccountId>("savings");
  const [amountInput, setAmountInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const parseAmount = (): number | null => {
    const val = parseFloat(amountInput);
    if (isNaN(val) || val <= 0) {
      return null;
    }
    return parseFloat(val.toFixed(2));
  };

  const handleSwap = () => {
    setFromAccount(toAccount);
    setToAccount(fromAccount);
    setError(null);
  };

  const handleTransferClick = () => {
    const amount = parseAmount();
    if (amount === null) {
      setError("Enter a positive amount.");
      return;
    }

    if (fromAccount === toAccount) {
      setError("Choose different source and target accounts.");
      return;
    }

    if (amount > accounts[fromAccount].balance) {
      setError("Insufficient funds in source account.");
      return;
    }

    setError(null);
    onTransfer(fromAccount, toAccount, amount);
    setAmountInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 18, delay: 0.1 }}
      className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 shadow-sm p-4 sm:p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm sm:text-base font-semibold">Transfer</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Move funds between accounts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_auto_1.2fr] gap-3 items-center">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
            From
          </label>
          <select
            data-testid="transfer-from"
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value as AccountId)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="main">Main account</option>
            <option value="savings">Savings account</option>
          </select>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Balance: {accounts[fromAccount].balance.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-center pt-5 sm:pt-7">
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleSwap}
            className="rounded-full border border-slate-200 dark:border-slate-600 px-2.5 py-2 bg-white/80 dark:bg-slate-900/80 text-xs shadow-sm"
          >
            ⇄
          </motion.button>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
            To
          </label>
          <select
            data-testid="transfer-to"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value as AccountId)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="main">Main account</option>
            <option value="savings">Savings account</option>
          </select>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Balance: {accounts[toAccount].balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-[1.2fr_auto] gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Amount
          </label>
          <input
            data-testid="transfer-amount"
            type="number"
            min="0"
            step="0.01"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-end">
          <motion.button
            data-testid="transfer-btn"
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTransferClick}
            className="w-full rounded-xl bg-emerald-600 text-xs sm:text-sm text-white font-medium px-4 py-2.5 shadow-sm hover:bg-emerald-700 transition-colors"
          >
            Transfer
          </motion.button>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs text-rose-500 font-medium">{error}</p>
      )}
    </motion.div>
  );
};

export default TransferPanel;
