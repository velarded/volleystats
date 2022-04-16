import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PlayersFilter.module.css'
import { faSliders, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Filter from '../shared/filter/Filter';

export default function PlayersFilter(props) {
  const newPlayerBtnClickHandler = () => {
    props.openModal();
  }
    return (
      <Filter onAddBtnClick={newPlayerBtnClickHandler} entityName="Player"/>
    );
};