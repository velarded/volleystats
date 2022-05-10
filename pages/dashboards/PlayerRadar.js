import styles from './PlayerRadar.module.css';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Radar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const data = {
    labels: ['Serve', 'Serve Receive', 'Set', 'Attack', 'Block', 'Pass'],
    datasets: [
      {
        label: '# of Votes',
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

export default function PlayerRadar(props) {
    return (
        <div className={styles.playerRadar}>
            <Radar data={data} />
        </div>
    );
};