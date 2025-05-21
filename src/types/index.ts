export interface Transaction {
  id: number;
  type: 'payment' | 'credit';
  amount: number;
  name: string;
  description: string;
  date: string;
  pending: boolean;
  authorizedUser: string | null;
  icon: string;
  percentage?: string | null;
}

export interface CardDetails {
  balance: number;
  maxLimit: number;
  availableCredit: number;
}

export interface WalletState {
  transactions: Transaction[];
  cardDetails: CardDetails;
  selectedTransaction: Transaction | null;
} 