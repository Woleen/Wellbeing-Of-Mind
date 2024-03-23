import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';


const TestResultChart = ({ data }) => {
  const chartData = {
    labels: data.map(([choice]) => choice),
    datasets: [{
      label: 'Choice Counts',
      data: data.map(([, count]) => count),
      backgroundColor: [
        'rgba(0, 0, 0, 0.6)',
        'rgba(255, 255, 0, 0.6)',
        'rgba(0, 128, 0, 0.6)',
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div style={{ height: '40vh', margin: 'auto' }}>
      <Pie
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        }}
      />
    </div>
  );
};

export default TestResultChart;
