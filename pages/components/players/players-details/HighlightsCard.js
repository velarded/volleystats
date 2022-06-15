import styles from './HighlightsCard.module.css';

export default function HighlightsCard(props) {
    return (
        <div className={styles.highlightsCard}>
            <p className={styles.label}>{props.label}</p>
        </div>
    )
};