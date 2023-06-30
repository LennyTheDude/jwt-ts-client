import { FC, useContext, useEffect, useState } from 'react';
import IPage from '../models/IPage';
import AuthContainer from '../components/AuthContainer';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';

const LoginPage: FC<IPage> = (props) => {
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
        await store.login(email, pwd);

        if (store.loggedIn) {
            navigate('/');
        }
    };

    return (
        <AuthContainer header="Log in">
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
            {/* {error !== '' && <small className="text-danger">{error}</small>} */}
        </AuthContainer>
    );
};

export default LoginPage;
