import { FC, useContext, useEffect, useState } from 'react';
import IPage from '../models/IPage';
import AuthContainer from '../components/AuthContainer';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { useInput } from '../hooks/useInput';

const LoginPage: FC<IPage> = (props) => {
    const email = useInput('Email', '', { isEmpty: true, minLength: 3, isEmail: true });
    const pwd = useInput('Password', '', { isEmpty: true, minLength: 5, maxLength: 24 });
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.loggedIn) {
            navigate('/');
        }
    }, [store]);

    const handleSubmit = async () => {
        await store.login(email.value, pwd.value);

        if (store.loggedIn) {
            navigate('/');
        }
    };

    return (
        <AuthContainer header="Log in">
            <div className="auth-form">
                <div className="form-input-container">
                    <label htmlFor="email">Email</label>
                    <input onBlur={() => email.onBlur()} name="email" type="text" placeholder="Email" value={email.value} onChange={(e) => email.onChange(e)} />
                    {email.isDirty && email.errorMessage && <div className="form-error-msg">{email.errorMessage}</div>}
                </div>
                <div className="form-input-container">
                    <label htmlFor="password">Password</label>
                    <input onBlur={() => pwd.onBlur()} name="password" type="password" placeholder="Password" value={pwd.value} onChange={(e) => pwd.onChange(e)} />
                    {pwd.isDirty && pwd.errorMessage && <div className="form-error-msg">{pwd.errorMessage}</div>}
                </div>
                <button disabled={!email.inputValid || !pwd.inputValid} className="btn" onClick={handleSubmit}>
                    Log In
                </button>
            </div>
            <small>
                <p className="m-1 text-center">
                    Don&apos;t have an account?{' '}
                    <Link className="link" to="/register">
                        Register one!
                    </Link>
                </p>
            </small>
        </AuthContainer>
    );
};

export default LoginPage;
