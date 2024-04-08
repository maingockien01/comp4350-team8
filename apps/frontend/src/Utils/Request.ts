import {getTokenFromCookie} from './CookieFunctions';
import axios from 'axios';

export const makeAuthRequest = (
    url: string,
    method = 'GET',
    body: any = {},
    headers = {},
) => {
  const accessToken = getTokenFromCookie();
  if (accessToken === undefined) {
    throw new Error('Unauthorized');
  }

  return axios.request({
    url: url,
    method: method,
    data: body,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
  });
};
