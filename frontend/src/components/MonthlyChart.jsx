import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MonthlyChart({ gains = [] }) {
  const monthly = {};
  gains.forEach(g => {
    const m = new Date(g.date).toISOString().slice(0, 7); // YYYY-MM
    monthly[m] = (monthly[m] || 0) + g.gain;
  });
  const labels = Object.keys(monthly).sort();
  const data = {
    labels,
    datasets: [{ label: 'Gain/Loss (INR)', data: labels.map(l => monthly[l]), backgroundColor: 'teal' }]
  };
  return <Bar data={data} />;
}