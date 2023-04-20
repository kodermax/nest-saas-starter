// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const series = [44, 55, 13, 43];

export default function ChartDonut() {
  const chartOptions = useChart({
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    stroke: {
      show: false,
    },
    legend: {
      horizontalAlign: 'center',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
        },
      },
    },
  });

  return <Chart type="donut" series={series} options={chartOptions} width={400} />;
}
