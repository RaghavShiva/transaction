import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeChart = ({ transactions }) => {
  const categories = transactions.reduce((acc, t) => {
    acc[t.title] = (acc[t.title] || 0) + parseFloat(t.amount);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Income Breakdown</h3>
      <Pie data={data} />
      <div className="chart-summary">
        <span>Total Income: ${transactions.reduce((acc, t) => acc + parseFloat(t.amount), 0).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default IncomeChart;
