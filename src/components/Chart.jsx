import React, { useEffect, useState } from 'react';
import axios from './Axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChargebackChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChargebackData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/chargebacks/data/');
        return response.data;
      } catch (error) {
        console.error('Error fetching chargeback data', error);
        throw error;
      }
    };

    const fetchReimbursementData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/rembourssement/data/');
        return response.data;
      } catch (error) {
        console.error('Error fetching refund data', error);
        throw error;
      }
    };

    const fetchData = async () => {
      try {
        const [chargebackData, reimbursementData] = await Promise.all([fetchChargebackData(), fetchReimbursementData()]);

        const labels = chargebackData.map(item => new Date(item.month).toLocaleString('default', { month: 'short', year: 'numeric' }));
        const chargebackValues = chargebackData.map(item => parseFloat(item.total_amount));
        const reimbursementValues = reimbursementData.map(item => parseFloat(item.total_amount));

        setChartData({
          labels,
          datasets: [
            {
              label: 'Chargebacks Amount',
              data: chargebackValues,
              backgroundColor: '#E9EFF8',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Refunds Amount',
              data: reimbursementValues,
              backgroundColor: '#BAD1F7',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }
          ],
        });
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!chartData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chargebacks and Refunds Amount by Month',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ChargebackChart;
