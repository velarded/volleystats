import styles from './Card.module.css';

export default function Card(props) {
    return (
        <div className={styles.card} onClick={props.onClick}>
            {props.children}
        </div>
    );
};