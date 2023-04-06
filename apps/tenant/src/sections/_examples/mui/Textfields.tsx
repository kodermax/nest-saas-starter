import { useState } from 'react';
// @mui
import { MenuItem, TextField, IconButton, InputAdornment } from '@mui/material';
import { Masonry } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const CURRENCIES = [
  { value: 'USD', label: '$' },
  { value: 'EUR', label: '€' },
  { value: 'BTC', label: '฿' },
  { value: 'JPY', label: '¥' },
];

const style = {
  '& > *': { my: '8px !important' },
};

// ----------------------------------------------------------------------

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

type Props = {
  variant?: 'filled' | 'outlined' | 'standard';
};

export default function Textfields({ variant }: Props) {
  const [currency, setCurrency] = useState('EUR');

  const [values, setValues] = useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
      <Block title="General" sx={style}>
        <TextField variant={variant} fullWidth label="Inactive" />

        <TextField
          variant={variant}
          required
          fullWidth
          label="Activated"
          defaultValue="Hello Minimal"
        />

        <TextField
          variant={variant}
          fullWidth
          type="password"
          label="Password"
          autoComplete="current-password"
        />

        <TextField
          variant={variant}
          disabled
          fullWidth
          label="Disabled"
          defaultValue="Hello Minimal"
        />
      </Block>

      <Block title="With Icon & Adornments" sx={style}>
        <TextField
          variant={variant}
          fullWidth
          label="Filled"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:person-fill" width={24} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          variant={variant}
          disabled
          fullWidth
          label="Disabled"
          defaultValue="Hello Minimal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:person-fill" width={24} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          variant={variant}
          fullWidth
          label="With normal TextField"
          InputProps={{
            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
          }}
        />

        <TextField
          variant={variant}
          fullWidth
          value={values.weight}
          onChange={handleChange('weight')}
          helperText="Weight"
          InputProps={{
            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
          }}
        />

        <TextField
          variant={variant}
          fullWidth
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          label="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:person-fill" width={24} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? (
                    <Iconify icon="eva:eye-fill" width={24} />
                  ) : (
                    <Iconify icon="eva:eye-off-fill" width={24} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Block>

      <Block title="With Caption" sx={style}>
        <TextField
          variant={variant}
          fullWidth
          label="Error"
          defaultValue="Hello Minimal"
          helperText="Incorrect entry."
        />

        <TextField
          variant={variant}
          error
          fullWidth
          label="Error"
          defaultValue="Hello Minimal"
          helperText="Incorrect entry."
        />
      </Block>

      <Block title="Type" sx={style}>
        <TextField
          variant={variant}
          fullWidth
          type="password"
          label="Password"
          autoComplete="current-password"
        />

        <TextField
          variant={variant}
          fullWidth
          type="number"
          label="Number"
          defaultValue={0}
          InputLabelProps={{ shrink: true }}
        />

        <TextField variant={variant} fullWidth label="Search" type="search" />
      </Block>

      <Block title="Size" sx={style}>
        <TextField variant={variant} fullWidth label="Size" size="small" defaultValue="Small" />

        <TextField variant={variant} fullWidth label="Size" defaultValue="Normal" />
      </Block>

      <Block title="Select" sx={style}>
        <TextField
          variant={variant}
          select
          fullWidth
          label="Select"
          value={currency}
          onChange={handleChangeCurrency}
          helperText="Please select your currency"
        >
          {CURRENCIES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          variant={variant}
          select
          fullWidth
          size="small"
          value={currency}
          label="Native select"
          SelectProps={{ native: true }}
          onChange={handleChangeCurrency}
          helperText="Please select your currency"
        >
          {CURRENCIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Block>

      <Block title="Multiline" sx={style}>
        <TextField
          variant={variant}
          fullWidth
          label="Multiline"
          multiline
          maxRows={4}
          value="Controlled"
        />

        <TextField
          variant={variant}
          fullWidth
          multiline
          placeholder="Placeholder"
          label="Multiline Placeholder"
        />

        <TextField
          variant={variant}
          rows={4}
          fullWidth
          multiline
          label="Multiline"
          defaultValue="Default Value"
        />
      </Block>
    </Masonry>
  );
}
