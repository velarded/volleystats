import { useState } from "react";
import Card from "../../shared/card/Card";
import Modal from "../../shared/modal/Modal";
import styles from "./PlayerHighlightCard.module.css";
import PlayerHighlightClip from "./PlayerHighlightClip";

// https://img.youtube.com/vi/2RgfWphLyM4/maxresdefault.jpg

export default function PlayerHighlightCard(props) {
  const highlightId = props.highlightId ? props.highlightId : "";
  const clipTitle = props.clipTitle ? props.clipTitle : "";
  const embeddedUrl = props.embeddedUrl ? props.embeddedUrl : "";
  const [showHighlightModal, setShowHighlightModal] = useState(false);
  console.log("highlightId: ", highlightId);
  const videoId = embeddedUrl
    .substring(0, embeddedUrl.indexOf("?"))
    .replace("https://www.youtube.com/embed/", "");
  const onClipCardClick = () => {
    props.onClick(highlightId);
  };

  const backgroundImgStyle = {
    backgroundImage: `url("https://img.youtube.com/vi/${videoId}/maxresdefault.jpg")`,
  };

  return (
    <Card className={styles.clipCard} onClick={onClipCardClick}>
      <div className={styles.cardImg} style={backgroundImgStyle}></div>
      <h3>{clipTitle}</h3>
    </Card>
  );
}
