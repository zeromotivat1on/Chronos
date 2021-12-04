import { FunctionComponent, useState } from 'react';
import Button from '../../common/components/Button/Button';
import FormInput from '../../common/components/FormInput/FormInput';
import { post } from '../../common/http/HttpService';
import css from './Register.module.css';

export type User = {
    login: string,
    full_name: string,
    email: string,
    password: string,
    password_confirmation: string,
    region: string,
} | null

export interface RegisterProps {
    
}

const Register: FunctionComponent<RegisterProps> = (props) => {
    const [user, setUser] = useState<User>(null);
    const [login, setLogin] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [region, setRegion] = useState<string>('ua');

    const trySwitchSignUpBtn = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const signUpBtn = document.querySelector(`.${css.sign_up_btn}`) as HTMLButtonElement;
        if( login !== '' &&
            fullName !== '' &&
            email !== '' &&
            password !== '' &&
            passwordConfirmation !== '' &&
            region !== '') {
                if(signUpBtn.classList.contains('btn-lock')) {
                    signUpBtn.classList.remove('btn-lock');
                }
            } else {
                if(!signUpBtn.classList.contains('btn-lock')) {
                    signUpBtn.classList.add('btn-lock');
                }
            }
    }

    const signUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const user: User = {
            login: login,
            full_name: fullName,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            region: region,
        };
        console.log(user);
        const response = await post('api/auth/register', user);
        console.log(response);
        if(response.status === 200) {
            setLogin('');
            setFullName('');
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
            window.location.href = '/login';
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
                    onBlur={(e) => trySwitchSignUpBtn(e)} />
                <FormInput 
                    containerClasses={css.fullname_input}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={(e) => trySwitchSignUpBtn(e)} />
                <FormInput 
                    containerClasses={css.email_input} 
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => trySwitchSignUpBtn(e)} />
                <FormInput 
                    containerClasses={css.password_input} 
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => trySwitchSignUpBtn(e)} />
                <FormInput 
                    containerClasses={css.confirm_password_input}
                    type='password'
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    onBlur={(e) => trySwitchSignUpBtn(e)} />
                <div className={css.btns}>
                    <Button onClick={() => {window.location.href = '/login'}} classes={css.sign_in_btn} text='Sign in' />
                    <Button type='submit' onClick={(e) => signUp(e)} classes={`${css.sign_up_btn} btn-lock`} text='Sign up' />
                </div>
            </form>
            <span className={css.page_name}>register</span>
        </main>
    );
}
 
export default Register;