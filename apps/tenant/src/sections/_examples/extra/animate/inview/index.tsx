import { useState } from 'react';
// @mui
import { Card, Grid } from '@mui/material';
//
import Toolbar from './Toolbar';
import ControlPanel from '../ControlPanel';
import ContainerView from './ContainerView';

// ----------------------------------------------------------------------

export default function Inview() {
  const [count, setCount] = useState(0);

  const [multi, setMulti] = useState(false);

  const [text, setText] = useState(false);

  const [selectVariant, setSelectVariant] = useState('slideInUp');

  const handleChangeVariant = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(count + 1);
    setSelectVariant((event.target as HTMLInputElement).value);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={9}>
          <Toolbar
            isText={text}
            isMulti={multi}
            onChangeText={(event) => setText(event.target.checked)}
            onChangeMulti={(event) => setMulti(event.target.checked)}
            onRefresh={() => setCount(count + 1)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={9}>
          <ContainerView key={count} isText={text} isMulti={multi} selectVariant={selectVariant} />
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
    type: 'slide in',
    values: ['slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight'],
  },
  {
    type: 'slide out',
    values: ['slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight'],
  },
  {
    type: 'fade in',
    values: ['fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight'],
  },
  {
    type: 'fade out',
    values: ['fadeOut', 'fadeOutUp', 'fadeOutDown', 'fadeOutLeft', 'fadeOutRight'],
  },
  {
    type: 'zoom in',
    values: ['zoomIn', 'zoomInUp', 'zoomInDown', 'zoomInLeft', 'zoomInRight'],
  },
  {
    type: 'zoom out',
    values: ['zoomOut', 'zoomOutUp', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight'],
  },
  {
    type: 'bounce in',
    values: ['bounceIn', 'bounceInUp', 'bounceInDown', 'bounceInLeft', 'bounceInRight'],
  },
  {
    type: 'bounce out',
    values: ['bounceOut', 'bounceOutUp', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight'],
  },
  {
    type: 'flip in',
    values: ['flipInX', 'flipInY'],
  },
  {
    type: 'flip out',
    values: ['flipOutX', 'flipOutY'],
  },
  {
    type: 'scale in',
    values: ['scaleInX', 'scaleInY'],
  },
  {
    type: 'scale out',
    values: ['scaleOutX', 'scaleOutY'],
  },
  {
    type: 'rotate in',
    values: ['rotateIn'],
  },
  {
    type: 'rotate out',
    values: ['rotateOut'],
  },
];
