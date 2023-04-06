import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Paper,
  Radio,
  Stack,
  GridSize,
  Container,
  Typography,
  RadioGroup,
  GridSpacing,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const LABELS = ['1col', '2col', '3col', '4col', '6col', '12col'];

const StyledBlockContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800],
}));

// ----------------------------------------------------------------------

FoundationGridPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function FoundationGridPage() {
  const theme = useTheme();

  const [spacing, setSpacing] = useState<GridSpacing>(2);

  const [column, setColumn] = useState<GridSize>(3);

  const handleChangeSpacing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  const handleChangeColumn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumn(Number((event.target as HTMLInputElement).value) as GridSize);
  };

  return (
    <>
      <Head>
        <title> Foundations: Grid | Minimal UI</title>
      </Head>

      <Box
        sx={{
          pt: 6,
          pb: 1,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="Grid"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Grid' },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={5}>
          <Block title="Spacing">
            <StyledBlockContainer variant="outlined">
              <Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
                Spacing: <strong>{theme.spacing(Number(spacing))}</strong>
              </Typography>

              <Grid container spacing={spacing}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
                  <Grid key={value} item xs={1}>
                    <Paper
                      sx={{
                        height: 80,
                        boxShadow: (theme) => theme.customShadows.z8,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <RadioGroup
                row
                name="spacing"
                value={spacing.toString()}
                onChange={handleChangeSpacing}
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    label={value.toString()}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>
            </StyledBlockContainer>
          </Block>

          <Block title="Column">
            <StyledBlockContainer variant="outlined">
              <Grid container spacing={3}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
                  <Grid key={value} item xs={column}>
                    <Paper
                      sx={{
                        py: 3,
                        textAlign: 'center',
                        boxShadow: (theme) => theme.customShadows.z8,
                      }}
                    >
                      xs = {column}
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <RadioGroup
                row
                name="column"
                value={column.toString()}
                onChange={handleChangeColumn}
                sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
              >
                {[12, 6, 4, 3, 2, 1].map((value, index) => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    label={LABELS[index]}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>
            </StyledBlockContainer>
          </Block>
        </Stack>
      </Container>
    </>
  );
}
