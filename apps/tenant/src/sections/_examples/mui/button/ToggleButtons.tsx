import { useState } from 'react';
// @mui
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
// components
import Iconify from '../../../../components/iconify';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const COLORS = ['standard', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const SIZES = ['small', 'medium', 'large'] as const;

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
  '& svg': { width: 24, height: 24 },
} as const;

// ----------------------------------------------------------------------

export default function ToggleButtons() {
  const [alignment, setAlignment] = useState<string | null>('left');

  const [formats, setFormats] = useState(() => ['bold', 'italic']);

  const [view, setView] = useState('list');

  const [selected, setSelected] = useState(true);

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats);
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  const viewContent = [
    <ToggleButton key="list" value="list">
      <Iconify icon="ic:round-view-list" />
    </ToggleButton>,
    <ToggleButton key="module" value="module">
      <Iconify icon="ic:round-view-module" />
    </ToggleButton>,
    <ToggleButton key="quilt" value="quilt">
      <Iconify icon="ic:round-view-quilt" />
    </ToggleButton>,
  ];

  const alignContent = [
    <ToggleButton key="left" value="left">
      <Iconify icon="ic:round-format-align-left" />
    </ToggleButton>,
    <ToggleButton key="center" value="center">
      <Iconify icon="ic:round-format-align-center" />
    </ToggleButton>,
    <ToggleButton key="right" value="right">
      <Iconify icon="ic:round-format-align-right" />
    </ToggleButton>,
    <ToggleButton key="justify" value="justify" disabled>
      <Iconify icon="ic:round-format-align-justify" />
    </ToggleButton>,
  ];

  const formatContent = [
    <ToggleButton key="bold" value="bold">
      <Iconify icon="ic:round-format-bold" />
    </ToggleButton>,
    <ToggleButton key="italic" value="italic">
      <Iconify icon="ic:round-format-italic" />
    </ToggleButton>,
    <ToggleButton key="underlined" value="underlined">
      <Iconify icon="ic:round-format-underlined" />
    </ToggleButton>,
    <ToggleButton key="color" value="color" disabled>
      <Iconify icon="ic:baseline-format-color-fill" />
      <Iconify icon="ic:baseline-arrow-drop-down" />
    </ToggleButton>,
  ];

  return (
    <Masonry columns={3} spacing={3}>
      <Block title="Exclusive selection" sx={style}>
        <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
          {alignContent}
        </ToggleButtonGroup>
      </Block>

      <Block title="Multiple selection" sx={style}>
        <ToggleButtonGroup value={formats} onChange={handleFormat}>
          {formatContent}
        </ToggleButtonGroup>
      </Block>

      <Block title="Colors" sx={style}>
        {COLORS.map((color) => (
          <ToggleButtonGroup
            exclusive
            key={color}
            color={color}
            value={view}
            onChange={handleChange}
          >
            {viewContent}
          </ToggleButtonGroup>
        ))}

        {COLORS.map((color) => (
          <ToggleButton
            key={color}
            color={color}
            value="check"
            selected={selected}
            onChange={() => {
              setSelected(!selected);
            }}
          >
            <Iconify icon="eva:checkmark-fill" />
          </ToggleButton>
        ))}
      </Block>

      <Block title="Vertical & Standalone buttons" sx={style}>
        <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
          {viewContent}
        </ToggleButtonGroup>

        <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
        >
          <Iconify icon="eva:checkmark-fill" />
        </ToggleButton>
      </Block>

      <Block title="Size" sx={style}>
        {SIZES.map((size) => (
          <ToggleButton key={size} size={size} value="check">
            <Iconify icon="eva:checkmark-fill" />
          </ToggleButton>
        ))}

        {SIZES.map((size) => (
          <ToggleButtonGroup
            exclusive
            key={size}
            size={size}
            value={alignment}
            onChange={handleAlignment}
          >
            {alignContent}
          </ToggleButtonGroup>
        ))}
      </Block>

      <Block title="Disabled" sx={style}>
        <ToggleButton value="check" disabled>
          <Iconify icon="eva:checkmark-fill" />
        </ToggleButton>

        <ToggleButton value="check" disabled selected>
          <Iconify icon="eva:checkmark-fill" />
        </ToggleButton>

        <ToggleButtonGroup value="left" exclusive>
          {alignContent}
        </ToggleButtonGroup>

        <ToggleButtonGroup disabled value="left" exclusive>
          {alignContent}
        </ToggleButtonGroup>
      </Block>
    </Masonry>
  );
}
