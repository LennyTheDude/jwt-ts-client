import { observer } from 'mobx-react-lite';
import { useContext, FC, useEffect } from 'react';
import { Context } from '.';
import { Route, Routes } from 'react-router-dom';
import routes from './config/routes';
import PageLayout from './components/PageLayout';

const App: FC = () => {
    const { store } = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.checkAuth();
        }
    }, [store]);

    if (store.isLoading) {
        return (
            <div>
                <h1>Loading, please wait</h1>
            </div>
        );
    }

    return (
        <div>
            <Context.Provider value={{ store }}>
                <Routes>
                    <Route element={<PageLayout />}>
                        {routes.map((route, index) => {
                            return <Route key={index} path={route.path} Component={route.component} />;
                        })}
                    </Route>
                </Routes>
            </Context.Provider>
        </div>
    );
};

export default observer(App);
