import { FunctionComponent, useState } from 'react';
import css from './FormInput.module.css';

export type formInputType = 'text' | 'password' | 'email';

export interface FormInputProps {
    containerClasses?: string,
    type?: formInputType,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
}
 
const FormInput: FunctionComponent<FormInputProps> = (props) => {
    const initialClasses = `${css.container}`;
    const classes = props.containerClasses ? `${initialClasses} ${props.containerClasses}` : initialClasses;
    const type = props.type ?? 'text';
    return (
        <div className={classes}>
            <input className={css.input} type={type}
                onChange={(e) => props.onChange ? props.onChange(e) : null}
                onFocus={(e) => {
                    if(props.onFocus) props.onFocus(e);
                    const container = document.querySelector(`.${initialClasses}.${props.containerClasses}`) as HTMLDivElement;
                    container.style.color = 'var(--clr-alt-100)';
                    container.style.outlineColor = 'var(--clr-alt-100)';
                }}
                onBlur={(e) => {
                    if(props.onBlur) props.onBlur(e);
                    if(e.target.value) return;
                    const container = document.querySelector(`.${initialClasses}.${props.containerClasses}`) as HTMLDivElement;
                    container.style.color = 'var(--clr-alt-50)';
                    container.style.outlineColor = 'var(--clr-alt-50)';
                }}/>
        </div>
    );
}
 
export default FormInput;