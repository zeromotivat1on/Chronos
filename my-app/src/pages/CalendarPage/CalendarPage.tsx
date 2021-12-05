import { FunctionComponent, useState, useEffect } from 'react';
import Calendar from '../../common/Calendar/Calendar';
import Calendars from '../Calendars/Calendars';
import css from './CalendarPage.module.css';

export interface CalendarPageProps {

}
 

const CalendarPage: FunctionComponent<CalendarPageProps> = (props) => {
  const [id, setId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const urlArr = window.location.href.split('/');
    const id = parseInt(urlArr[urlArr.length - 1]);
    console.log(id);
    setId(id);
    setLoading(false);
  }, []);

  return (
    <main className="def-page">
      {!loading ? 
        <Calendar id={id}/>
        :
        <h2 className={css.loading}>loading your calendar...</h2>
      }
    </main>
  );
}
 

export default CalendarPage;