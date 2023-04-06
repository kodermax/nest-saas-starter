import { useState } from 'react';
// @mui
import { Grid, Card } from '@mui/material';
//
import Toolbar from './Toolbar';
import ControlPanel from '../ControlPanel';
import ContainerView from './ContainerView';

// ----------------------------------------------------------------------

export default function BackgroundView() {
  const [count, setCount] = useState(0);
  const [selectVariant, setSelectVariant] = useState('kenburnsTop');

  const handleChangeVariant = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(count + 1);
    setSelectVariant(event.target.value);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={9}>
          <Toolbar onRefresh={() => setCount(count + 1)} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={9}>
          <ContainerView key={count} selectVariant={selectVariant} />
        </Grid>
        <Grid item xs={3}>
          <ControlPanel
            variantKey={variantKey}
            selectVariant={selectVariant}
            onChangeVariant={handleChangeVariant}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

// ----------------------------------------------------------------------

const variantKey = [
  {
    type: 'kenburns',
    values: ['kenburnsTop', 'kenburnsBottom', 'kenburnsLeft', 'kenburnsRight'],
  },
  {
    type: 'pan',
    values: ['panTop', 'panBottom', 'panLeft', 'panRight'],
  },
  {
    type: 'color change',
    values: ['color2x', 'color3x', 'color4x', 'color5x'],
  },
];
