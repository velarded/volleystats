import styles from './PlayerRadar.module.css';
import mainStyles from '../../styles/Main.module.css';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Title,
    Legend,
  } from 'chart.js';

import { Radar } from 'react-chartjs-2';
import ChartCard from '../components/shared/card/ChartCard';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Title,
    Legend
);

export default function PlayerRadar(props) {
  const playerStats = props.playerStats ? props.playerStats : [];
  console.log('PlayerRadar', playerStats);
  const attackStats = playerStats.filter(stat => stat.contactType === 'Attack');
  const blockStats = playerStats.filter(stat => stat.contactType === 'Block');
  const passStats = playerStats.filter(stat => stat.contactType === 'Pass');
  const receiveStats = playerStats.filter(stat => stat.contactType === 'Receive');
  const serveStats = playerStats.filter(stat => stat.contactType === 'Serve');
  const setStats = playerStats.filter(stat => stat.contactType === 'Set');

  const attackSuccessStats = attackStats.filter(stat => stat.qualityType === 'Good' || stat.qualityType === 'Kill');
  const blockSuccessStats = blockStats.filter(stat => stat.qualityType === 'Good' || stat.qualityType === 'Kill' || stat.qualityType === 'Touch');
  const passSuccessStats = passStats.filter(stat => stat.qualityType === 'Good' || stat.qualityType === 'Dig');
  const receiveSuccessStats = receiveStats.filter(stat => stat.qualityType === 'Good');
  const serveSuccessStats = serveStats.filter(stat => stat.qualityType === 'Good' || stat.qualityType === 'Ace');
  const setSuccessStats = setStats.filter(stat => stat.qualityType === 'Good');

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scale: {
      min: 0,
      max: 100,
    },
    scales: {
      r: {
        angleLines: {color: 'transparent'},
        ticks: { 
          display: false,
        }
      }
    }
  };

  const data = {
    labels: ['Attack', 'Block', 'Pass', 'Receive', 'Serve', 'Set'],
    datasets: [
      {
        label: 'Success %',
        data: [
          Math.round((attackSuccessStats.length / attackStats.length) * 100, 2), 
          Math.round((blockSuccessStats.length / blockStats.length) * 100, 2),
          Math.round((passSuccessStats.length / passStats.length) * 100, 2), 
          Math.round((receiveSuccessStats.length / receiveStats.length) * 100, 2),
          Math.round((serveSuccessStats.length / serveStats.length) * 100, 2),
          Math.round((setSuccessStats.length / setStats.length) * 100, 2)
        ],
        backgroundColor: 'rgba(51, 214, 159, 0.5)',
        borderColor: 'rgba(51, 214, 159, 1)',
        borderWidth: 2,
        pointRadius: 2,
        pointBorderColor: 'rgba(51, 214, 159, 0.5)'
      },
    ],
  };

  return (
      <div className={styles.playerRadarContainer}>
        <ChartCard className={styles.playerRadar}>
            <Radar data={data} options={options}/>
        </ChartCard>
      </div>
    );
};