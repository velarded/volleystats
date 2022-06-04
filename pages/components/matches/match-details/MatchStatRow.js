import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from './MatchStatRow.module.css';
import { CONTACT_TYPES, QUALITY_TYPES } from "./MatchTeamStatTable";

export default function MatchStatRow(props) {
    const stat = props.matchStatRow;
    const index = props.index;
    const players = props.players ? props.players : [];
    const playerNames = players.map(player => player.firstName + " " + player.lastName);
    const [matchStatRow, setMatchStatRow] = useState({ id: props.id, playerId: players[0] ? players[0].id : '', contactType: CONTACT_TYPES[0], qualityType: QUALITY_TYPES[0]});
    const [selectedPlayer, setSelectedPlayer] = useState({});
    const [selectedContactType, setSelectedContactType] = useState(CONTACT_TYPES[0]);
    const [selectedQualityType, setSelectedQualityType] = useState(QUALITY_TYPES[0]);
    const rowStyles = [styles['row']];

    useEffect(() => {
        const matchStatRow = props.matchStatRow;
        if (matchStatRow) {
            console.log('matchStatRow: ', matchStatRow);
            setMatchStatRow(matchStatRow);
            const player = players.find(p => p.id === matchStatRow.playerId);
            if (player)
                setSelectedPlayer(player);
            setSelectedContactType(matchStatRow.contactType);
            setSelectedQualityType(matchStatRow.qualityType);
        }
    }, [props.matchStatRow, players]);

    const playerOptions = [];
    const contactTypeOptions = [];
    const qualityTypeOptions = [];

    players.forEach(player => playerOptions.push(<option value={player.id}>{player.firstName + " " + player.lastName}</option>));
    CONTACT_TYPES.forEach(contactType => contactTypeOptions.push(<option value={contactType}>{contactType}</option>));
    QUALITY_TYPES.forEach(qualityType => qualityTypeOptions.push(<option value={qualityType}>{qualityType}</option>));

    const selectHandler = (event, field) => {
        console.log('option changed: ', event, field);
        props.onRowUpdate({...stat, [field]: event.target.value}, index);
        // stat = {...stat, [field]: event.target.value};
    };

    const pointUpdateHandler = (event) => {
        console.log("point checkbox clicked: ", event.target.checked);
    };

    const deleteHandler = (event) => {
        console.log('delete btn clicked');
        props.onDelete(stat.id, index);
    };

    if (matchStatRow.contactType === 'Serve') {
        rowStyles.push(styles['serveRow']);
    }

    if (matchStatRow.contactType === 'Receive') {
        rowStyles.push(styles['receiveRow']);
    }

    return (
        <tr className={rowStyles.join(" ")}>
            <td>{index}</td>
            <td>
                <select onInput={(e) => selectHandler(e, 'playerId')} value={selectedPlayer.id}>
                    {playerOptions}
                </select>
            </td>
            <td>
                <select onInput={(e) => selectHandler(e, 'contactType')} value={selectedContactType}>
                    {contactTypeOptions}
                </select>
            </td>
            <td>
                <select onInput={(e) => selectHandler(e, 'qualityType')} value={selectedQualityType}>
                    {qualityTypeOptions}
                </select>
            </td>
            <td><input type="checkbox" onChange={pointUpdateHandler}/></td>
            <td>
                <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} onClick={deleteHandler}/>
            </td>
        </tr>
    );
};