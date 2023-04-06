import { useState, useEffect, forwardRef } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  List,
  Stack,
  Drawer,
  Button,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
// config
import { NAV, ICON } from '../../config';
// @types
import { ParentItemProps, MegaMenuItemProps } from './types';
//
import Logo from '../logo';
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';

// ----------------------------------------------------------------------

type Props = {
  data: MegaMenuItemProps[];
};

export default function MegaMenuMobile({ data }: Props) {
  const { pathname } = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (openDrawer) {
      handleCloseDrawer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpenDrawer}
        startIcon={<Iconify icon="eva:menu-2-fill" />}
      >
        Menu Mobile
      </Button>

      <Drawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: NAV.W_DASHBOARD } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <Typography variant="h6" sx={{ px: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Iconify icon="eva:list-fill" sx={{ mr: 1 }} /> Categories
          </Typography>

          {data.map((parent) => (
            <SubMenu key={parent.title} parent={parent} pathname={pathname} />
          ))}
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

const ParentItem = forwardRef<HTMLDivElement, ParentItemProps>(
  ({ icon, title, hasSub, ...other }, ref) => (
    <ListItemButton ref={ref} sx={{ height: 44, textTransform: 'capitalize' }} {...other}>
      <ListItemIcon sx={{ width: 22, height: 22 }}>{icon}</ListItemIcon>
      <ListItemText primaryTypographyProps={{ typography: 'body2' }}>{title}</ListItemText>
      {hasSub && <Iconify icon="eva:arrow-ios-forward-fill" />}
    </ListItemButton>
  )
);

// ----------------------------------------------------------------------

type SubMenuProps = {
  parent: MegaMenuItemProps;
  pathname: string;
};

function SubMenu({ parent, pathname }: SubMenuProps) {
  const { title, icon, path, children } = parent;

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (openDrawer) {
      handleCloseDrawer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  if (children) {
    return (
      <>
        <ParentItem title={title} icon={icon} onClick={handleOpenDrawer} hasSub />

        <Drawer
          open={openDrawer}
          onClose={handleCloseDrawer}
          BackdropProps={{ invisible: true }}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD - 12,
              borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
            },
          }}
        >
          <Stack direction="row" alignItems="center" px={1} py={1.5}>
            <IconButton onClick={handleCloseDrawer}>
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>

            <Typography noWrap variant="subtitle1" sx={{ ml: 1, textTransform: 'capitalize' }}>
              {title}
            </Typography>
          </Stack>
          <Divider />

          <Scrollbar>
            <Stack spacing={5} py={3}>
              {children.map((list) => {
                const { subheader, items } = list;

                return (
                  <List key={subheader} disablePadding>
                    <Typography
                      component="div"
                      variant="overline"
                      sx={{ px: 2.5, mb: 1, color: 'text.secondary' }}
                      noWrap
                    >
                      {subheader}
                    </Typography>
                    {items.map((link) => (
                      <NextLink key={link.title} href={link.path} passHref>
                        <ListItemButton sx={{ px: 1.5 }}>
                          <ListItemIcon
                            sx={{
                              mr: 0.5,
                              width: ICON.NAV_ITEM,
                              height: ICON.NAV_ITEM,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                width: 4,
                                height: 4,
                                bgcolor: 'currentColor',
                                borderRadius: '50%',
                              }}
                            />
                          </ListItemIcon>

                          <ListItemText
                            primary={link.title}
                            primaryTypographyProps={{ noWrap: true, typography: 'body2' }}
                          />
                        </ListItemButton>
                      </NextLink>
                    ))}
                  </List>
                );
              })}
            </Stack>
          </Scrollbar>
        </Drawer>
      </>
    );
  }

  return (
    <NextLink href={path} passHref>
      <ParentItem title={title} icon={icon} />
    </NextLink>
  );
}
