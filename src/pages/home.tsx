import { useState, useContext, FC, useEffect } from 'react';
import { Context } from '..';
import { IUser } from '../models/IUser';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';

const HomePage: FC = () => {
    const { store } = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!store.loggedIn) {
            navigate('/login');
        }
    }, [store]);

    const getUsers = async () => {
        try {
            const response = await UserService.getUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const logout = async () => {
        await store.logout();
        navigate('/login');
    };

    return (
        <div className="App">
            <h1>{`You are authorized as ${store.user.email}.`}</h1>
            <h2>{store.user.isActivated ? `Your account has been activated.` : 'Please activate your account.'}</h2>
            <button className="btn" onClick={logout}>
                Log Out
            </button>
            <br />
            <br />
            <button className="btn" onClick={() => getUsers()}>
                Get Users List
            </button>
            {users.map((user) => (
                <div key={user.email}>{user.email}</div>
            ))}
        </div>
    );
};

export default HomePage;
