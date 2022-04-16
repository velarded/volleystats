import styles from '../../../styles/Forms.module.css';
import { useState } from 'react';

export default function NewTeamForm(props) {
    const [newTeam, setNewTeam] = useState({teamName: ''});

    const onInputChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setNewTeam((prevState) => { return {...prevState, [fieldName]: fieldValue} });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onFormClose(newTeam);
    };

    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <label className={styles.label}>Team Name</label>
            <input className={styles.inputField} type="text" placeholder="Team Name" name="teamName" onChange={onInputChange} required />

            <div className={styles.formFooter}>
                <button className={styles.createBtn} type="submit">Create</button>
            </div>
        </form>
    );
};