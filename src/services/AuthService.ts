import { AxiosResponse } from 'axios';
import { $api } from '../http';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {email, password});
    }

    static async signup(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/signup', {email, password});
    }

    static async logout(refreshToken: string | null): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/auth/logout', { refreshToken });
    }
}