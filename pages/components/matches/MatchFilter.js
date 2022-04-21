import Filter from "../shared/filter/Filter";

export default function MatchFilter(props) {
    const newMatchBtnClickHandler = () => {
        props.openModal();
    };

    return (
        <Filter onAddBtnClick={newMatchBtnClickHandler} newBtnLabel="New Match"/>
    )
}