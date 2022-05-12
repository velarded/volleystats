import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from './PlayerStatRow.module.css';

const CONTACT_TYPES = [
    "Attack",
    "Block",
    "Dig",
    "Pass",
    "Receive",
    "Serve",
    "Set"
];

const QUALITY_TYPES = [
    "Ace",
    "Kill",
    "Good",
    "Bad",
    "Error",
    "Touch"
];

export default function PlayerStatRow(props) {
    const [selectedPlayer, setSelectedPlayer] = useState({});
    const [selectedContactType, setSelectedContactType] = useState(CONTACT_TYPES[0]);
    const [selectedQualityType, setSelectedQualityType] = useState(QUALITY_TYPES[0]);

    const players = props.players ? props.players : [];
    const playerNames = players.map(player => player.firstName + " " + player.lastName);
    const playerOptions = [];
    const contactTypeOptions = [];
    const qualityTypeOptions = [];

    playerNames.forEach(playerName => playerOptions.push(<option>{playerName}</option>));
    CONTACT_TYPES.forEach(contactType => contactTypeOptions.push(<option>{contactType}</option>));
    QUALITY_TYPES.forEach(qualityType => qualityTypeOptions.push(<option>{qualityType}</option>));

    const selectHandler = (event) => {
        console.log('option changed: ', event);
    };

    return (
        <tr className={styles.row}>
            <td>
                <select onInput={selectHandler}>
                    {playerOptions}
                </select>
            </td>
            <td>
                <select>
                    {contactTypeOptions}
                </select>
            </td>
            <td>
                <select>
                    {qualityTypeOptions}
                </select>
            </td>
            <td>
                <FontAwesomeIcon icon={faTrash}/>
            </td>
        </tr>
    );
};