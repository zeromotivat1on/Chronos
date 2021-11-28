import { FunctionComponent } from 'react';
import css from './LogRegLayout.module.css';

export interface LogRegLayoutProps {
    
}
 
const LogRegLayout: FunctionComponent<LogRegLayoutProps> = (props) => {
  return (
    <>
      <span className={css.app_name}>chronos</span>
      {props.children}
    </>
  );
}
 
export default LogRegLayout;