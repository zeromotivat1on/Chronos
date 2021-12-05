import { FunctionComponent, useState } from 'react';
import Button from '../../common/components/Button/Button';
import FormInput from '../../common/components/FormInput/FormInput';
import { post } from '../../common/http/HttpService';
import css from './Login.module.css';

export type User = {
    login: string,
    password: string,
} | null

interface LoginProps {
    
}
 
const Login: FunctionComponent<LoginProps> = (props) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const trySwitchSignInBtn = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const signUpBtn = document.querySelector(`.${css.sign_in_btn}`) as HTMLButtonElement;
        if( login !== '' &&
            password !== '') {
                if(signUpBtn.classList.contains('btn-lock')) {
                    signUpBtn.classList.remove('btn-lock');
                }
            } else {
                if(!signUpBtn.classList.contains('btn-lock')) {
                    signUpBtn.classList.add('btn-lock');
                }
            }
    }

    const signIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const user: User = {
            login: login,
            password: password,
        };
        console.log(user);
        const response = await post('api/auth/login', user);
        const data = await response.data;
        console.log(response);
        if(response.status === 200) {
            document.cookie = `remember_token=${data.jwt_token};expires=${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString()};`;
            window.location.href = '/home';
        } else {
            console.error(response);
        }
    }

    return (
        <main className='def-page'>
            <span className={css.app_name}>chronos</span>
            <form className={css.form}>
                <FormInput 
                    containerClasses={css.username_input}
                    onChange={(e) => setLogin(e.target.value)}
                    onBlur={(e) => trySwitchSignInBtn(e)} />
                <FormInput 
                    containerClasses={css.password_input} 
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => trySwitchSignInBtn(e)} />
                <div className={css.btns}>
                    <Button type='submit' onClick={() => {}} classes={css.sign_up_btn}text='Sign up' />
                    <Button onClick={(e) => signIn(e)} classes={`${css.sign_in_btn} btn-lock`} text='Sign in' />
                </div>
            </form>
            <span className={css.page_name}>login</span>
        </main>
    );
}
 
export default Login;