import { useState, useCallback } from 'react';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Box, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// _mock
import { _folders, _files } from '../../_mock/arrays';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { UploadBox } from '../../components/upload';
import { useSettingsContext } from '../../components/settings';
// sections
import {
  FileGeneralWidget,
  FileGeneralUpgrade,
  FileGeneralRecentCard,
  FileGeneralDataActivity,
  FileGeneralStorageOverview,
} from '../../sections/@dashboard/general/file';
import { FilePanel, FileFolderCard, FileNewFolderDialog } from '../../sections/@dashboard/file';

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

const TIME_LABELS = {
  week: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  year: ['2018', '2019', '2020', '2021', '2022'],
};

// ----------------------------------------------------------------------

GeneralFilePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralFilePage() {
  const theme = useTheme();

  const smDown = useResponsive('down', 'sm');

  const { themeStretch } = useSettingsContext();

  const [folderName, setFolderName] = useState('');

  const [files, setFiles] = useState<(File | string)[]>([]);

  const [openNewFolder, setOpenNewFolder] = useState(false);

  const [openUploadFile, setOpenUploadFile] = useState(false);

  const handleOpenNewFolder = () => {
    setOpenNewFolder(true);
  };

  const handleCloseNewFolder = () => {
    setOpenNewFolder(false);
  };

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  const handleChangeFolderName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  };

  const handleCreateNewFolder = () => {
    handleCloseNewFolder();
    setFolderName('');
    console.log('CREATE NEW FOLDER', folderName);
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const renderStorageOverview = (
    <FileGeneralStorageOverview
      total={GB}
      chart={{
        series: 76,
      }}
      data={[
        {
          name: 'Images',
          usedStorage: GB / 2,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_img.svg" />,
        },
        {
          name: 'Media',
          usedStorage: GB / 5,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_video.svg" />,
        },
        {
          name: 'Documents',
          usedStorage: GB / 5,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_document.svg" />,
        },
        {
          name: 'Other',
          usedStorage: GB / 10,
          filesCount: 223,
          icon: <Iconify icon="eva:file-fill" width={24} sx={{ color: 'text.disabled' }} />,
        },
      ]}
    />
  );

  return (
    <>
      <Head>
        <title> General: File | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {smDown && (
            <Grid item xs={12}>
              {renderStorageOverview}
            </Grid>
          )}

          <Grid item xs={12} sm={6} md={4}>
            <FileGeneralWidget
              title="Dropbox"
              value={GB / 10}
              total={GB}
              icon="/assets/icons/apps/ic_dropbox.svg"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FileGeneralWidget
              title="Drive"
              value={GB / 5}
              total={GB}
              icon="/assets/icons/apps/ic_drive.svg"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FileGeneralWidget
              title="OneDrive"
              value={GB / 2}
              total={GB}
              icon="/assets/icons/apps/ic_onedrive.svg"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <FileGeneralDataActivity
              title="Data Activity"
              chart={{
                labels: TIME_LABELS,
                colors: [
                  theme.palette.primary.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                  theme.palette.text.disabled,
                ],
                series: [
                  {
                    type: 'Week',
                    data: [
                      { name: 'Images', data: [20, 34, 48, 65, 37, 48] },
                      { name: 'Media', data: [10, 34, 13, 26, 27, 28] },
                      { name: 'Documents', data: [10, 14, 13, 16, 17, 18] },
                      { name: 'Other', data: [5, 12, 6, 7, 8, 9] },
                    ],
                  },
                  {
                    type: 'Month',
                    data: [
                      { name: 'Images', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                      { name: 'Media', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                      { name: 'Documents', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                      { name: 'Other', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                    ],
                  },
                  {
                    type: 'Year',
                    data: [
                      { name: 'Images', data: [10, 34, 13, 56, 77] },
                      { name: 'Media', data: [10, 34, 13, 56, 77] },
                      { name: 'Documents', data: [10, 34, 13, 56, 77] },
                      { name: 'Other', data: [10, 34, 13, 56, 77] },
                    ],
                  },
                ],
              }}
            />

            <div>
              <FilePanel
                title="Folders"
                link={PATH_DASHBOARD.fileManager}
                onOpen={handleOpenNewFolder}
                sx={{ mt: 5 }}
              />

              <Scrollbar>
                <Stack direction="row" spacing={3} sx={{ pb: 3 }}>
                  {_folders.map((folder) => (
                    <FileFolderCard
                      key={folder.id}
                      folder={folder}
                      onDelete={() => console.log('DELETE', folder.id)}
                      sx={{
                        ...(_folders.length > 3 && {
                          minWidth: 222,
                        }),
                      }}
                    />
                  ))}
                </Stack>
              </Scrollbar>

              <FilePanel
                title="Recent Files"
                link={PATH_DASHBOARD.fileManager}
                onOpen={handleOpenUploadFile}
                sx={{ mt: 2 }}
              />

              <Stack spacing={2}>
                {_files.slice(0, 5).map((file) => (
                  <FileGeneralRecentCard
                    key={file.id}
                    file={file}
                    onDelete={() => console.log('DELETE', file.id)}
                  />
                ))}
              </Stack>
            </div>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <UploadBox
              onDrop={handleDrop}
              placeholder={
                <Stack spacing={0.5} alignItems="center" sx={{ color: 'text.disabled' }}>
                  <Iconify icon="eva:cloud-upload-fill" width={40} />
                  <Typography variant="body2">Upload file</Typography>
                </Stack>
              }
              sx={{
                mb: 3,
                py: 2.5,
                width: 'auto',
                height: 'auto',
                borderRadius: 1.5,
              }}
            />

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{renderStorageOverview}</Box>

            <FileGeneralUpgrade sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      </Container>

      <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} />

      <FileNewFolderDialog
        open={openNewFolder}
        onClose={handleCloseNewFolder}
        title="New Folder"
        folderName={folderName}
        onChangeFolderName={handleChangeFolderName}
        onCreate={handleCreateNewFolder}
      />
    </>
  );
}
