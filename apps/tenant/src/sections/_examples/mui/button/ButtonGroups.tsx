// @mui
import { ButtonGroup, Button } from '@mui/material';
import { Masonry } from '@mui/lab';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
} as const;

const COLORS = ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'] as const;

const SIZES = ['small', 'medium', 'large'] as const;

const VARIANTS = ['contained', 'outlined', 'text', 'soft'] as const;

// ----------------------------------------------------------------------

export default function ButtonGroups() {
  return (
    <Masonry columns={2} spacing={3}>
      <Block title="Contained" sx={style}>
        {COLORS.map((color) => (
          <ButtonGroup key={color} variant="contained" color={color}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}

        <ButtonGroup disabled variant="contained" color="info">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Block>

      <Block title="Outlined" sx={style}>
        {COLORS.map((color) => (
          <ButtonGroup key={color} variant="outlined" color={color}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}

        <ButtonGroup disabled variant="outlined" color="info">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Block>

      <Block title="Text" sx={style}>
        {COLORS.map((color) => (
          <ButtonGroup key={color} variant="text" color={color}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}

        <ButtonGroup disabled variant="text" color="info">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Block>

      <Block title="Soft" sx={style}>
        {COLORS.map((color) => (
          <ButtonGroup key={color} variant="soft" color={color}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}

        <ButtonGroup disabled variant="soft" color="info">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Block>

      <Block title="Size" sx={style}>
        {SIZES.map((size) => (
          <ButtonGroup key={size} size={size} variant="contained">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}
      </Block>

      <Block title="Orientation" sx={style}>
        {VARIANTS.map((variant) => (
          <ButtonGroup key={variant} variant={variant} orientation="vertical">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ))}

        <ButtonGroup disabled variant="soft" color="info" orientation="vertical">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Block>
    </Masonry>
  );
}
