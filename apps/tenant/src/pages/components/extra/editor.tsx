import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Box,
  Card,
  Grid,
  Stack,
  Container,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Editor from '../../../components/editor';
import Markdown from '../../../components/markdown';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

DemoEditorPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoEditorPage() {
  const [quillSimple, setQuillSimple] = useState('');

  const [quillFull, setQuillFull] = useState('');

  return (
    <>
      <Head>
        <title> Extra Components: Editor | Minimal UI</title>
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
            heading="Editor"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Editor' },
            ]}
            moreLink={['https://github.com/zenoamaro/react-quill']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Editor Simple" />
              <CardContent>
                <Editor
                  simple
                  id="simple-editor"
                  value={quillSimple}
                  onChange={(value) => setQuillSimple(value)}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3} sx={{ height: 1 }}>
              <Card sx={{ height: 1, boxShadow: 0, bgcolor: 'background.neutral' }}>
                <CardHeader title="Preview Plain Text" />
                <Box sx={{ p: 3 }}>
                  <Markdown children={quillSimple} />
                </Box>
              </Card>
              <Card sx={{ height: 1, boxShadow: 0, bgcolor: 'background.neutral' }}>
                <CardHeader title="Preview Html" />
                <Typography sx={{ p: 3 }}>{quillSimple}</Typography>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 3 }}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Editor Full" />
              <CardContent>
                <Editor
                  id="full-editor"
                  value={quillFull}
                  onChange={(value) => setQuillFull(value)}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
