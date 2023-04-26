import { Chart, ArcElement, Tooltip, Legend, LinearScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { backgroundColor } from '../../const/chart-js';

import { StatRateCC } from '../../types/types';

export const getPieChartRates = (stats: StatRateCC[]) => ({
  labels: stats.map((item) => item.rate),
  data: stats.map((item) => +item.count),
});

Chart.register(ArcElement, Tooltip, Legend, LinearScale);

export const getPieChartData = (stats: StatRateCC[]) => {
  const { data, labels } = getPieChartRates(stats);

  return {
    labels,
    datasets: [
      {
        label: 'Количество оценок',
        data,
        backgroundColor,
        borderColor: 'rgb(0,0,0)',
        borderWidth: 3,
      },
    ],
  };
};

export function GraphRound({ stats }: { stats: StatRateCC[] }) {
  if (!stats.length) {
    return <h2> Оценок пока нет...</h2>;
  }
  const data = getPieChartData(stats);
  return <Pie data={data} />;
}
