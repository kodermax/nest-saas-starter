import { ILightBoxProps } from 'react-image-lightbox';

// ----------------------------------------------------------------------

export interface LightBoxProps extends ILightBoxProps {
  open: boolean;
  images: string[];
  photoIndex: number;
  setPhotoIndex: (index: number) => void;
}
