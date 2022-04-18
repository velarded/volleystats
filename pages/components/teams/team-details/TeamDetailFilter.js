import Filter from "../../shared/filter/Filter";

export default function TeamDetailFilter (props) {
    const addPlayerBtnClickHandler = () => {
        props.openModal();
      }
      
    return (
        <Filter onAddBtnClick={addPlayerBtnClickHandler} newBtnLabel="Add Player"/>
    );
};