import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Grid, Card, CardContent, IconButton, Paper, CardHeader } from '@mui/material';
// components
import Iconify from '../../../../../components/iconify';
//
import Logo from './Logo';
import Button from './Button';

// ----------------------------------------------------------------------

export default function Other() {
  const [count, setCount] = useState(0);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper
              variant="outlined"
              sx={{
                borderRadius: 1.5,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
              }}
            >
              <CardHeader title="Button Click" />
              <Box sx={{ p: 5, minHeight: 180, '& > *': { mx: 1 } }}>
                <Button />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper
              variant="outlined"
              sx={{
                position: 'relative',
                borderRadius: 1.5,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
              }}
            >
              <CardHeader title="Path" />
              <Box sx={{ p: 5, minHeight: 180, '& > *': { mx: 1 } }}>
                <IconButton
                  onClick={() => setCount(count + 1)}
                  sx={{ position: 'absolute', right: 16, top: 16 }}
                >
                  <Iconify icon="eva:refresh-fill" />
                </IconButton>
                <Logo key={count} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
