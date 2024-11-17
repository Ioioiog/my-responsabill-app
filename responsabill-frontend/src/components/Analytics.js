import React from 'react';
import { Bar } from 'react-chartjs-2';

const Analytics = () => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3'],
    datasets: [
      {
        label: 'Progress',
        data: [65, 75, 80],
        backgroundColor: 'rgba(108, 99, 255, 0.5)',
      },
    ],
  };

  return (
    <div>
      <h2>Your Analytics</h2>
      <Bar data={data} />
    </div>
  );
};

export default Analytics;
