import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { List, Drawer, Button, Divider, Stack } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// config
import { NAV } from '../../../../config';
// @types
import { IMailLabel } from '../../../../@types/mail';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import { SkeletonMailNavItem } from '../../../../components/skeleton';
//
import MailNavItem from './MailNavItem';

// ----------------------------------------------------------------------

type Props = {
  items: IMailLabel[];
  openNav: boolean;
  onOpenCompose: VoidFunction;
  onCloseNav: VoidFunction;
};

export default function MailNav({ items, openNav, onOpenCompose, onCloseNav }: Props) {
  const { asPath } = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const isLoading = !items.length;

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  const handleOpenCompose = () => {
    onCloseNav();
    onOpenCompose();
  };

  const renderContent = (
    <>
      <Stack justifyContent="center" flexShrink={0} sx={{ px: 2.5, height: 80 }}>
        <Button
          fullWidth
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="eva:edit-fill" />}
          onClick={handleOpenCompose}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Compose
        </Button>
      </Stack>

      <Divider />

      <Scrollbar>
        <List disablePadding>
          {(isLoading ? [...Array(8)] : items).map((label, index) =>
            label ? (
              <MailNavItem key={label.id} label={label} />
            ) : (
              <SkeletonMailNavItem key={index} />
            )
          )}
        </List>
      </Scrollbar>
    </>
  );

  return (
    <>
      {isDesktop ? (
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV.W_BASE,
              position: 'relative',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: NAV.W_BASE,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
