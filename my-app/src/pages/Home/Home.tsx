import { FunctionComponent, useState, useEffect } from 'react';
import Calendar from '../../common/Calendar/Calendar';
import { post } from '../../common/http/HttpService';
import css from './Home.module.css';

export interface HomeProps {
    
}
 
const Home: FunctionComponent<HomeProps> = () => {
  return (
    <main className='def-page'>
      <Calendar id='main'/>
    </main>
  );
}
 
export default Home;