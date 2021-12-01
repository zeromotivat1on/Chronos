import { FunctionComponent } from "react";
import css from './Button.module.css';

export type buttonType = 'submit' | 'button' | 'reset'
export interface ButtonProps {
    classes?: string,
    text?: string,
    type?: buttonType,
    onClick : (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}
 
const Button: FunctionComponent<ButtonProps> = (props) => {
    return (
        <button type={props.type ?? 'button'} className={`${css.btn} ${props.classes}`} onClick={(e) => props.onClick(e)}>{props.text}</button>
    );
}

export default Button;