import styles from './Modal.module.css';

export default function Modal(props) {
    if (!props.show) {
        return null;
    }
    
    return (
        <div className={`${styles.modal} ${props.className}`} onClick={props.onClose}>
            <div className={`${styles.modalContent} ${props.contentClass}`} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>{props.title}</h1>
                </div>
                <div className={styles.modalBody}>
                    {props.children}
                </div>
                <div className={styles.modalFooter}>
                    {/* <button className={styles.modalActionButton} onClick={props.actionHandler}>{props.actionBtnText}</button> */}
                </div>
            </div>
        </div>
    )
};