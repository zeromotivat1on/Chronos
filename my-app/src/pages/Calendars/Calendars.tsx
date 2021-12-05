import { FunctionComponent, useState, useEffect } from 'react';
import Calendar from '../../common/Calendar/Calendar';
import { TCalendar } from '../../common/Calendar/Calendar';
import Button from '../../common/components/Button/Button';
import { get, post } from '../../common/http/HttpService';
import css from './Calendars.module.css';

interface CalendarsProps {
    
}
 
const Calendars: FunctionComponent<CalendarsProps> = (props) => {
  const [calendars, setCalendars] = useState<Array<TCalendar>>(Array);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const main = async () => {
      const calendarsResp = await post('api/user/calendars', {});
      const calendarsData = await calendarsResp.data;
      if(calendarsResp.status === 200) {
        setCalendars(calendarsData);
      } else {
        if(calendarsResp.status === 401) {
          window.location.replace('/');
        }
      }
      setLoading(false);
    }
    main(); 
  }, [])

  const addCalendar = async () => {
    const title = prompt('Enter your calendar title') as string;
    const description = prompt('Enter your calendar description') as string;
    const response = await post('api/calendar', {
      title: title,
      description: description,
      main: false,
    });
    if(title && response.status === 200) {
      const responseData = await response.data;
      setCalendars([
        ...calendars,
        {
          id: responseData.id,
          title: responseData.title,
          description: responseData.description,
          main: responseData.main,
          owner_id: responseData.owner_id,
        }
      ]);
    }
  }

  return (
    <main className='def-page'>
      {!loading ? 
        <div className={css.calendars}>
          {calendars.map(c =>
            <a href={`/calendar/${c?.id}`} className={css.calendar_block}>
              <h4>{c?.title}</h4><span>{c?.main ? 'Main Calendar' : null}</span>
              <p className={css.calendar_description}>{c?.description}</p>
            </a>)}
        </div>
        :
        <h2 className={css.loading}>loading your calendars...</h2>
      }
      <Button classes={css.btn} onClick={() => addCalendar()} text='Create Calendar'/>
    </main>
  );
}
 
export default Calendars;