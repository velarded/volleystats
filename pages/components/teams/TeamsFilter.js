import Filter from '../shared/filter/Filter';
import styles from './TeamsFilter.module.css';

export default function TeamsFilter(props) {
    const newTeamBtnClickHandler = () => {
        props.openModal();
      }

    return (
        <Filter onAddBtnClick={newTeamBtnClickHandler} newBtnLabel="New Team"/>
    );
};