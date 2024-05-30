import React, { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import pieChartStyles from './pie-chart.module.css';
import { Interface } from 'readline';

interface IPieChartProps {
  items: {[key: string]: number};
  header: string;
}

const PieChart: FC<IPieChartProps> = ({ items, header }) => {
  const total = Object.values(items).reduce((total, current) => total + current, 0);
  const data = {
    labels: Object.keys(items),
    datasets: [
      {
        data: Object.values(items),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  return (
    <div>
      <h2>{header}</h2>
      <h2>Всего {total} RUB</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default PieChart;
