import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Box,
  Card,
  Stack,
  Tooltip,
  Container,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material';
// hooks
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// hooks
import useDoubleClick from '../../../hooks/useDoubleClick';
// components
import Iconify from '../../../components/iconify';
import { useSnackbar } from '../../../components/snackbar';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

DemoCopyToClipboardPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoCopyToClipboardPage() {
  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const [value, setValue] = useState('https://www.npmjs.com/package/');

  const textOnClick = `Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
  Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat
  dolor lectus quis orci. Cras non dolor. Praesent egestas neque eu enim. Ut varius
  tincidunt libero. Fusce fermentum odio nec arcu. Etiam rhoncus. Nulla sit amet est.
  Donec posuere vulputate arcu. Vestibulum ullamcorper mauris at ligula. Praesent ut
  ligula non mi varius sagittis. Pellentesque posuere. Praesent adipiscing. Sed
  libero. Duis leo. Nulla porta dolor.`;

  const onCopy = (text: string) => {
    if (text) {
      enqueueSnackbar('Copied!');
      copy(text);
    }
  };

  const handleClick = useDoubleClick({
    doubleClick: () => onCopy(textOnClick),
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Head>
        <title> Extra Components: Copy To Clipboard | Minimal UI</title>
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
            heading="Copy To Clipboard"
            links={[
              { name: 'Components', href: PATH_PAGE.components },
              { name: 'Copy To Clipboard' },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Card sx={{ p: 5 }}>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={5}
          >
            <Stack spacing={2}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                on Change
              </Typography>

              <TextField
                fullWidth
                value={value}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Copy">
                        <IconButton onClick={() => onCopy(value)}>
                          <Iconify icon="eva:copy-fill" width={24} />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack spacing={2}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                on Double Click
              </Typography>

              <Typography onClick={handleClick}>{textOnClick}</Typography>
            </Stack>
          </Box>
        </Card>
      </Container>
    </>
  );
}
