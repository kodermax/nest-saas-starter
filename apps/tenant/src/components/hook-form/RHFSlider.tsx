// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Slider, SliderProps } from '@mui/material';

// ----------------------------------------------------------------------

type Props = SliderProps & {
  name: string;
};

export default function RHFSlider({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Slider {...field} valueLabelDisplay="auto" {...other} />}
    />
  );
}
