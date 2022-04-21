import styles from './Card.module.css';

export default function Card(props) {
    return (
        <div className={`${styles.card} ${props.className}`} onClick={props.onClick}>
            {props.children}
        </div>
    );
};