// @mui
import { Box, Card, Paper, Typography, CardHeader, CardContent, CardProps } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: {
    value: string;
    label: string;
    total: number;
  }[];
}

export default function AnalyticsTrafficBySite({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent>
        <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)">
          {list.map((site) => (
            <Paper key={site.label} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
              {(site.value === 'facebook' && (
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />
              )) ||
                (site.value === 'google' && (
                  <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />
                )) ||
                (site.value === 'linkedin' && (
                  <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />
                )) || <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />}

              <Typography variant="h6" sx={{ mt: 0.5 }}>
                {fShortenNumber(site.total)}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {site.label}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
