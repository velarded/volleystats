import styles from './ChartCard.module.css';

export default function ChartCard(props) {
    return (
        <div className={`${styles.chartCard} ${props.className}`} onClick={props.onClick}>
            {props.children}
        </div>
    );
};