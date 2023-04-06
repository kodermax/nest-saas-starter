import { useState, useEffect, useRef } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Container, Stack } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import ProgressLinear from '../../../sections/_examples/mui/progress/ProgressLinear';
import ProgressCircular from '../../../sections/_examples/mui/progress/ProgressCircular';
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

MUIProgressPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIProgressPage() {
  const [progress, setProgress] = useState(0);

  const [buffer, setBuffer] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressRef = useRef(() => {});

  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Head>
        <title> MUI Components: Progress | Minimal UI</title>
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
            heading="Progress"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Progress' },
            ]}
            moreLink={['https://mui.com/components/progress']}
          />
        </Container>
      </Box>
      <Container sx={{ my: 10 }}>
        <Stack spacing={5}>
          <Block title="Circular">
            <ProgressCircular progress={progress} />
          </Block>

          <Block title="Linear">
            <ProgressLinear progress={progress} buffer={buffer} />
          </Block>
        </Stack>
      </Container>
    </>
  );
}
