// @mui
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

interface Props extends ToggleButtonGroupProps {
  value: string;
  onChange: (event: React.MouseEvent<HTMLElement>, newView: string | null) => void;
}

export default function FileChangeViewButton({ value, onChange, ...other }: Props) {
  return (
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={value}
      exclusive
      onChange={onChange}
      {...other}
    >
      <ToggleButton value="list">
        <Iconify icon="eva:list-fill" />
      </ToggleButton>

      <ToggleButton value="grid">
        <Iconify icon="eva:grid-fill" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
