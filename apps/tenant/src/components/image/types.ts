import { LazyLoadImageProps } from 'react-lazy-load-image-component';
// @mui
import { BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = BoxProps & LazyLoadImageProps;

export type ImageRatio = '4/3' | '3/4' | '6/4' | '4/6' | '16/9' | '9/16' | '21/9' | '9/21' | '1/1';

export interface ImageProps extends IProps {
  ratio?: ImageRatio;
  disabledEffect?: boolean;
}
