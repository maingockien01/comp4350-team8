import { getTokenFromCookie } from './CookieFunctions';
import axios from 'axios';

export const makeAuthRequest = (url: string, method = 'GET', body: any = {}, headers = {}) => {
	const access_token = getTokenFromCookie();
	if (access_token === undefined) {
		throw new Error('Unauthorized');
	}

	return axios.request({
		url: url,
		method: method,
		data: body,
		headers: {
			Authorization: `Bearer ${access_token}`,
			...headers,
		},
	});
};
