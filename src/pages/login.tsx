import { FC, useContext, useEffect, useState } from 'react';
import IPage from '../models/IPage';
import AuthContainer from '../components/AuthContainer';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';

const LoginPage: FC<IPage> = (props) => {
    const [email, setEmail] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [emailError, setEmailError] = useState<string>("Email can't be empty!");
    const [pwdError, setPwdError] = useState<string>("Password can't be empty!");
    const [emailDirty, setEmailDirty] = useState<boolean>(false);
    const [pwdDirty, setPwdDirty] = useState<boolean>(false);
    const [formValid, setFormValid] = useState<boolean>(false);
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.loggedIn) {
            navigate('/');
        }
    }, [store]);

    useEffect(() => {
        if (emailError || pwdError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, pwdError]);

    const handleSubmit = async () => {
        await store.login(email, pwd);

        if (store.loggedIn) {
            navigate('/');
        }
    };

    const handleChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        if (target.name === 'email') {
            setEmail(target.value);
            const re = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
            if (!re.test(String(target.value).toLowerCase())) {
                setEmailError('Invalid email address!');
            } else {
                setEmailError('');
            }
        }
        if (target.name === 'password') {
            setPwd(target.value);
            if (String(target.value).length < 4) {
                setPwdError('Your password is too short!');
            } else if (String(target.value).length > 24) {
                setPwdError('Your password is too long!');
            } else if (!target.value) {
                setPwdError("Password can't be empty!");
            } else {
                setPwdError('');
            }
        }
    };

    const blurHandler = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        if (target.name === 'email') setEmailDirty(true);
        if (target.name === 'password') setPwdDirty(true);
    };

    return (
        <AuthContainer header="Log in">
            <div className="auth-form">
                <div className="form-input-container">
                    <label htmlFor="email">Email</label>
                    <input onBlur={(e) => blurHandler(e)} name="email" type="text" placeholder="Email" value={email} onChange={(e) => handleChange(e)} />
                    {emailDirty && emailError && <div className="form-error-msg">{emailError}</div>}
                </div>
                <div className="form-input-container">
                    <label htmlFor="password">Password</label>
                    <input onBlur={(e) => blurHandler(e)} name="password" type="password" placeholder="Password" value={pwd} onChange={(e) => handleChange(e)} />
                    {pwdDirty && pwdError && <div className="form-error-msg">{pwdError}</div>}
                </div>
                <button disabled={!formValid} className="btn" onClick={handleSubmit}>
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
