import { FunctionComponent } from 'react';
import css from './Layout.module.css';

interface LayoutProps {
    
}
 
const Layout: FunctionComponent<LayoutProps> = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
}
 
export default Layout;