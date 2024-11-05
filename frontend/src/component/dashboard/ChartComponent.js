import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { ChartLoading } from '../loading';
import { useSelector } from 'react-redux';
import { getAllDashboardDetail } from '../../redux/dashboard/slice';
import { getAllTranslateDetail } from '../../redux/translation/slice';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ChartComponent = () => {
  const { statistics, statisticsLoading } = useSelector(getAllDashboardDetail);
  const { translations } = useSelector(getAllTranslateDetail);
  const data = {
    labels: [
      translations?.breadcrumb?.home?.totalUsers,
      translations?.breadcrumb?.home?.newUsers,
      translations?.breadcrumb?.home?.activeUsers
    ],
    datasets: [
      {
        label: translations?.breadcrumb?.home?.userStatistics,
        data: [
          statistics?.totalUsers || 0,
          statistics?.newUsersCount || 0,
          statistics?.activeUsers || 0
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1
      }
    ]
  };

  return (
    <>
      {statisticsLoading ? (
        <ChartLoading />
      ) : (
        <div className="user-statistics users-statistics-chart">
          <h2>{translations?.breadcrumb?.home?.userStatistics}</h2>
          <div className="chart-container">
            <Bar
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.label}: ${context.raw}`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChartComponent;
