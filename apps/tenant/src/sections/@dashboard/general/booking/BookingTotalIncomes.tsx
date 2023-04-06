import { ApexOptions } from 'apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, CardProps } from '@mui/material';
// utils
import { fCurrency, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import Chart, { useChart } from '../../../../components/chart';
//
import { ColorSchema } from '../../../../theme/palette';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  total: number;
  percent: number;
  color?: ColorSchema;
  chart: {
    series: number[];
    options?: ApexOptions;
  };
}

export default function BookingTotalIncomes({
  total,
  percent,
  color = 'primary',
  chart,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const { series, options } = chart;

  const chartOptions = useChart({
    colors: [theme.palette[color].main],
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    stroke: {
      width: 4,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    tooltip: {
      marker: {
        show: false,
      },
      y: {
        formatter: (value: number) => fCurrency(value),
        title: {
          formatter: () => '',
        },
      },
    },
    fill: { gradient: { opacityFrom: 0, opacityTo: 0 } },
    ...options,
  });

  return (
    <Card
      sx={{
        p: 3,
        boxShadow: 0,
        color: `${color}.darker`,
        bgcolor: `${color}.lighter`,
        ...sx,
      }}
      {...other}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <div>
          <Typography sx={{ mb: 2, typography: 'subtitle2' }}>Total Incomes</Typography>
          <Typography sx={{ typography: 'h3' }}>{fCurrency(total)}</Typography>
        </div>

        <div>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ mb: 0.6 }}>
            <Iconify icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />

            <Typography variant="subtitle2" component="span" sx={{ ml: 0.5 }}>
              {percent > 0 && '+'}
              {fPercent(percent)}
            </Typography>
          </Stack>

          <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
            &nbsp;than last month
          </Typography>
        </div>
      </Stack>

      <Chart type="area" series={[{ data: series }]} options={chartOptions} height={132} />
    </Card>
  );
}
