import { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import AuthStore from './store/AuthStore';
import { IState } from './models/IState';
import { BrowserRouter } from 'react-router-dom';

const store = new AuthStore();

export const Context = createContext<IState>({
    store
});

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container!);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
