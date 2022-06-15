import ChartCard from '../../shared/card/ChartCard';
import styles from './PlayerStatsBarGraph.module.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function PlayerStatsBarGraph(props) {
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
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const labels = ['Serve', 'Receive', 'Pass', 'Set', 'Attack', 'Block'];
  
    const data = {
      labels,
      datasets: [
        {
            label: 'Total',
            data: [
                serveStats.length,
                receiveStats.length,
                passStats.length,
                setStats.length,
                attackStats.length,
                blockStats.length
            ],
            backgroundColor: 'rgba(50, 50, 50, 0.5)',
            borderColor: 'rgba(50, 50, 50, 1)',
            borderWidth: 2,
        },
        {
            label: 'Success',
            data: [
                serveSuccessStats.length,
                receiveSuccessStats.length,
                passSuccessStats.length,
                setSuccessStats.length,
                attackSuccessStats.length,
                blockSuccessStats.length
            ],
            backgroundColor: 'rgba(51, 214, 159, 0.5)',
            borderColor: 'rgba(51, 214, 159, 1)',
            borderWidth: 2,
        },
        {
            label: 'Errors',
            data: [
                serveStats.length - serveSuccessStats.length,
                receiveStats.length - receiveSuccessStats.length,
                passStats.length - passSuccessStats.length,
                setStats.length - setSuccessStats.length,
                attackStats.length - attackSuccessStats.length,
                blockStats.length - blockSuccessStats.length
            ],
            backgroundColor: 'rgba(248, 149, 58, 0.5)',
            borderColor: 'rgba(248, 149, 58, 1)',
            borderWidth: 2,
        },
      ],
    };

    return (
        <div className={styles.playerStatsBarGraphContainer}>
            <ChartCard className={styles.playerStatsBarGraph}>
                <Bar data={data} options={options}/>
            </ChartCard>
        </div>
    );
};