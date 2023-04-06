import { ApexOptions } from 'apexcharts';
import sumBy from 'lodash/sumBy';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Card, CardHeader, Stack, Box, Typography, CardProps } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

type ItemProps = {
  label: string;
  value: number;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: ItemProps[];
    options?: ApexOptions;
  };
}

export default function BookingRoomAvailable({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  const total = sumBy(series, 'value');

  const chartSeries = (series.filter((i) => i.label === 'Sold out')[0].value / total) * 100;

  const chartColors = colors || [theme.palette.primary.light, theme.palette.primary.main];

  const chartOptions = useChart({
    legend: {
      show: false,
    },
    grid: {
      padding: { top: -32, bottom: -32 },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [chartColors].map((colors) => [
          { offset: 0, color: colors[0] },
          { offset: 100, color: colors[1] },
        ]),
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        dataLabels: {
          name: { offsetY: -16 },
          value: { offsetY: 8 },
          total: {
            label: 'Rooms',
            formatter: () => fNumber(total),
          },
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 8 }} />

      <Chart type="radialBar" series={[chartSeries]} options={chartOptions} height={310} />

      <Stack spacing={2} sx={{ p: 5 }}>
        {series.map((item) => (
          <Legend key={item.label} item={item} />
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

type LegendProps = {
  item: ItemProps;
};

function Legend({ item }: LegendProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16),
            borderRadius: 0.75,
            ...(item.label === 'Sold out' && {
              bgcolor: 'primary.main',
            }),
          }}
        />

        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {item.label}
        </Typography>
      </Stack>

      <Typography variant="subtitle1"> {item.value} Rooms</Typography>
    </Stack>
  );
}
