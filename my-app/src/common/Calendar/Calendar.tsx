import { FunctionComponent, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateClickArg } from '@fullcalendar/interaction';
import Holidays, { HolidaysTypes } from 'date-holidays';
import Button from '../components/Button/Button';
import { get, getLocation, post } from '../http/HttpService';
import css from './Calendar.module.css';
import './CalendarOverrides.css';

export type Calendar = {
  id: number,
  title: string,
  description: string,
  main: boolean,
  owner_id: number, 
} | null

export type Event = {
  id: number,
  title: string,
  description: string,
  event_date: string,
  color: string,
  category: string,
  calendar_id: number,
  owner_id: number,
}

export type FullCalendarEvent = {
  id?: string,
  title: string,
  start: string,
  color?: string,
}

export interface CalendarProps {
  id: number | 'main',
}
 
const Calendar: FunctionComponent<CalendarProps> = (props) => {
  const [calendar, setCalendar] = useState<Calendar>(null);
  const [events, setEvents] = useState<Array<Event>>(Array);
  const [fullCalendarEvents, setFullCalendarEvents] = useState<Array<FullCalendarEvent>>(Array);
  const [loading, setLoading] = useState<boolean>(true);

  const eventToFullCalendarEvent = (e: Event): FullCalendarEvent => {
    const res: FullCalendarEvent = {
      id: e.id.toString(),
      title: e.title,
      start: e.event_date,
      color: e.color,
    };
    return res;
  } 

  const holidayToFullCalendarEvent = (e: HolidaysTypes.Holiday): FullCalendarEvent => {
    const res: FullCalendarEvent = {
      title: e.name,
      start: e.date,
    };
    return res;
  } 

  useEffect(() => {
    const main = async () => {
      const calendarResp = await post(props.id === 'main' ? 'api/user/main-calendar' : `api/calendar/${props.id}`, {});
      const calendarData = await calendarResp.data;
      if(calendarResp.status === 200) {
        setCalendar(calendarData);
        const eventsResp = await get(`api/calendar/events/${calendarData.id}`);
        const eventsData = await eventsResp.data;
        setEvents(eventsData);
        let fullCalendarEventsToSet: Array<FullCalendarEvent> = eventsData.map((e: Event) => eventToFullCalendarEvent(e));
        if(props.id === 'main') {
          const location = await getLocation();
          const locationData = await location.data;
          const holidays = new Holidays(locationData.country.iso_code);
          const holidaysData = holidays.getHolidays();
          fullCalendarEventsToSet = fullCalendarEventsToSet.concat(holidaysData.map((h: HolidaysTypes.Holiday) => holidayToFullCalendarEvent(h)));
        }
        setFullCalendarEvents(fullCalendarEventsToSet);
        setLoading(false);
      } else {
        if(calendarResp.status === 401) {
          window.location.replace('/');
        }
      }
    }
    main();
  }, []);

  const addEvent = async (dateClickArg?: DateClickArg) => {
    const title = prompt('Enter your event title') as string;
    const description = prompt('Enter your event description') as string;
    const date = prompt('Enter your event date in YYYY-MM-DD HH:MM:SS format', dateClickArg?.dateStr) as string;
    const color = prompt('Enter your event color') as string;
    const response = await post('api/event', {
      title: title,
      description: description,
      event_date: date,
      color: color,
      category: 'task',
      calendar_id: calendar?.id,
    });
    console.log(response);
    if(title && date && response.status === 200) {
      const responseData = await response.data;
      setFullCalendarEvents([
        ...fullCalendarEvents, 
        {
          title: responseData.title,
          start: responseData.event_date,
          color: responseData.color,
        }
      ]);
    }
  }

  return (
    <>
      {!loading ? 
        (<div className={css.calendar}>
          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            viewClassNames={css.view_calendar}
            dayCellClassNames={css.calendar_cell}
            dayHeaderClassNames={css.day_header}
            dateClick={(arg: DateClickArg) => addEvent(arg)}
            events={fullCalendarEvents}
            initialView='dayGridMonth'
          />
          <div className={css.other}>
            <Button classes={css.btn} onClick={() => addEvent()} text='Create Event'/>
          </div>
        </div>) :
        <h2 className={css.loading}>loading...</h2>
      }
    </>
  );
}
 
export default Calendar;