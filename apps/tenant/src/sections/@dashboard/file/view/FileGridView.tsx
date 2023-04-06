import { useState, useRef } from 'react';
// @mui
import { Collapse, Box, Divider, Button } from '@mui/material';
// @types
import { IFile } from '../../../../@types/file';
// components
import Iconify from '../../../../components/iconify';
import { TableProps } from '../../../../components/table';
//
import FilePanel from '../FilePanel';
import FileCard from '../item/FileCard';
import FileFolderCard from '../item/FileFolderCard';
import FileShareDialog from '../portal/FileShareDialog';
import FileActionSelected from '../portal/FileActionSelected';
import FileNewFolderDialog from '../portal/FileNewFolderDialog';

// ----------------------------------------------------------------------

type Props = {
  table: TableProps;
  data: IFile[];
  dataFiltered: IFile[];
  onOpenConfirm: VoidFunction;
  onDeleteItem: (id: string) => void;
};

export default function FileGridView({
  table,
  data,
  dataFiltered,
  onDeleteItem,
  onOpenConfirm,
}: Props) {
  const { selected, onSelectRow: onSelectItem, onSelectAllRows: onSelectAllItems } = table;

  const containerRef = useRef(null);

  const [folderName, setFolderName] = useState('');

  const [inviteEmail, setInviteEmail] = useState('');

  const [openShare, setOpenShare] = useState(false);

  const [collapseFiles, setCollapseFiles] = useState(false);

  const [openNewFolder, setOpenNewFolder] = useState(false);

  const [openUploadFile, setOpenUploadFile] = useState(false);

  const [collapseFolders, setCollapseFolders] = useState(false);

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

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

  const handleChangeInvite = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(event.target.value);
  };

  return (
    <>
      <Box ref={containerRef}>
        <FilePanel
          title="Folders"
          subTitle={`${data.filter((item) => item.type === 'folder').length} folders`}
          onOpen={handleOpenNewFolder}
          collapse={collapseFolders}
          onCollapse={() => setCollapseFolders(!collapseFolders)}
        />

        <Collapse in={!collapseFolders} unmountOnExit>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
          >
            {dataFiltered
              .filter((i) => i.type === 'folder')
              .map((folder) => (
                <FileFolderCard
                  key={folder.id}
                  folder={folder}
                  selected={selected.includes(folder.id)}
                  onSelect={() => onSelectItem(folder.id)}
                  onDelete={() => onDeleteItem(folder.id)}
                  sx={{ maxWidth: 'auto' }}
                />
              ))}
          </Box>
        </Collapse>

        <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

        <FilePanel
          title="Files"
          subTitle={`${data.filter((item) => item.type !== 'folder').length} files`}
          onOpen={handleOpenUploadFile}
          collapse={collapseFiles}
          onCollapse={() => setCollapseFiles(!collapseFiles)}
        />

        <Collapse in={!collapseFiles} unmountOnExit>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={3}
          >
            {dataFiltered
              .filter((i) => i.type !== 'folder')
              .map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  selected={selected.includes(file.id)}
                  onSelect={() => onSelectItem(file.id)}
                  onDelete={() => onDeleteItem(file.id)}
                  sx={{ maxWidth: 'auto' }}
                />
              ))}
          </Box>
        </Collapse>

        {!!selected?.length && (
          <FileActionSelected
            numSelected={selected.length}
            rowCount={data.length}
            selected={selected}
            onSelectAllItems={(checked) =>
              onSelectAllItems(
                checked,
                data.map((row) => row.id)
              )
            }
            action={
              <>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  startIcon={<Iconify icon="eva:trash-2-outline" />}
                  onClick={onOpenConfirm}
                  sx={{ mr: 1 }}
                >
                  Delete
                </Button>

                <Button
                  color="inherit"
                  size="small"
                  variant="contained"
                  startIcon={<Iconify icon="eva:share-fill" />}
                  onClick={handleOpenShare}
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'grey.800' : 'common.white',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'grey.800' : 'common.white',
                      bgcolor: (theme) =>
                        theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    },
                  }}
                >
                  Share
                </Button>
              </>
            }
          />
        )}
      </Box>

      <FileShareDialog
        open={openShare}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onClose={() => {
          handleCloseShare();
          setInviteEmail('');
        }}
      />

      <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} />

      <FileNewFolderDialog
        open={openNewFolder}
        onClose={handleCloseNewFolder}
        title="New Folder"
        onCreate={() => {
          handleCloseNewFolder();
          setFolderName('');
          console.log('CREATE NEW FOLDER', folderName);
        }}
        folderName={folderName}
        onChangeFolderName={(event) => setFolderName(event.target.value)}
      />
    </>
  );
}
