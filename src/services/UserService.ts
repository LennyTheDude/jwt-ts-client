import { AxiosResponse } from 'axios';
import { $api } from '../http';
import { IUser } from '../interfaces/IUser';

export default class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }
}
