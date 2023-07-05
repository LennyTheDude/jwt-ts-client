import { FC, useContext, useEffect } from 'react';
import IPage from '../interfaces/IPage';
import AuthContainer from '../components/AuthContainer';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { useInput } from '../hooks/useInput';

const RegisterPage: FC<IPage> = (props) => {
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
        await store.signUp(email.value, pwd.value);

        if (store.loggedIn) {
            navigate('/');
        }
    };

    return (
        <AuthContainer header="Sign Up">
            <div className="auth-form">
                <div className="form-input-container">
                    <label htmlFor="email">Email</label>
                    <input onBlur={(e) => email.onBlur()} name="email" type="text" placeholder="Email" value={email.value} onChange={(e) => email.onChange(e)} />
                    {email.isDirty && email.errorMessage && <div className="form-error-msg">{email.errorMessage}</div>}
                </div>
                <div className="form-input-container">
                    <label htmlFor="password">Password</label>
                    <input onBlur={(e) => pwd.onBlur()} name="password" type="password" placeholder="Password" value={pwd.value} onChange={(e) => pwd.onChange(e)} />
                    {pwd.isDirty && pwd.errorMessage && <div className="form-error-msg">{pwd.errorMessage}</div>}
                </div>
                <button disabled={!email.inputValid || !pwd.inputValid} className="btn" onClick={handleSubmit}>
                    Sign Up
                </button>
            </div>
            <small>
                <p className="m-1 text-center">
                    Already have an account? <Link to="/login">Log in!</Link>
                </p>
            </small>
            {/* {error !== '' && <small className="text-danger">{error}</small>} */}
        </AuthContainer>
    );
};

export default RegisterPage;
