import { useState } from 'react';
// @mui
import { Card, Grid } from '@mui/material';
//
import Toolbar from './Toolbar';
import ControlPanel from '../ControlPanel';
import ContainerView from './ContainerView';

// ----------------------------------------------------------------------

export default function ScrollView() {
  const [count, setCount] = useState(0);
  const [selectVariant, setSelectVariant] = useState('slideInUp');

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
    type: 'slide',
    values: ['slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight'],
  },
  {
    type: 'fade',
    values: ['fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight'],
  },
  {
    type: 'zoom',
    values: ['zoomIn', 'zoomInUp', 'zoomInDown', 'zoomInLeft', 'zoomInRight'],
  },
  {
    type: 'bounce',
    values: ['bounceIn', 'bounceInUp', 'bounceInDown', 'bounceInLeft', 'bounceInRight'],
  },
  {
    type: 'flip',
    values: ['flipInX', 'flipInY'],
  },
  {
    type: 'scale',
    values: ['scaleInX', 'scaleInY'],
  },
  {
    type: 'rotate',
    values: ['rotateIn'],
  },
];
