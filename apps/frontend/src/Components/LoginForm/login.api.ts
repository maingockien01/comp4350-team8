import axios from 'axios';
import { LogInResDto } from '@team8/types/dtos/auth/login.dto';

export const login = (username: string, password: string) => {
    return axios.post('rest-api/auth/login', { username, password })
    .then((response): LogInResDto => {
        return response.data;
    })
};