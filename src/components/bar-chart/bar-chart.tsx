import { FC, useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import barChartStyles from './bar-chart.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { IHourValues as IGroupingValues } from '../../utils/types';

const BarChart: FC = () => {
  const dispatch = useAppDispatch();
  const payments = useAppSelector(store => store.payments.payments);
  const filterType = useAppSelector(store => store.payments.filterType);
  const [isSum, setIsSum] = useState<boolean>(true);
  const chartRef = useRef<Chart<'bar'> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  Chart.register(...registerables);

  console.log(payments);

  const handleButtonsClick = (newIsSum: boolean) => {
    setIsSum(newIsSum);
  }

  function getValues(): IGroupingValues {
    const groupingValues: IGroupingValues = {};
    payments.results.forEach(payment => {
      const payDate = new Date(payment.pay_date);
      let groupingKey = payDate.getHours();
      if (filterType === 'range') {
        groupingKey = payDate.getDate();
      }
      let value = 1;
      if (isSum) {
        value = payment.price;
      }
      if (groupingKey in groupingValues) {
        groupingValues[groupingKey] += value;
      } else {
        groupingValues[groupingKey] = value;
      }
    });
    return groupingValues;
  }

  const data = useMemo<ChartData<'bar'>>(() => {
    const groupedPayments = getValues();
    return {
      labels: Object.keys(groupedPayments),
      datasets: [
        {
          label: 'Sales',
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75,192,192,0.6)',
          hoverBorderColor: 'rgba(75,192,192,1)',
          data: Object.values(groupedPayments),
        },
      ],
    }}, [payments, isSum]);

  const options = useMemo<ChartOptions<'bar'>>(() => ({
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }), []);

  useEffect(() => {
    if (canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: data,
        options: options,
      });
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data, options]);

  return (
    <div className={barChartStyles.container}>
      <div className={barChartStyles.buttonContainer}>
        <button
          className={barChartStyles.sum}
          type="button"
          onClick={() => handleButtonsClick(true)}
        >
          По сумме
        </button>
        <button
          className={barChartStyles.quantity}
          type="button"
          onClick={() => handleButtonsClick(false)}
        >
          По количеству
        </button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default BarChart;