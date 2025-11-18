import React, { useReducer, useState } from "react";
import { motion } from "framer-motion";
import AccountCard from "./components/AccountCard";
import OperationPanel from "./components/OperationPanel";
import TransferPanel from "./components/TransferPanel";
import TransactionHistory from "./components/TransactionHistory";

export type AccountId = "main" | "savings";

export interface Account {
  id: AccountId;
  name: string;
  label: string;
  balance: number;
}

export type TransactionType = "deposit" | "withdraw" | "transfer";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  timestamp: string;
  source?: AccountId;
  target?: AccountId;
}

interface ATMState {
  accounts: Record<AccountId, Account>;
  transactions: Transaction[];
}

type ATMAction =
  | { type: "deposit"; accountId: AccountId; amount: number }
  | { type: "withdraw"; accountId: AccountId; amount: number }
  | { type: "transfer"; from: AccountId; to: AccountId; amount: number };

const initialState: ATMState = {
  accounts: {
    main: {
      id: "main",
      name: "Main account",
      label: "Daily spending",
      balance: 1200,
    },
    savings: {
      id: "savings",
      name: "Savings account",
      label: "Long term savings",
      balance: 4500,
    },
  },
  transactions: [],
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function atmReducer(state: ATMState, action: ATMAction): ATMState {
  switch (action.type) {
    case "deposit": {
      const account = state.accounts[action.accountId];
      const updatedAccount: Account = {
        ...account,
        balance: account.balance + action.amount,
      };

      const tx: Transaction = {
        id: `${Date.now()}-${Math.random()}`,
        type: "deposit",
        amount: action.amount,
        timestamp: new Date().toISOString(),
        target: action.accountId,
      };

      return {
        accounts: {
          ...state.accounts,
          [action.accountId]: updatedAccount,
        },
        transactions: [tx, ...state.transactions].slice(0, 10),
      };
    }

    case "withdraw": {
      const account = state.accounts[action.accountId];
      const updatedAccount: Account = {
        ...account,
        balance: account.balance - action.amount,
      };

      const tx: Transaction = {
        id: `${Date.now()}-${Math.random()}`,
        type: "withdraw",
        amount: action.amount,
        timestamp: new Date().toISOString(),
        source: action.accountId,
      };

      return {
        accounts: {
          ...state.accounts,
          [action.accountId]: updatedAccount,
        },
        transactions: [tx, ...state.transactions].slice(0, 10),
      };
    }

    case "transfer": {
      const fromAcc = state.accounts[action.from];
      const toAcc = state.accounts[action.to];

      const updatedFrom: Account = {
        ...fromAcc,
        balance: fromAcc.balance - action.amount,
      };
      const updatedTo: Account = {
        ...toAcc,
        balance: toAcc.balance + action.amount,
      };

      const tx: Transaction = {
        id: `${Date.now()}-${Math.random()}`,
        type: "transfer",
        amount: action.amount,
        timestamp: new Date().toISOString(),
        source: action.from,
        target: action.to,
      };

      return {
        accounts: {
          ...state.accounts,
          [action.from]: updatedFrom,
          [action.to]: updatedTo,
        },
        transactions: [tx, ...state.transactions].slice(0, 10),
      };
    }

    default:
      return state;
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(atmReducer, initialState);
  const [darkMode, setDarkMode] = useState(true);

  const { accounts, transactions } = state;

  const handleDeposit = (accountId: AccountId, amount: number) => {
    dispatch({ type: "deposit", accountId, amount });
  };

  const handleWithdraw = (accountId: AccountId, amount: number) => {
    dispatch({ type: "withdraw", accountId, amount });
  };

  const handleTransfer = (from: AccountId, to: AccountId, amount: number) => {
    dispatch({ type: "transfer", from, to, amount });
  };

  return (
    <div className={darkMode ? "dark h-full" : "h-full"}>
      <div className="min-h-screen bg-atm-gradient bg-slate-100 dark:bg-slate-950 transition-colors duration-300 flex items-center justify-center px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="w-full max-w-5xl rounded-3xl bg-white/80 dark:bg-slate-900/80 shadow-2xl backdrop-blur-xl border border-white/20 dark:border-slate-800/60 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                My ATM
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage your Main &amp; Savings accounts in one place.
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              onClick={() => setDarkMode((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs sm:text-sm bg-white/70 dark:bg-slate-900/70 shadow-sm"
            >
              <span className="hidden sm:inline">
                {darkMode ? "Dark" : "Light"} mode
              </span>
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  darkMode
                    ? "bg-slate-800 text-yellow-300"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {darkMode ? "🌙" : "☀️"}
              </span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <AccountCard
              account={accounts.main}
              formatCurrency={formatCurrency}
            />
            <AccountCard
              account={accounts.savings}
              formatCurrency={formatCurrency}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <OperationPanel
                accounts={accounts}
                onDeposit={handleDeposit}
                onWithdraw={handleWithdraw}
              />
              <TransferPanel accounts={accounts} onTransfer={handleTransfer} />
            </div>

            <TransactionHistory
              accounts={accounts}
              transactions={transactions}
              formatCurrency={formatCurrency}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
