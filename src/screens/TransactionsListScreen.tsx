import CardBalanceBlock from '../components/CardBalanceBlock';
import NoPaymentDueBlock from '../components/NoPaymentDueBlock';
import DailyPointsBlock from '../components/DailyPointsBlock';
import TransactionsList from '../components/TransactionsList';
import styles from './styles/TransactionsListScreen.module.css';

const TransactionsListScreen = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topSection}>
                <div className={styles.leftColumn}>
                    <CardBalanceBlock />
                </div>
                <div className={styles.rightColumn}>
                    <NoPaymentDueBlock />
                    <DailyPointsBlock />
                </div>
            </div>

            <div className={styles.transactionsSection}>
                <TransactionsList />
            </div>
        </div>
    );
};

export default TransactionsListScreen; 