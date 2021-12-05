import { FunctionComponent, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/common';
import Holidays, { HolidaysTypes } from 'date-holidays';
import Button from '../components/Button/Button';
import { get, getLocation, post } from '../http/HttpService';
import css from './Calendar.module.css';
import './CalendarOverrides.css';

export type TCalendar = {
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
 
const TCalendar: FunctionComponent<CalendarProps> = (props) => {
  const [calendar, setCalendar] = useState<TCalendar>(null);
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
      const calendarResp = props.id === 'main' ?
        await post('api/user/main-calendar', {}) :
        await get(`api/calendar/${props.id}`)
      const calendarData = await calendarResp.data;
      if(calendarResp.status === 200) {
        setCalendar(calendarData);
        const eventsResp = await get(`api/calendar/events/${calendarData.id}`);
        const eventsData = await eventsResp.data;
        setEvents(eventsData);
        let fullCalendarEventsToSet: Array<FullCalendarEvent> = eventsData.map((e: Event) => eventToFullCalendarEvent(e));
        if(calendarData.main === true) {
          const location = await getLocation();
          const locationData = await location.data;
          const holidays = new Holidays(locationData.country.iso_code);
          const holidaysData = holidays.getHolidays();
          fullCalendarEventsToSet = fullCalendarEventsToSet.concat(holidaysData.map((h: HolidaysTypes.Holiday) => holidayToFullCalendarEvent(h)));
        }
        setFullCalendarEvents(fullCalendarEventsToSet);
      } else {
        if(calendarResp.status === 401) {
          window.location.replace('/');
        }
      }
      setLoading(false);
    }
    main();
  }, []);

  const addEvent = async (e?: DateClickArg) => {
    const title = prompt('Enter your event title') as string;
    const description = prompt('Enter your event description') as string;
    const date = prompt('Enter your event date in YYYY-MM-DD HH:MM:SS format', e?.dateStr) as string;
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
    if(title && date && description && color && response.status === 200) {
      const responseData = await response.data;
      setFullCalendarEvents([
        ...fullCalendarEvents, 
        {
          id: responseData.id,
          title: responseData.title,
          start: responseData.event_date,
          color: responseData.color,
        }
      ]);
    }
  }

  const showEvent = async (e: EventClickArg) => {
    const eventResp = await get(`api/event/${e.event._def.publicId}`);
    const eventData = await eventResp.data;
    if(eventResp.status === 200) {
      alert(`EVENT INFO\nTitle: ${eventData.title}\nDescription: ${eventData.description}\nCategory: ${eventData.category}\nColor: ${eventData.color}`);
    } else {
      console.log(eventResp);
    }
  }

  return (
    <>
      {!loading ? 
        (<div className={css.calendar}>
          <h2 className={css.calendar_title}>{calendar?.title}</h2>
          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            viewClassNames={css.view_calendar}
            dayCellClassNames={css.calendar_cell}
            dayHeaderClassNames={css.day_header}
            dateClick={(arg: DateClickArg) => addEvent(arg)}
            eventClick={(arg: EventClickArg) => showEvent(arg)}
            events={fullCalendarEvents}
            initialView='dayGridMonth'
          />
          <div className={css.other}>
            <Button classes={css.btn} onClick={() => addEvent()} text='Create Event'/>
          </div>
        </div>) :
        <h2 className={css.loading}>loading your calendar...</h2>
      }
    </>
  );
}
 
export default TCalendar;