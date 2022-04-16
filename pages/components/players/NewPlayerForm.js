import { useState } from 'react';
import styles from '../../../styles/Forms.module.css';

const positionTypes = [
    "C", "A", "WS", "OH", "MB", "PS", "L", "S"
];
export default function NewPlayerForm(props) {
    const [newPlayer, setNewPlayer] = useState({firstName: '', lastName: '', positions: [positionTypes[0]]});
    
    const onInputChange = (event) => {
        const fieldName = event.target.name;
        const fieldValueString = event.target.value;
        let fieldValue;
        setNewPlayer((prevState) => {
            if (fieldName === 'positions') {
                fieldValue = [fieldValueString];
            } else {
                fieldValue = fieldValueString;
            }
            const state = {...prevState, [fieldName]: fieldValue}
            return state;
        });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onFormClose(newPlayer);
    };

    const positionOptions = [];
    positionTypes.forEach(positionType => {
        positionOptions.push(
            <option value={positionType}>{positionType}</option>
        )    
    });

    const createPlayerHandler = () => {
        console.log('createPlayerHandler()');
    };

    return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
        <label className={styles.label}>First Name</label>
        <input className={styles.inputField} type="text" placeholder="John" name="firstName" onChange={onInputChange} required/>
        
        <label className={styles.label}>Last Name</label>
        <input className={styles.inputField} type="text" placeholder="Smith" name="lastName" onChange={onInputChange} required/>

        <label className={styles.label}>Positions</label>
        <select name="positions" onChange={onInputChange} required>
            {positionOptions}
        </select>

        <div className={styles.formFooter}>
            <button className={styles.createBtn} onClick={createPlayerHandler}>Create</button>
        </div>
    </form>
    );
};