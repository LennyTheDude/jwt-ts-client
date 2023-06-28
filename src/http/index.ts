import axios from 'axios';
import { IAuthResponse } from '../models/IAuthResponse';
import { API_URL } from '../config/env';

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post<IAuthResponse>(`${API_URL}/auth/refresh`, { refreshToken: refreshToken });
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return $api.request(originalRequest);
            } catch (e) {
                console.log('Unauthorized');
            }
        }
        throw error;
    }
);
