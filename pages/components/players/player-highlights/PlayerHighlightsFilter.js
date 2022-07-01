import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./PlayerHighlightsFilter.module.css";
import {
  faSliders,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Filter from "../../shared/filter/Filter";

export default function PlayerHighlightsFilter(props) {
  const addHighlightBtnClickHandler = () => {
    props.openModal();
  };
  return (
    <Filter
      onAddBtnClick={addHighlightBtnClickHandler}
      newBtnLabel="Add Highlight"
    />
  );
}
