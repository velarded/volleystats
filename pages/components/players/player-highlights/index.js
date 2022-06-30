import styles from "./PlayerHighlights.module.css";
import mainStyles from "../../../../styles/Main.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getPlayerById,
  getPlayerHighlights,
} from "../../../../lib/firestore/reads";
import PlayerHighlightCard from "./PlayerHighlightCard";
import Modal from "../../shared/modal/Modal";
import PlayerHighlightClip from "./PlayerHighlightClip";
import PlayerHighlightsFilter from "./PlayerHighlightsFilter";
import NewPlayerHighlightForm from "./NewPlayerHighlightForm";

const highlightTypes = {
  attacks: "Attack",
  serves: "Serve",
  defense: "Defense",
  assists: "Assist",
};

export const YOUTUBE_CLIP_BASE_URL = "https://youtube.com/clip/";

export default function PlayerHighlights(props) {
  const router = useRouter(); // to grab playerId
  const { playerId, highlightType } = router.query;
  const [player, setPlayer] = useState({});
  const [highlights, setHighlights] = useState([]);
  const [showHighlightModal, setShowHighlightModal] = useState(false);
  const [showNewPlayerHighlightModal, setShowNewPlayerHighlightModal] =
    useState(false);
  const [selectedHighlightClip, setSelectedHighlightClip] = useState({
    clipTitle: "",
    clipId: "",
  });
  const uid = useSelector((state) => state.currentUser.userId);
  const highlightLabel = highlightTypes[highlightType];
  const highlightsElements = [];

  useEffect(() => {
    async function fetchData() {
      console.log(highlightType);
      const playerData = await getPlayerById(uid, playerId);
      setPlayer(playerData);
      const playerHighlights = await getPlayerHighlights(
        uid,
        playerId,
        highlightType
      );
      console.log("playerHighlights: ", playerHighlights);
      setHighlights(playerHighlights);
    }

    fetchData();
  }, [uid, playerId, highlightType]);

  const highlightCardClickHandler = (highlightId) => {
    console.log("highlight clicked: ", highlightId);
    const selected = highlights.find((h) => h.id === highlightId);
    console.log(highlights);
    console.log("selected: ", selected);
    if (selected) {
      setSelectedHighlightClip(selected);
      setShowHighlightModal(true);
    }
  };

  const newPlayerHighlightHandler = async (newPlayerHighlight) => {
    setShowNewPlayerHighlightModal(false);
    // const newPlayerId = await addNewPlayer(newPlayer, uid);
    // setPlayers([...players, { ...newPlayer, id: newPlayerId }]);
  };

  highlights.forEach((highlight) => {
    console.log("highlight:", highlight);
    highlightsElements.push(
      <PlayerHighlightCard
        key={highlight.id}
        highlightId={highlight.id}
        clipTitle={highlight.clipTitle}
        embeddedUrl={highlight.embeddedUrl}
        onClick={highlightCardClickHandler}
      />
    );
  });

  return (
    <div className={styles.highlightsContainer}>
      <nav className={styles.highlightsNav}>
        <ul>
          <li className={styles.listItemBreadCrumb}>
            <div className={styles.breadcrumbNav}>
              <Link href="/players">
                <h1 className={styles.playerTitle}>Players</h1>
              </Link>
              <FontAwesomeIcon
                className={styles.navArrow}
                icon={faAngleRight}
              />
              <Link href={`/players/${playerId}`}>
                <span className={styles.playerName}>
                  {player.firstName} {player.lastName}
                </span>
              </Link>
            </div>
          </li>
          <li>
            <span className={styles.highlightTitle}>
              {highlightLabel} Highlights
            </span>
          </li>
          <li className={styles.filterListItem}>
            <PlayerHighlightsFilter
              openModal={() => setShowNewPlayerHighlightModal(true)}
            />
          </li>
        </ul>
      </nav>
      <div>{highlightsElements}</div>
      <Modal
        show={showHighlightModal}
        onClose={() => setShowHighlightModal(false)}
        title={selectedHighlightClip.clipTitle}
      >
        <PlayerHighlightClip embeddedUrl={selectedHighlightClip.embeddedUrl} />
      </Modal>
      <Modal
        show={showNewPlayerHighlightModal}
        onClose={() => setShowNewPlayerHighlightModal(false)}
        title="Add Highlight"
      >
        <NewPlayerHighlightForm onFormClose={newPlayerHighlightHandler} />
      </Modal>
    </div>
  );
}
