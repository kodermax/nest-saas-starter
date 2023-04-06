// @mui
import { Button } from '@mui/material';
import { LoadingButton, Masonry } from '@mui/lab';
// components
import Iconify from '../../../../components/iconify';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' },
} as const;

const COLORS = ['inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const SIZES = ['small', 'medium', 'large'] as const;

// ----------------------------------------------------------------------

type Props = {
  variant?: 'text' | 'contained' | 'outlined' | 'soft';
};

export default function ButtonVariant({ variant = 'text' }: Props) {
  return (
    <Masonry columns={2} spacing={3}>
      <Block title="Base" sx={style}>
        <Button variant={variant} color="inherit">
          Default
        </Button>

        <Button variant={variant}>Primary</Button>

        <Button variant={variant} color="secondary">
          Secondary
        </Button>

        <Button variant={variant} disabled>
          Disabled
        </Button>

        <Button variant={variant}>Link</Button>
      </Block>

      <Block title="Colors" sx={style}>
        {COLORS.map((color) => (
          <Button key={color} variant={variant} color={color}>
            {color === 'inherit' ? 'default' : color}
          </Button>
        ))}
      </Block>

      <Block title="With Icon & Loading" sx={style}>
        <Button
          variant={variant}
          color="error"
          startIcon={<Iconify icon="ic:round-access-alarm" />}
        >
          Icon Left
        </Button>

        <Button variant={variant} color="error" endIcon={<Iconify icon="ic:round-access-alarm" />}>
          Icon Right
        </Button>

        <LoadingButton loading variant={variant}>
          Submit
        </LoadingButton>

        <LoadingButton loading loadingIndicator="Loading..." variant={variant}>
          Fetch data
        </LoadingButton>

        <LoadingButton
          loading
          size="large"
          loadingPosition="start"
          startIcon={<Iconify icon="ic:round-access-alarm" />}
          variant={variant}
        >
          Start
        </LoadingButton>

        <LoadingButton
          loading
          size="large"
          loadingPosition="end"
          endIcon={<Iconify icon="ic:round-access-alarm" />}
          variant={variant}
        >
          End
        </LoadingButton>
      </Block>

      <Block title="Size" sx={style}>
        {SIZES.map((size) => (
          <Button key={size} variant={variant} color="info" size={size}>
            {size}
          </Button>
        ))}
      </Block>
    </Masonry>
  );
}
