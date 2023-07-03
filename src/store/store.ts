import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { IUser } from '../models/IUser';
import { IAuthResponse } from '../models/IAuthResponse';
import AuthService from '../services/AuthService';
import { API_URL } from './../config/env';
import { redirect } from 'react-router-dom';

export default class AuthStore {
    user = {} as IUser;
    loggedIn = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoggedIn(bool: boolean) {
        this.loggedIn = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            this.setLoggedIn(true);
            this.setUser(response.data.user);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async signUp(email: string, password: string) {
        try {
            const response = await AuthService.signup(email, password);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            this.setLoggedIn(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            await AuthService.logout(refreshToken);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.setLoggedIn(false);
            this.setUser({} as IUser);
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post<IAuthResponse>(`${API_URL}/auth/refresh`, { refreshToken: refreshToken });
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            this.setLoggedIn(true);
            this.setUser(response.data.user);
        } catch (e) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return redirect('/login');
        } finally {
            this.setLoading(false);
        }
    }
}
