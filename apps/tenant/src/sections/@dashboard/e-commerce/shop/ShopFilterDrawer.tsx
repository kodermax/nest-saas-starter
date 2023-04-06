// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Radio,
  Stack,
  Input,
  Badge,
  Button,
  Drawer,
  Rating,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// config
import { NAV } from '../../../../config';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import { ColorMultiPicker } from '../../../../components/color-utils';
import { RHFMultiCheckbox, RHFRadioGroup, RHFSlider } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export const FILTER_GENDER_OPTIONS = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

export const FILTER_CATEGORY_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'Shose', value: 'Shose' },
  { label: 'Apparel', value: 'Apparel' },
  { label: 'Accessories', value: 'Accessories' },
];

export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

const onSelected = (selected: string[], item: string) =>
  selected.includes(item) ? selected.filter((value) => value !== item) : [...selected, item];

type Props = {
  open: boolean;
  isDefault: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  onResetFilter: VoidFunction;
};

export default function ShopFilterDrawer({
  open,
  onOpen,
  onClose,
  isDefault,
  onResetFilter,
}: Props) {
  const { control } = useFormContext();

  const marksLabel = [...Array(21)].map((_, index) => {
    const value = index * 10;

    const firstValue = index === 0 ? `$${value}` : `${value}`;

    return {
      value,
      label: index % 4 ? '' : firstValue,
    };
  });

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: NAV.W_BASE },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2, pr: 1, py: 2 }}
        >
          <Typography variant="subtitle1">Filters</Typography>

          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 2.5 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1"> Gender </Typography>
              <RHFMultiCheckbox name="gender" options={FILTER_GENDER_OPTIONS} sx={{ width: 1 }} />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1"> Category </Typography>
              <RHFRadioGroup name="category" options={FILTER_CATEGORY_OPTIONS} row={false} />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1"> Color </Typography>

              <Controller
                name="colors"
                control={control}
                render={({ field }) => (
                  <ColorMultiPicker
                    selected={field.value}
                    colors={FILTER_COLOR_OPTIONS}
                    onChangeColor={(color) => field.onChange(onSelected(field.value, color))}
                    sx={{ maxWidth: 36 * 4 }}
                  />
                )}
              />
            </Stack>

            <Stack spacing={1} sx={{ pb: 2 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                Price
              </Typography>

              <Stack direction="row" spacing={2}>
                <InputRange type="min" />
                <InputRange type="max" />
              </Stack>

              <RHFSlider
                name="priceRange"
                step={10}
                min={0}
                max={200}
                marks={marksLabel}
                getAriaValueText={(value) => `$${value}`}
                valueLabelFormat={(value) => `$${value}`}
                sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">Rating</Typography>

              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {FILTER_RATING_OPTIONS.map((item, index) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={
                          <Radio
                            disableRipple
                            color="default"
                            icon={<Rating readOnly value={4 - index} />}
                            checkedIcon={<Rating readOnly value={4 - index} />}
                            sx={{
                              '&:hover': { bgcolor: 'transparent' },
                            }}
                          />
                        }
                        label="& Up"
                        sx={{
                          my: 0.5,
                          borderRadius: 1,
                          '&:hover': { opacity: 0.48 },
                          ...(field.value.includes(item) && {
                            bgcolor: 'action.selected',
                          }),
                        }}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </Stack>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <Badge
            color="error"
            variant="dot"
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            invisible={isDefault}
            sx={{ width: 1 }}
          >
            <Button
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={onResetFilter}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
            >
              Clear
            </Button>
          </Badge>
        </Box>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

type InputRangeProps = {
  type: 'min' | 'max';
};

function InputRange({ type }: InputRangeProps) {
  const { control, setValue } = useFormContext();

  const handleBlurInputRange = (value: [number, number]) => {
    const min = value[0];

    const max = value[1];

    if (min < 0) {
      setValue('priceRange', [0, max]);
    }
    if (min > 200) {
      setValue('priceRange', [200, max]);
    }
    if (max < 0) {
      setValue('priceRange', [min, 0]);
    }
    if (max > 200) {
      setValue('priceRange', [min, 200]);
    }
  };

  return (
    <Controller
      name="priceRange"
      control={control}
      render={({ field }) => {
        const isMin = type === 'min';

        const min = field.value[0];

        const max = field.value[1];

        return (
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ width: 1 }}>
            <Typography
              variant="caption"
              sx={{
                flexShrink: 0,
                color: 'text.disabled',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightBold',
              }}
            >
              {`${type} ($)`}
            </Typography>

            <Input
              disableUnderline
              fullWidth
              size="small"
              value={isMin ? min : max}
              onChange={(event) =>
                isMin
                  ? field.onChange([Number(event.target.value), max])
                  : field.onChange([min, Number(event.target.value)])
              }
              onBlur={() => handleBlurInputRange(field.value)}
              inputProps={{
                step: 10,
                min: 0,
                max: 200,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              sx={{
                pr: 1,
                py: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                '& .MuiInput-input': { p: 0, textAlign: 'right' },
              }}
            />
          </Stack>
        );
      }}
    />
  );
}
