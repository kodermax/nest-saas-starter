// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Switch, FormControlLabel, FormControlLabelProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends Omit<FormControlLabelProps, 'control'> {
  name: string;
}

export default function RHFSwitch({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel control={<Switch {...field} checked={field.value} />} {...other} />
      )}
    />
  );
}
