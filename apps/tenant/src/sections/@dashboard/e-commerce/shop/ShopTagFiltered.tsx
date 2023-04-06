import { sentenceCase } from 'change-case';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Button, Box, StackProps } from '@mui/material';
// @type
import { IProductFilter } from '../../../../@types/product';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  isFiltered: boolean;
  onResetFilter: VoidFunction;
};

export default function ShopTagFiltered({ isFiltered, onResetFilter }: Props) {
  const theme = useTheme();

  const { watch, setValue } = useFormContext();

  const values = watch();

  const {
    gender: filterGender,
    category: filterCategory,
    colors: filterColors,
    priceRange: filterPriceRange,
    rating: filterRating,
  } = values as IProductFilter;

  const min = filterPriceRange[0];

  const max = filterPriceRange[1];

  const handleRemoveGender = (value: string) => {
    const newValue = filterGender.filter((item) => item !== value);
    setValue('gender', newValue);
  };

  const handleRemoveCategory = () => {
    setValue('category', 'All');
  };

  const handleRemoveColor = (value: string) => {
    const newValue = filterColors.filter((item) => item !== value);
    setValue('colors', newValue);
  };

  const handleRemovePrice = () => {
    setValue('priceRange', [0, 200]);
  };

  const handleRemoveRating = () => {
    setValue('rating', '');
  };

  return (
    <Stack flexGrow={1} direction="row" flexWrap="wrap" alignItems="center">
      {!!filterGender.length && (
        <Panel label="Gender:">
          {filterGender.map((gender) => (
            <Chip
              key={gender}
              label={gender}
              size="small"
              onDelete={() => handleRemoveGender(gender)}
              sx={{ m: 0.5 }}
            />
          ))}
        </Panel>
      )}

      {filterCategory !== 'All' && (
        <Panel label="Category:">
          <Chip
            size="small"
            label={filterCategory}
            onDelete={handleRemoveCategory}
            sx={{ m: 0.5 }}
          />
        </Panel>
      )}

      {!!filterColors.length && (
        <Panel label="Colors:">
          {filterColors.map((color) => (
            <Chip
              key={color}
              size="small"
              label={
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: color,
                    borderRadius: '50%',
                    border: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                />
              }
              onDelete={() => handleRemoveColor(color)}
              sx={{
                m: 0.5,
                color: theme.palette.getContrastText(color),
                '& .MuiChip-label': { pl: 0.25 },
              }}
            />
          ))}
        </Panel>
      )}

      {(min !== 0 || max !== 200) && (
        <Panel label="Price:">
          <Chip
            size="small"
            label={`$${min} - ${max}`}
            onDelete={handleRemovePrice}
            sx={{ m: 0.5 }}
          />
        </Panel>
      )}

      {!!filterRating && (
        <Panel label="Rating:">
          <Chip
            size="small"
            label={sentenceCase(filterRating)}
            onDelete={handleRemoveRating}
            sx={{ m: 0.5 }}
          />
        </Panel>
      )}

      {isFiltered && (
        <Button
          color="error"
          size="small"
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}

// ----------------------------------------------------------------------

interface PanelProps extends StackProps {
  label: string;
}

function Panel({ label, children, sx }: PanelProps) {
  return (
    <Stack
      direction="row"
      alignItems="stretch"
      sx={{
        m: 0.5,
        borderRadius: 1,
        overflow: 'hidden',
        border: (theme) => `solid 1px ${theme.palette.divider}`,
        ...sx,
      }}
    >
      <Stack
        component="span"
        direction="row"
        alignItems="center"
        sx={{
          px: 1,
          typography: 'subtitle2',
          color: 'text.secondary',
          bgcolor: 'background.neutral',
          borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        {label}
      </Stack>

      <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
        {children}
      </Stack>
    </Stack>
  );
}
