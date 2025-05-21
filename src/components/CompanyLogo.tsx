import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faAppleAlt,
    faCreditCard,
    faShoppingCart,
    faShoppingBasket,
    faCoffee,
    faGlobe
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/CompanyLogo.module.css';

interface CompanyLogoProps {
    name: string;
    icon: string;
}

const CompanyLogo = ({ name, icon }: CompanyLogoProps) => {
    // Get background color based on company name
    const getBackgroundColor = (name: string): string => {
        const colorMap: Record<string, string> = {
            'Apple': '#000000',
            'IKEA': '#0051BA',
            'Target': '#CC0000',
            'Starbucks': '#00704A',
            'Payment': '#4CAF50',
            'H-E-B': '#CC0000',
            'Airalo': '#5D67FF',
            'default': '#333333'
        };

        return colorMap[name] || colorMap['default'];
    };

    // Get the appropriate icon from Font Awesome
    const getIcon = (iconName: string): IconDefinition => {
        const iconMap: Record<string, IconDefinition> = {
            'apple': faAppleAlt,
            'credit-card': faCreditCard,
            'shopping-cart': faShoppingCart,
            'shopping-basket': faShoppingBasket,
            'coffee': faCoffee,
            'globe': faGlobe,
            // Default icon if none matches
            'default': faCreditCard
        };

        return iconMap[iconName] || iconMap['default'];
    };

    // Get text color (for contrast with background)
    const getTextColor = (backgroundColor: string): string => {
        // For dark backgrounds, use white text
        if (['#000000', '#0051BA', '#00704A', '#5D67FF', '#333333'].includes(backgroundColor)) {
            return '#FFFFFF';
        }
        return '#FFFFFF'; // Default white for all for better visibility
    };

    const backgroundColor = getBackgroundColor(name);
    const textColor = getTextColor(backgroundColor);

    return (
        <div
            className={styles.logoContainer}
            style={{ backgroundColor, color: textColor }}
        >
            <FontAwesomeIcon icon={getIcon(icon)} />
        </div>
    );
};

export default CompanyLogo; 