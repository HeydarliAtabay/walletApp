import { useWallet } from '../context/WalletContext';
import TransactionItem from './TransactionItem';
import styles from './styles/TransactionsList.module.css';

const TransactionsList = () => {
    const { transactions } = useWallet();

    // Show 10 transactions as per requirement
    const latestTransactions = transactions.slice(0, 10);

    return (
        <div className={styles.transactionsListContainer}>
            <div className={styles.transactionsHeader}>
                <h2>Latest Transactions</h2>
            </div>
            <div className={styles.transactionsList}>
                {latestTransactions.map(transaction => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
            </div>
        </div>
    );
};

export default TransactionsList; 