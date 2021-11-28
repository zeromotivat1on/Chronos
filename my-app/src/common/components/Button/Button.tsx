import { FunctionComponent } from "react";
import css from './Button.module.css';

export type buttonType = 'submit' | 'button' | 'reset'
export interface ButtonProps {
    classes?: string,
    text?: string,
    type?: buttonType,
    onClick : () => void,
}
 
const Button: FunctionComponent<ButtonProps> = (props) => {
    return (
        <button type={props.type ?? 'button'} className={`${css.btn} ${props.classes}`} onClick={() => props.onClick()}>{props.text}</button>
    );
}

export default Button;