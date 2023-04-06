// @mui
import { Stack, Button, Tooltip, Typography, IconButton, ToggleButton } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// @types
import { ICalendarViewValue } from '../../../@types/calendar';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Month', icon: 'ic:round-view-module' },
  { value: 'timeGridWeek', label: 'Week', icon: 'ic:round-view-week' },
  { value: 'timeGridDay', label: 'Day', icon: 'ic:round-view-day' },
  { value: 'listWeek', label: 'Agenda', icon: 'ic:round-view-agenda' },
] as const;

// ----------------------------------------------------------------------

type Props = {
  date: Date;
  view: ICalendarViewValue;
  onToday: VoidFunction;
  onNextDate: VoidFunction;
  onPrevDate: VoidFunction;
  onOpenFilter: VoidFunction;
  onChangeView: (newView: ICalendarViewValue) => void;
};

export default function CalendarToolbar({
  date,
  view,
  onToday,
  onNextDate,
  onPrevDate,
  onChangeView,
  onOpenFilter,
}: Props) {
  const isDesktop = useResponsive('up', 'sm');

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 2.5 }}
    >
      {isDesktop && (
        <Stack direction="row" spacing={1}>
          {VIEW_OPTIONS.map((viewOption) => (
            <Tooltip key={viewOption.value} title={viewOption.label}>
              <ToggleButton
                size="small"
                value={view}
                selected={viewOption.value === view}
                onChange={() => onChangeView(viewOption.value)}
              >
                <Iconify icon={viewOption.icon} />
              </ToggleButton>
            </Tooltip>
          ))}
        </Stack>
      )}

      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton onClick={onPrevDate}>
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>

        <Typography variant="h5">{fDate(date)}</Typography>

        <IconButton onClick={onNextDate}>
          <Iconify icon="eva:arrow-ios-forward-fill" />
        </IconButton>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        {isDesktop && (
          <Button size="small" color="error" variant="contained" onClick={onToday}>
            Today
          </Button>
        )}

        <IconButton onClick={onOpenFilter}>
          <Iconify icon="ic:round-filter-list" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
