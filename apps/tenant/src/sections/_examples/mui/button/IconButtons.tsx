// @mui
import { IconButton } from '@mui/material';
import { Masonry } from '@mui/lab';
// components
import Iconify from '../../../../components/iconify';
import { IconButtonAnimate } from '../../../../components/animate';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const COLORS = [
  'inherit',
  'default',
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error',
] as const;

const SIZES = ['small', 'medium', 'large'] as const;

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' },
} as const;

export default function IconButtons() {
  return (
    <Masonry columns={2} spacing={3}>
      <Block title="Base" sx={style}>
        <IconButton color="inherit">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton>
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton color="primary">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton color="secondary">
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
        <IconButton disabled>
          <Iconify icon="ic:round-access-alarm" />
        </IconButton>
      </Block>

      <Block title="Colors" sx={style}>
        {COLORS.map((color) => (
          <IconButton key={color} color={color}>
            <Iconify icon="ic:round-access-alarm" />
          </IconButton>
        ))}
      </Block>

      <Block title="Size" sx={style}>
        {SIZES.map((size) => (
          <IconButton key={size} size={size} color="info">
            <Iconify fontSize="inherit" icon="ic:round-access-alarm" />
          </IconButton>
        ))}
      </Block>

      <Block title="With Animate" sx={style}>
        {SIZES.map((size) => (
          <IconButtonAnimate key={size} size={size} color="error">
            <Iconify fontSize="inherit" icon="ic:round-access-alarm" />
          </IconButtonAnimate>
        ))}
      </Block>
    </Masonry>
  );
}
