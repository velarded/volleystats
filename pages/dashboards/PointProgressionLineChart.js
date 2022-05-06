import styles from './PointProgressionLineChart.module.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMatchById } from '../../lib/firestore/reads';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);
// Team One = Red
// Team Two = Blue
const staticPointsHistory = [
  { teamOnePoints: 0, teamTwoPoints: 1 },
  { teamOnePoints: 1, teamTwoPoints: 1 },
  { teamOnePoints: 2, teamTwoPoints: 1 },
  { teamOnePoints: 3, teamTwoPoints: 1 },
  { teamOnePoints: 4, teamTwoPoints: 1 },
  { teamOnePoints: 4, teamTwoPoints: 2 },
  { teamOnePoints: 4, teamTwoPoints: 3 },
  { teamOnePoints: 5, teamTwoPoints: 3 },
  { teamOnePoints: 6, teamTwoPoints: 3 },
  { teamOnePoints: 7, teamTwoPoints: 3 },
  { teamOnePoints: 7, teamTwoPoints: 4 },
  { teamOnePoints: 8, teamTwoPoints: 4 },
  { teamOnePoints: 9, teamTwoPoints: 4 }
];

export default function PointProgressionLineChart(props) {
  const matchId = props.matchId;
  const uid = useSelector((state) => state.currentUser.userId);
  const [pointsHistory, setPointsHistory] = useState(staticPointsHistory);

  useEffect(() => {
    async function fetchData() {
      const match = await getMatchById(uid, matchId);
      setPointsHistory(match.pointsHistory);
    };

    fetchData();
  }, [uid]);

  const teamOneDataset = [0];
  const teamTwoDataset = [0];
  const pointLabels = ['0'];

  for (let i=0; i < pointsHistory.length; i++) {
    const pointHistory = pointsHistory[i];
    const pointLabel = i + 1;
    pointLabels.push("" + pointLabel);

    const pointDiff = pointHistory.teamOnePoints - pointHistory.teamTwoPoints
    const teamOnePointDiff = pointHistory.teamOnePoints - pointHistory.teamTwoPoints;
    const teamTwoPointDiff = pointHistory.teamTwoPoints - pointHistory.teamOnePoints;

    console.log('teamOnePointDiff: ', teamOnePointDiff, ' teamTwoPointDiff:  ', teamTwoPointDiff)
    teamOneDataset.push(teamOnePointDiff > 0 ? teamOnePointDiff : 0);
    teamTwoDataset.push(teamTwoPointDiff > 0 ? teamTwoPointDiff * -1 : 0);
  }

  console.log('pointLabels', pointLabels);
  console.log('teamOneDataset', teamOneDataset);
  console.log('teamTwoDataset', teamTwoDataset);

  const options = {
    // responsive: true,
    type: 'line',
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'April 22, 2022 - Game One Point Difference',
      },
    },
    scales: {
      x: {
        grid: {display:false},
      },
      y: {
        grid:{display:false},
      }    
    }
  };

  const data = {
    labels: pointLabels,
    datasets: [{
          label: 'Team One',
          data: teamOneDataset,
          borderColor: 'rgb(198, 36, 36)',
          backgroundColor: 'rgba(198, 36, 36, 0.2)',
          fill: true,
          pointStyle: 'circle',
          radius: 0,
          borderWidth: 2,
    },
    {
          label: 'Team Two',
          data: teamTwoDataset,
          borderColor: 'rgb(54, 62, 214)',
          backgroundColor: 'rgba(54, 62, 214, 0.2)',
          fill: true,
          pointStyle: 'circle',
          radius: 0,
          borderWidth: 2,
    }]
  };

    return (
        <div>
            <h1>Line Chart Example</h1>
            <div className={styles.lineContainer}>
              <Line options={options} data={data} />
            </div>
        </div>
    );
};