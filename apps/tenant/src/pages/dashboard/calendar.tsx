import FullCalendar, { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/react'; // => request placed at the top
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { EventInput } from '@fullcalendar/common';
//
import { useState, useRef, useEffect } from 'react';
// next
import Head from 'next/head';
// @mui
import { Card, Button, Container, DialogTitle, Dialog } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  selectEvent,
  selectRange,
  onOpenModal,
  onCloseModal,
} from '../../redux/slices/calendar';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { fTimestamp } from '../../utils/formatTime';
// hooks
import useResponsive from '../../hooks/useResponsive';
// @types
import { ICalendarEvent, ICalendarViewValue } from '../../@types/calendar';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import Iconify from '../../components/iconify';
import { useSnackbar } from '../../components/snackbar';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { useDateRangePicker } from '../../components/date-range-picker';
// sections
import {
  CalendarForm,
  StyledCalendar,
  CalendarToolbar,
  CalendarFilterDrawer,
} from '../../sections/@dashboard/calendar';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

// ----------------------------------------------------------------------

CalendarPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function CalendarPage() {
  const { enqueueSnackbar } = useSnackbar();

  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const isDesktop = useResponsive('up', 'sm');

  const calendarRef = useRef<FullCalendar>(null);

  const { events, openModal, selectedRange, selectedEventId } = useSelector(
    (state) => state.calendar
  );

  const selectedEvent = useSelector((state) => {
    const { events, selectedEventId } = state.calendar;

    if (selectedEventId) {
      return events.find((event) => event.id === selectedEventId);
    }

    return null;
  });

  const picker = useDateRangePicker(null, null);

  const [date, setDate] = useState(new Date());

  const [openFilter, setOpenFilter] = useState(false);

  const [filterEventColor, setFilterEventColor] = useState<string[]>([]);

  const [view, setView] = useState<ICalendarViewValue>(isDesktop ? 'dayGridMonth' : 'listWeek');

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isDesktop]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView: ICalendarViewValue) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(
      selectRange({
        start: arg.start,
        end: arg.end,
      })
    );
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    dispatch(selectEvent(arg.event.id));
  };

  const handleResizeEvent = async ({ event }: EventResizeDoneArg) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = async ({ event }: EventDropArg) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    dispatch(onOpenModal());
  };

  const handleCloseModal = () => {
    dispatch(onCloseModal());
  };

  const handleCreateUpdateEvent = (newEvent: ICalendarEvent) => {
    if (selectedEventId) {
      dispatch(updateEvent(selectedEventId, newEvent));
      enqueueSnackbar('Update success!');
    } else {
      dispatch(createEvent(newEvent));
      enqueueSnackbar('Create success!');
    }
  };

  const handleDeleteEvent = async () => {
    try {
      if (selectedEventId) {
        dispatch(deleteEvent(selectedEventId));
        handleCloseModal();
        enqueueSnackbar('Delete success!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterEventColor = (eventColor: string) => {
    const checked = filterEventColor.includes(eventColor)
      ? filterEventColor.filter((value) => value !== eventColor)
      : [...filterEventColor, eventColor];

    setFilterEventColor(checked);
  };

  const dataFiltered = applyFilter({
    inputData: events,
    filterEventColor,
    filterStartDate: picker.startDate,
    filterEndDate: picker.endDate,
    isError: !!picker.isError,
  });

  return (
    <>
      <Head>
        <title> Calendar | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Calendar"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Calendar',
            },
          ]}
          moreLink={['https://fullcalendar.io/docs/react']}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleOpenModal}
            >
              New Event
            </Button>
          }
        />

        <Card>
          <StyledCalendar>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
              onOpenFilter={handleOpenFilter}
            />
            <FullCalendar
              weekends
              editable
              droppable
              selectable
              allDayMaintainDuration
              eventResizableFromStart
              events={dataFiltered}
              initialEvents={events}
              ref={calendarRef}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              select={handleSelectRange}
              eventDrop={handleDropEvent}
              eventClick={handleSelectEvent}
              eventResize={handleResizeEvent}
              height={isDesktop ? 720 : 'auto'}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
            />
          </StyledCalendar>
        </Card>
      </Container>

      <Dialog fullWidth maxWidth="xs" open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>

        <CalendarForm
          event={selectedEvent}
          range={selectedRange}
          onCancel={handleCloseModal}
          onCreateUpdateEvent={handleCreateUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
          colorOptions={COLOR_OPTIONS}
        />
      </Dialog>

      <CalendarFilterDrawer
        events={events}
        picker={picker}
        open={openFilter}
        onClose={handleCloseFilter}
        colorOptions={COLOR_OPTIONS}
        filterEventColor={filterEventColor}
        onFilterEventColor={handleFilterEventColor}
        onResetFilter={() => {
          const { setStartDate, setEndDate } = picker;
          setFilterEventColor([]);
          if (setStartDate && setEndDate) {
            setStartDate(null);
            setEndDate(null);
          }
        }}
        onSelectEvent={(eventId: string) => {
          if (eventId) {
            handleOpenModal();
            dispatch(selectEvent(eventId));
          }
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  filterEventColor,
  filterStartDate,
  filterEndDate,
  isError,
}: {
  inputData: EventInput[];
  filterEventColor: string[];
  filterStartDate: Date | null;
  filterEndDate: Date | null;
  isError: boolean;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterEventColor.length) {
    inputData = inputData.filter((event: EventInput) =>
      filterEventColor.includes(event.textColor as string)
    );
  }

  if (filterStartDate && filterEndDate && !isError) {
    inputData = inputData.filter(
      (event: EventInput) =>
        fTimestamp(event.start as Date) >= fTimestamp(filterStartDate) &&
        fTimestamp(event.end as Date) <= fTimestamp(filterEndDate)
    );
  }

  return inputData;
}
