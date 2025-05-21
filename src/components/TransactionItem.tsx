import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import type { Transaction } from '../types';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import CompanyLogo from './CompanyLogo';
import styles from './styles/TransactionItem.module.css';

interface TransactionItemProps {
    transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
    const { setSelectedTransaction } = useWallet();
    const navigate = useNavigate();

    // Format amount to display with '+' for payments and no sign for expenses
    const amountDisplay = transaction.type === 'payment'
        ? `+$${transaction.amount.toFixed(2)}`
        : `$${transaction.amount.toFixed(2)}`;

    // Format date to display day name for the last week, or date for older entries
    const formatDate = (dateString: string): string => {
        const transactionDate = new Date(dateString);
        const today = new Date();
        const diffTime = today.getTime() - transactionDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 7) {
            // For transactions in the last week, display the day name
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[transactionDate.getDay()];
        } else {
            // For older transactions, display the date
            return transactionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    const handleClick = () => {
        setSelectedTransaction(transaction);
        navigate('/detail');
    };

    return (
        <div className={styles.transactionItem} onClick={handleClick}>
            <div className={styles.transactionIcon}>
                <CompanyLogo name={transaction.name} icon={transaction.icon} />
            </div>

            <div className={styles.transactionDetails}>
                <div className={styles.transactionHeader}>
                    <div className={styles.transactionName}>
                        {transaction.pending && <span className={styles.pendingLabel}>Pending - </span>}
                        {transaction.name}
                    </div>
                    <div className={`${styles.transactionAmount} ${transaction.type === 'payment' ? styles.paymentAmount : styles.creditAmount}`}>
                        {amountDisplay}
                    </div>
                </div>

                <div className={styles.transactionSubDetails}>
                    <div className={styles.transactionDescription}>
                        {transaction.authorizedUser && (
                            <span className={styles.authorizedUser}>{transaction.authorizedUser} - </span>
                        )}
                        {transaction.description}
                    </div>
                    {transaction.percentage && (
                        <div className={styles.transactionPercentage}>{transaction.percentage}</div>
                    )}
                </div>

                <div className={styles.transactionDate}>
                    {formatDate(transaction.date)}
                </div>
            </div>

            <div className={styles.chevronRight}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    );
};

export default TransactionItem; 