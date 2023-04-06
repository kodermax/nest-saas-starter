import { useState } from 'react';
// @mui
import { Grid, Card } from '@mui/material';
//
import ControlPanel from '../ControlPanel';
import ContainerView from './ContainerView';

// ----------------------------------------------------------------------

export default function DialogView() {
  const [open, setOpen] = useState(false);

  const [selectVariant, setSelectVariant] = useState('slideInUp');

  const handleChangeVariant = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectVariant(event.target.value);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <ContainerView
            isOpen={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            selectVariant={selectVariant}
          />
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
