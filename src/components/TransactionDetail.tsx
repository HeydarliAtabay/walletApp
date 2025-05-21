import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { useWallet } from '../context/WalletContext';
import CompanyLogo from './CompanyLogo';
import styles from './styles/TransactionDetail.module.css';

const TransactionDetail = () => {
    const { selectedTransaction } = useWallet();
    const navigate = useNavigate();

    if (!selectedTransaction) {
        return (
            <div className={styles.transactionDetailContainer}>
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={() => navigate('/')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <span className={styles.backText}>Back</span>
                    </button>
                </div>
                <div className={styles.emptyState}>
                    <p>No transaction selected</p>
                </div>
            </div>
        );
    }

    const goBack = () => {
        navigate('/');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    };

    const getStatus = () => {
        if (selectedTransaction.pending) {
            return 'Pending';
        }
        return 'Approved';
    };

    const formatAmount = () => {
        const amount = selectedTransaction.amount.toFixed(2);
        if (selectedTransaction.type === 'payment') {
            return `+$${amount}`;
        } else {
            return `$${amount}`;
        }
    };

    return (
        <div className={styles.transactionDetailContainer}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={goBack}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span className={styles.backText}>Back</span>
                </button>
            </div>

            <div className={styles.transactionAmount}>
                <div className={styles.logoWrapper}>
                    <CompanyLogo name={selectedTransaction.name} icon={selectedTransaction.icon} />
                </div>
                <div className={`${styles.amount} ${selectedTransaction.type === 'payment' ? styles.paymentAmount : styles.creditAmount}`}>
                    {formatAmount()}
                </div>
                <div className={styles.merchantName}>
                    {selectedTransaction.name}
                </div>
                <div className={styles.date}>
                    {formatDate(selectedTransaction.date)}
                </div>
            </div>

            <div className={styles.transactionInfo}>
                <div className={styles.statusSection}>
                    <div className={styles.labelValue}>
                        <span className={styles.label}>Status:</span>
                        <span className={`${styles.value} ${selectedTransaction.pending ? styles.pendingStatus : styles.approvedStatus}`}>
                            {selectedTransaction.pending ? 'Pending' : 'Approved'}
                        </span>
                    </div>

                    {selectedTransaction.authorizedUser && (
                        <div className={styles.labelValue}>
                            <span className={styles.label}>Authorized User:</span>
                            <span className={styles.value}>{selectedTransaction.authorizedUser}</span>
                        </div>
                    )}

                    {selectedTransaction.type === 'credit' && (
                        <div className={styles.labelValue}>
                            <span className={styles.label}>Card:</span>
                            <span className={styles.value}>Bank Debit Card</span>
                        </div>
                    )}

                    {selectedTransaction.percentage && (
                        <div className={styles.labelValue}>
                            <span className={styles.label}>Cashback:</span>
                            <span className={styles.value}>{selectedTransaction.percentage}</span>
                        </div>
                    )}

                    <div className={styles.labelValue}>
                        <span className={styles.label}>Description:</span>
                        <span className={styles.value}>{selectedTransaction.description}</span>
                    </div>
                </div>

                <div className={styles.totalSection}>
                    <div className={styles.labelValue}>
                        <span className={styles.label}>Total</span>
                        <span className={styles.value}>${selectedTransaction.amount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetail; 