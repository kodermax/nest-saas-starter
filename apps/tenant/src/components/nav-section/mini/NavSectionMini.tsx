import { memo } from 'react';
import { Box, Stack } from '@mui/material';
//
import { NavSectionProps, NavListProps } from '../types';
import NavList from './NavList';

// ----------------------------------------------------------------------

function NavSectionMini({ data, sx, ...other }: NavSectionProps) {
  return (
    <Stack
      spacing={0.5}
      alignItems="center"
      sx={{
        px: 0.75,
        ...sx,
      }}
      {...other}
    >
      {data.map((group) => (
        <Items key={group.subheader} items={group.items} />
      ))}
    </Stack>
  );
}

export default memo(NavSectionMini);

// ----------------------------------------------------------------------

type ItemsProps = {
  items: NavListProps[];
};

function Items({ items }: ItemsProps) {
  return (
    <>
      {items.map((list) => (
        <NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children} />
      ))}

      <Box sx={{ width: 24, height: '1px', bgcolor: 'divider', my: '8px !important' }} />
    </>
  );
}
