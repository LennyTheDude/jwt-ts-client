import { AxiosResponse } from 'axios';
import { $api } from '../http';
import { IAuthResponse } from '../interfaces/IAuthResponse';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/login', { email, password });
    }

    static async signup(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/signup', { email, password });
    }

    static async logout(refreshToken: string | null): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/logout', { refreshToken });
    }
}
