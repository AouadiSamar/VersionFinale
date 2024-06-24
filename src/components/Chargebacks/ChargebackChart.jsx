import React, { useEffect, useState } from 'react';
import axios from '../Axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './ChargebackChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChargebackChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/chargebacks/data/');
        const data = response.data;

        console.log("Chargeback Data:", data); // Log the raw data

        if (data && data.length) {
          const labels = data.map(item => new Date(item.month).toLocaleString('default', { month: 'short', year: 'numeric' }));
          const values = data.map(item => parseFloat(item.total_amount));

          setChartData({
            labels,
            datasets: [
              {
                label: 'Chargebacks Amount',
                data: values,
                backgroundColor: ' #E9EFF8        ',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          setChartData(null);
        }
      } catch (error) {
        console.error('Error fetching chargeback data', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
        setError('Error fetching chargeback data');
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
              text: 'Chargebacks Amount by Month',
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
