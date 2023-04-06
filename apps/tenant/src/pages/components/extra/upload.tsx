import { useState, useCallback } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Box,
  Card,
  Stack,
  Switch,
  Container,
  CardHeader,
  Typography,
  CardContent,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// utils
import { fData } from '../../../utils/formatNumber';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { UploadAvatar, Upload, UploadBox } from '../../../components/upload';

// ----------------------------------------------------------------------

DemoUploadPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoUploadPage() {
  const [preview, setPreview] = useState(false);

  const [files, setFiles] = useState<(File | string)[]>([]);

  const [file, setFile] = useState<File | string | null>(null);

  const [avatarUrl, setAvatarUrl] = useState<File | string | null>(null);

  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  const handleDropAvatar = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setAvatarUrl(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <>
      <Head>
        <title> Extra Components: Upload | Minimal UI</title>
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
            heading="Upload"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Upload' },
            ]}
            moreLink={['https://react-dropzone.js.org/#section-basic-example']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={5}>
          <Card>
            <CardHeader
              title="Upload Multi File"
              action={
                <FormControlLabel
                  control={
                    <Switch
                      checked={preview}
                      onChange={(event) => setPreview(event.target.checked)}
                    />
                  }
                  label="Show Thumbnail"
                />
              }
            />
            <CardContent>
              <Upload
                multiple
                thumbnail={preview}
                files={files}
                onDrop={handleDropMultiFile}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.log('ON UPLOAD')}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Upload Single File" />
            <CardContent>
              <Upload file={file} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Upload Avatar" />
            <CardContent>
              <UploadAvatar
                file={avatarUrl}
                onDrop={handleDropAvatar}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Upload Box" />
            <CardContent>
              <Stack direction="row" spacing={2}>
                <UploadBox />

                <UploadBox
                  placeholder={
                    <Stack spacing={0.5} alignItems="center">
                      <Iconify icon="eva:cloud-upload-fill" width={40} />
                      <Typography variant="body2">Upload file</Typography>
                    </Stack>
                  }
                  sx={{ flexGrow: 1, height: 'auto', py: 2.5, mb: 3 }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
