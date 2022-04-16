import styles from './TeamDetail.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function TeamDetail(props) {
    const router = useRouter(); // to grab teamId
    const [teamPlayers, setTeamPlayers] = useState([]);

    useEffect(() => {
        router.q
    }, []);

    return (
        <div> Team Details Page</div>
    );
};