import { ApexOptions } from 'apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, Divider, CardProps } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_SIZE = { width: 106, height: 106 };

interface Props extends CardProps {
  chart: {
    colors?: string[];
    series: {
      label: string;
      percent: number;
      total: number;
    }[];
    options?: ApexOptions;
  };
}

export default function BookingCheckInWidgets({ chart, ...other }: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const { colors, series, options } = chart;

  const chartOptionsCheckIn = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: -9,
        bottom: -9,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize as string,
          },
        },
      },
    },
    ...options,
  });

  const chartOptionsCheckOut = {
    ...chartOptionsCheckIn,
    colors,
  };

  return (
    <Card {...other}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider
            orientation={isDesktop ? 'vertical' : 'horizontal'}
            flexItem
            sx={{ borderStyle: 'dashed' }}
          />
        }
      >
        {series.map((item, index) => (
          <Stack
            key={item.label}
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={3}
            sx={{ width: 1, py: 5 }}
          >
            <Chart
              type="radialBar"
              series={[item.percent]}
              options={index === 1 ? chartOptionsCheckOut : chartOptionsCheckIn}
              {...CHART_SIZE}
            />

            <div>
              <Typography variant="h4" sx={{ mb: 0.5 }}>
                {fNumber(item.total)}
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.72 }}>
                {item.label}
              </Typography>
            </div>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
