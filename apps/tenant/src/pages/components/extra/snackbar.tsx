// next
import Head from 'next/head';
// @mui
import { Box, Button, Container } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import { useSnackbar, VariantType, SnackbarOrigin } from '../../../components/snackbar';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' },
} as const;

// ----------------------------------------------------------------------

DemoSnackbarPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoSnackbarPage() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSnackbarAction = (color: VariantType, anchor?: SnackbarOrigin) => {
    enqueueSnackbar(`This is an ${color}`, {
      variant: color,
      anchorOrigin: anchor,
      action: (key) => (
        <>
          <Button
            size="small"
            color={color !== 'default' ? color : 'primary'}
            onClick={() => {
              console.log(`I belong to snackbar with key ${key}`);
            }}
          >
            Alert
          </Button>

          <Button size="small" color="inherit" onClick={() => closeSnackbar(key)}>
            Dismiss
          </Button>
        </>
      ),
    });
  };

  return (
    <>
      <Head>
        <title> Extra Components: Snackbar | Minimal UI</title>
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
            heading="Snackbar"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Snackbar' },
            ]}
            moreLink={[
              'https://mui.com/components/snackbars',
              'https://www.iamhosseindhv.com/notistack',
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          <Block title="Simple" sx={style}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => enqueueSnackbar('This is an default', { variant: 'default' })}
            >
              Default
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => enqueueSnackbar('This is an info', { variant: 'info' })}
            >
              Info
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => enqueueSnackbar('This is an success', {})}
            >
              Success
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() =>
                enqueueSnackbar('This is an warning', {
                  variant: 'warning',
                })
              }
            >
              Warning
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => enqueueSnackbar('This is an error', { variant: 'error' })}
            >
              Error
            </Button>
          </Block>

          <Block title="With Close" sx={style}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() =>
                enqueueSnackbar('This is an default', {
                  variant: 'default',
                })
              }
            >
              Default
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() =>
                enqueueSnackbar('This is an info', {
                  variant: 'info',
                })
              }
            >
              Info
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                enqueueSnackbar('This is an success', {
                  variant: 'success',
                })
              }
            >
              Success
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() =>
                enqueueSnackbar('This is an warning', {
                  variant: 'warning',
                })
              }
            >
              Warning
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                enqueueSnackbar('This is an error', {
                  variant: 'error',
                })
              }
            >
              Error
            </Button>
          </Block>

          <Block title="With Action" sx={style}>
            <Button variant="contained" color="inherit" onClick={() => onSnackbarAction('default')}>
              Default
            </Button>
            <Button variant="contained" color="info" onClick={() => onSnackbarAction('info')}>
              Info
            </Button>
            <Button variant="contained" color="success" onClick={() => onSnackbarAction('success')}>
              Success
            </Button>
            <Button variant="contained" color="warning" onClick={() => onSnackbarAction('warning')}>
              Warning
            </Button>
            <Button variant="contained" color="error" onClick={() => onSnackbarAction('error')}>
              Error
            </Button>
          </Block>

          <Block title="anchorOrigin" sx={style}>
            <Button
              variant="text"
              color="inherit"
              onClick={() =>
                onSnackbarAction('default', {
                  vertical: 'top',
                  horizontal: 'left',
                })
              }
            >
              Top Left
            </Button>
            <Button
              variant="text"
              color="inherit"
              onClick={() =>
                onSnackbarAction('default', {
                  vertical: 'top',
                  horizontal: 'center',
                })
              }
            >
              Top Center
            </Button>
            <Button variant="text" color="inherit" onClick={() => onSnackbarAction('default')}>
              Top Right
            </Button>
            <Button
              variant="text"
              color="inherit"
              onClick={() =>
                onSnackbarAction('default', {
                  vertical: 'bottom',
                  horizontal: 'left',
                })
              }
            >
              Bottom Left
            </Button>
            <Button
              variant="text"
              color="inherit"
              onClick={() =>
                onSnackbarAction('default', {
                  vertical: 'bottom',
                  horizontal: 'center',
                })
              }
            >
              Bottom Center
            </Button>
            <Button
              variant="text"
              color="inherit"
              onClick={() =>
                onSnackbarAction('default', {
                  vertical: 'bottom',
                  horizontal: 'right',
                })
              }
            >
              Bottom Right
            </Button>
          </Block>
        </Masonry>
      </Container>
    </>
  );
}
