import { useWallet } from '../context/WalletContext';
import styles from './styles/CardBalanceBlock.module.css';

const CardBalanceBlock = () => {
    const { cardDetails } = useWallet();

    return (
        <div className={styles.cardBalanceBlock}>
            <div className={styles.cardBalanceHeader}>
                <h2>Card Balance</h2>
            </div>
            <div className={styles.cardBalanceAmount}>
                <span className={styles.dollarSign}>$</span>
                <span className={styles.amount}>{cardDetails.balance.toFixed(2)}</span>
            </div>
            <div className={styles.cardBalanceAvailable}>
                <span>${cardDetails.availableCredit.toFixed(2)} Available</span>
            </div>
        </div>
    );
};

export default CardBalanceBlock; 