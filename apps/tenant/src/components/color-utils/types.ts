// @mui
import { BoxProps, StackProps, RadioGroupProps, CheckboxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface ColorIconProps extends BoxProps {
  checked?: boolean;
  whiteColor?: boolean;
}

export interface ColorPreviewProps extends StackProps {
  colors: string[];
  limit?: number;
}

export interface ColorSinglePickerProps extends RadioGroupProps {
  colors: string[];
}

export interface ColorMultiPickerProps extends CheckboxProps {
  colors: string[];
  selected: string[];
  onChangeColor: (color: string) => void;
}
