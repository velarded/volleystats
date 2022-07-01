import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    setNewPlayerHighlight((prevState) => {
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

      <label className={styles.label}>Youtube Clip Emedded URL <i title='Share Clip > Embed. Copy the value in "src"'><FontAwesomeIcon icon={faCircleInfo}/></i></label>
      <input
        className={styles.inputField}
        type="text"
        placeholder="https://www.youtube.com/embed/q5mg1rp6hG4?clip=UgkxDa3f9vwz4KTn7IE6GQHjru6mQjL_vcvU&amp;clipt=EJfWBhivywc"
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
