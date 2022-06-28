import styles from "./PlayerHighlightClip.module.css";

export default function PlayerHighlightClip(props) {
  const clipId = props.clipId ? props.clipId : "";
  const embeddedUrl = props.embeddedUrl ? props.embeddedUrl : "";

  console.log("embeddedUrl: ", embeddedUrl);

  return (
    <div className={styles.videoContainer}>
      <iframe
        width="100%"
        height="100%"
        src={embeddedUrl}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}
