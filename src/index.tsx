import { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AuthStore from './store/store';
import { IState } from './models/IState';

const store = new AuthStore();

export const Context = createContext<IState>({
    store
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <Context.Provider value={{ store }}>
        <App />
    </Context.Provider>
);
