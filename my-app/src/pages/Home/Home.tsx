import { FunctionComponent, useEffect } from 'react';
import { get } from '../../common/http/HttpService';
import css from './Home.module.css';

interface HomeProps {
    
}
 
const Home: FunctionComponent<HomeProps> = () => {
    
    useEffect(() => {}, []);

    return (
        <main className='def-page'>

        </main>
    );
}
 
export default Home;