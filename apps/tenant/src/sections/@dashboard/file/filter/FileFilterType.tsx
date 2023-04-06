import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, Button, Typography, CardActionArea } from '@mui/material';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import FileThumbnail from '../../../../components/file-thumbnail';
//
import FileFilterButton from './FileFilterButton';

// ----------------------------------------------------------------------

type Props = {
  filterType: string[];
  optionsType: string[];
  onReset: VoidFunction;
  onFilterType: (type: string) => void;
};

export default function FileFilterType({ optionsType, filterType, onFilterType, onReset }: Props) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const isSelected = !!filterType.length;

  const renderLabel = filterType.length ? filterType.slice(0, 2).join(',') : 'All type';

  return (
    <>
      <FileFilterButton
        isSelected={isSelected}
        endIcon={<Iconify icon={openPopover ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
        onClick={handleOpenPopover}
      >
        {renderLabel}
        {filterType.length > 2 && (
          <Label color="info" sx={{ ml: 1 }}>
            +{filterType.length - 2}
          </Label>
        )}
      </FileFilterButton>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ p: 2.5 }}>
        <Stack spacing={2.5}>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }}
            gap={1}
          >
            {optionsType.map((type) => {
              const isSelected = filterType.includes(type);

              return (
                <CardActionArea
                  key={type}
                  onClick={() => onFilterType(type)}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    cursor: 'pointer',
                    color: 'text.secondary',
                    border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
                    ...(isSelected && {
                      color: 'text.primary',
                      bgcolor: 'action.selected',
                    }),
                  }}
                >
                  <Stack spacing={0.5} direction="row" alignItems="center">
                    <FileThumbnail file={type} />

                    <Typography variant="body2">{type}</Typography>
                  </Stack>
                </CardActionArea>
              );
            })}
          </Box>

          <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-end">
            <Button variant="outlined" color="inherit" onClick={onReset}>
              Clear
            </Button>

            <Button variant="contained" onClick={handleClosePopover}>
              Apply
            </Button>
          </Stack>
        </Stack>
      </MenuPopover>
    </>
  );
}
