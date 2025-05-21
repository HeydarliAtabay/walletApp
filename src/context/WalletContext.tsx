import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import transactionsData from '../data/transactions.json';
import type { Transaction, CardDetails, WalletState } from '../types';

interface WalletContextProps {
    transactions: Transaction[];
    cardDetails: CardDetails;
    selectedTransaction: Transaction | null;
    setSelectedTransaction: (transaction: Transaction | null) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};

interface WalletProviderProps {
    children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
    const [state, setState] = useState<WalletState>({
        transactions: [],
        cardDetails: {
            balance: 0,
            maxLimit: 1500, // Maximum card limit from requirement
            availableCredit: 0,
        },
        selectedTransaction: null,
    });

    useEffect(() => {
        // Load transactions from JSON
        const typedTransactions = transactionsData as Transaction[];

        // Calculate card balance as a random number between 0 and 100
        const randomBalance = Math.floor(Math.random() * 100) + 1;

        // Calculate available credit (limit minus balance)
        const availableCredit = state.cardDetails.maxLimit - randomBalance;

        setState({
            ...state,
            transactions: typedTransactions,
            cardDetails: {
                ...state.cardDetails,
                balance: randomBalance,
                availableCredit,
            },
        });
    }, []);

    const setSelectedTransaction = (transaction: Transaction | null) => {
        setState({
            ...state,
            selectedTransaction: transaction,
        });
    };

    const value = {
        transactions: state.transactions,
        cardDetails: state.cardDetails,
        selectedTransaction: state.selectedTransaction,
        setSelectedTransaction,
    };

    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}; 