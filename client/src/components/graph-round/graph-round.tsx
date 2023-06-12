import { Chart, ArcElement, Tooltip, Legend, LinearScale, ChartOptions, ChartTypeRegistry } from 'chart.js';
import { getElementsAtEvent,  Pie } from 'react-chartjs-2';
import { MouseEventHandler, useRef } from 'react';
import { backgroundColor } from '../../const/chart-js';

import { StatRateCC } from '../../types/types';

export const getPieChartRates = (stats: StatRateCC[]) => ({
  labels: stats.map((item) => item.rate),
  data: stats.map((item) => +item.count),
});

Chart.register(ArcElement, Tooltip, Legend, LinearScale);

const options: ChartOptions <keyof ChartTypeRegistry>= {
  responsive: true,
  maintainAspectRatio: true,
  layout: {padding: 8},


  plugins: {
    tooltip: {
      backgroundColor: 'rgb(48, 6, 6)',
      bodyColor: '#FFF',
      borderColor: '#FFF',
      borderWidth: 4

    },
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        color: 'rgb(255, 155, 5)'
      }
    }
  }
}



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
        borderWidth: 4,
        hoverOffset: 16,
        spacing: 1,
        hoverBackgroundColor: '#FFF',
        hoverBorderWidth: 6,
      },
    ],
  };
};


type GraphRoundType = {
  stats: StatRateCC[],
  onDigitClick: (num: number) => void
}

export function GraphRound({ stats,  onDigitClick }: GraphRoundType) {

  const chartRef = useRef()

  if (!stats.length) {
    return <h2> Оценок пока нет...</h2>;
  }

  const data = getPieChartData(stats);

  const handleClick: MouseEventHandler<HTMLCanvasElement> = (evt) => {
    const {current} = chartRef;
    if (!current) {
      return;
    }
    const elements = getElementsAtEvent(current, evt)

    if (!elements.length) {
      return;
    }

    const {index} = elements[0];
    onDigitClick(data.labels[index])
  }

  return <Pie ref={chartRef}  data={data}  options={options} onClick={handleClick} />;
}




