import { FunctionComponent, useEffect } from 'react';
import Header from '../Header/Header';
import css from './Layout.module.css';

interface LayoutProps {
    
}
 
const Layout: FunctionComponent<LayoutProps> = (props) => {
    return (
        <div className='layout'>
            <Header />
            {props.children}
        </div>
    );
}
 
export default Layout;