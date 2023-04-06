// @mui
import { useTheme } from '@mui/material/styles';
// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const series = [
  {
    name: 'Series 1',
    data: [80, 50, 30, 40, 100, 20],
  },
  {
    name: 'Series 2',
    data: [20, 30, 40, 80, 20, 80],
  },
  {
    name: 'Series 3',
    data: [44, 76, 78, 13, 43, 10],
  },
];

export default function ChartRadarBar() {
  const theme = useTheme();

  const chartOptions = useChart({
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.48,
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    xaxis: {
      categories: ['2011', '2012', '2013', '2014', '2015', '2016'],
      labels: {
        style: {
          colors: [
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
          ],
        },
      },
    },
  });

  return <Chart type="radar" series={series} options={chartOptions} width={540} />;
}
