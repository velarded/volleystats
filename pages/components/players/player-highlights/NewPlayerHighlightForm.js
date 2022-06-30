import { useState } from "react";
import styles from "./NewPlayerHighlightForm.module.css";

export default function NewPlayerHighlightForm(props) {
  const [newPlayerHighlight, setNewPlayerHighlight] = useState({
    clipTitle: "",
    matchId: "",
    embeddedUrl: "",
  });

  const onInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValueString = event.target.value;
    let fieldValue;
    setNewPlayer((prevState) => {
      fieldValue = fieldValueString;
      const state = { ...prevState, [fieldName]: fieldValue };
      return state;
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormClose(newPlayerHighlight);
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <label className={styles.label}>Highlight Title</label>
      <input
        className={styles.inputField}
        type="text"
        placeholder="Highlight Clip Title"
        name="clipTitle"
        onChange={onInputChange}
        required
      />

      <label className={styles.label}>Youtube Clip Emedded URL</label>
      <input
        className={styles.inputField}
        type="text"
        placeholder=""
        name="embeddedUrl"
        onChange={onInputChange}
        required
      />
      {/* 
      <label className={styles.label}>Positions</label>
      <select name="positions" onChange={onInputChange} required>
        {positionOptions}
      </select> */}

      <div className={styles.formFooter}>
        <button className={styles.createBtn}>Create</button>
      </div>
    </form>
  );
}
