import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/NoPaymentDueBlock.module.css';

const NoPaymentDueBlock = () => {
    return (
        <div className={styles.noPaymentDueBlock}>
            <div className={styles.noPaymentDueHeader}>
                <h2>No Payment Due</h2>
            </div>
            <div className={styles.noPaymentDueContent}>
                <p>You've paid your September balance.</p>
                <div className={styles.checkIcon}>
                    <FontAwesomeIcon icon={faCheckCircle} size="2x" />
                </div>
            </div>
        </div>
    );
};

export default NoPaymentDueBlock; 