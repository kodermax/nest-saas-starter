import { EventInput } from '@fullcalendar/common';

// ----------------------------------------------------------------------

export type ICalendarViewValue = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type ICalendarEvent = {
  title: string;
  description: string;
  textColor: string;
  allDay: boolean;
  start: Date | string | null;
  end: Date | string | null;
};

export type ICalendarState = {
  isLoading: boolean;
  error: Error | string | null;
  events: EventInput[];
  openModal: boolean;
  selectedEventId: string | null;
  selectedRange: {
    start: Date;
    end: Date;
  } | null;
};
