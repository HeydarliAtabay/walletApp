import TransactionDetail from '../components/TransactionDetail';
import styles from './styles/TransactionDetailScreen.module.css';

const TransactionDetailScreen = () => {
    return (
        <div className={styles.container} style={{ width: '100%' }}>
            <TransactionDetail />
        </div>
    );
};

export default TransactionDetailScreen; 