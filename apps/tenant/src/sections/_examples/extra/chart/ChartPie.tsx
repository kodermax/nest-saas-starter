// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const series = [44, 55, 13, 43];

export default function ChartPie() {
  const chartOptions = useChart({
    labels: ['Team A', 'Team B', 'Team C', 'Team D'],
    legend: {
      position: 'right',
      offsetX: -20,
      offsetY: 64,
      itemMargin: {
        vertical: 8,
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
  });

  return <Chart type="pie" series={series} options={chartOptions} width={400} />;
}
