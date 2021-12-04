import { FunctionComponent } from 'react';
import { post } from '../../http/HttpService';
import css from './Header.module.css';

export interface HeaderProps {
    
}
 
const Header: FunctionComponent<HeaderProps> = (props) => {
    const logout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const response = await post('api/auth/logout', {});
        if(response.status === 200) {
            document.cookie = 'remember_token=;expires=1;'
            window.location.href = '/';
        } else {
            console.error(response);
        }
    }

    return (
        <header className={css.header}>
            <a href="/home"><h1 className={css.app_name}>chronos</h1></a>
            <nav className={css.nav}>
                <ul className={css.nav_part}>
                    <li className={css.nav_list_item}>
                        <a href="/events" className={css.nav_link}>events</a>
                    </li>
                    <li className={css.nav_list_item}>
                        <a href="/calendars" className={css.nav_link}>calendars</a>
                    </li>
                </ul>
                <ul className={css.nav_part}>
                    <li className={css.nav_list_item}>
                        <a onClick={(e) => logout(e)} className={css.nav_link}>logout</a>
                    </li>
                    <li className={css.nav_list_item}>
                        <a href="/profile" className={css.nav_link}>profile</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
 
export default Header;