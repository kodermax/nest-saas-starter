import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Alert, Button, Container, AlertTitle, Stack } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const COLORS = ['info', 'success', 'warning', 'error'] as const;

// ----------------------------------------------------------------------

MUIAlertPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIAlertPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title> MUI Components: Alert | Minimal UI</title>
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
            heading="Alert"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Alert' },
            ]}
            moreLink={['https://mui.com/components/alert']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={2} spacing={3}>
          <Block title="Standard">
            <Stack spacing={2}>
              {COLORS.map((color) => (
                <Alert key={color} severity={color} onClose={() => {}}>
                  This is an {color} alert — check it out!
                </Alert>
              ))}
            </Stack>
          </Block>

          <Block title="Filled">
            <Stack spacing={2}>
              {COLORS.map((color) => (
                <Alert key={color} severity={color} variant="filled" onClose={() => {}}>
                  This is an {color} alert — check it out!
                </Alert>
              ))}
            </Stack>
          </Block>

          <Block title="Outlined">
            <Stack spacing={2}>
              {COLORS.map((color) => (
                <Alert key={color} severity={color} variant="outlined" onClose={() => {}}>
                  This is an {color} alert — check it out!
                </Alert>
              ))}
            </Stack>
          </Block>

          <Block title="Description">
            <Stack spacing={2}>
              {COLORS.map((color) => (
                <Alert key={color} severity={color} onClose={() => {}}>
                  <AlertTitle sx={{ textTransform: 'capitalize' }}> {color} </AlertTitle>
                  This is an {color} alert — <strong>check it out!</strong>
                </Alert>
              ))}
            </Stack>
          </Block>

          <Block title="Actions">
            <Stack spacing={2}>
              <Alert
                severity="info"
                action={
                  <Button color="info" size="small" variant="soft">
                    Action
                  </Button>
                }
              >
                This is an info alert — check it out!
              </Alert>

              <Alert
                severity="info"
                variant="filled"
                action={
                  <>
                    <Button
                      color="inherit"
                      size="small"
                      variant="outlined"
                      sx={{
                        mr: 1,
                        border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.48)}`,
                      }}
                    >
                      Undo
                    </Button>

                    <Button
                      size="small"
                      color="inherit"
                      variant="contained"
                      sx={{
                        bgcolor: 'common.white',
                      }}
                    >
                      Action
                    </Button>
                  </>
                }
              >
                This is an info alert — check it out!
              </Alert>

              <Alert
                severity="info"
                variant="outlined"
                action={
                  <>
                    <Button
                      color="info"
                      size="small"
                      variant="outlined"
                      sx={{
                        mr: 1,
                      }}
                    >
                      Undo
                    </Button>

                    <Button color="info" size="small" variant="contained">
                      Action
                    </Button>
                  </>
                }
              >
                This is an info alert — check it out!
              </Alert>
            </Stack>
          </Block>
        </Masonry>
      </Container>
    </>
  );
}
