import { FC, useContext, useEffect, useState } from 'react';
import IPage from '../models/IPage';
import AuthContainer from '../components/AuthContainer';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';

const RegisterPage: FC<IPage> = (props) => {
    const [email, setEmail] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.loggedIn) {
            navigate('/');
        }
    }, [store]);

    const handleSubmit = async () => {
        await store.signUp(email, pwd);

        if (store.loggedIn) {
            navigate('/');
        }
    };

    return (
        <AuthContainer header="Sign Up">
            <div className="auth-form">
                <div className="form-input-container">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-input-container">
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                </div>
                <button className="btn" onClick={handleSubmit}>
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
