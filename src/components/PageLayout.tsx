import { FC, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Context } from '..';

const PageLayout: FC = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    const logout = async () => {
        await store.logout();
        navigate('/login');
    };

    return (
        <div className="layout">
            <div className="header">
                <div className="header-container">
                    <div className="header-logo" onClick={() => navigate('/')}>
                        JWT Auth
                    </div>
                    <div className="header-nav">
                        <a href="/about" className="header-nav-item">
                            About
                        </a>
                        {store.loggedIn && (
                            <a href="" onClick={logout} className="header-nav-item">
                                Log Out
                            </a>
                        )}
                        {!store.loggedIn && (
                            <a href="/login" className="header-nav-item">
                                Log In
                            </a>
                        )}
                        {!store.loggedIn && (
                            <a href="/register" className="header-nav-item">
                                Sign Up
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <div className="main">
                <Outlet />
            </div>
            <div className="footer"></div>
        </div>
    );
};

export default PageLayout;
