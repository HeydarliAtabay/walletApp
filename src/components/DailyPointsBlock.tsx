import { calculateDailyPoints, formatPoints } from '../utils/pointsCalculator';
import styles from './styles/DailyPointsBlock.module.css';

const DailyPointsBlock = () => {
    const points = calculateDailyPoints();
    const formattedPoints = formatPoints(points);

    return (
        <div className={styles.dailyPointsBlock}>
            <div className={styles.dailyPointsHeader}>
                <h2>Daily Points</h2>
            </div>
            <div className={styles.dailyPointsAmount}>
                <span>{formattedPoints}</span>
            </div>
        </div>
    );
};

export default DailyPointsBlock; 