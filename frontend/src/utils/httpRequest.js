import axios from 'axios';
import cookie from 'react-cookies';

const httpRequest = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: 'https://localhost:7173/api',
});

export const get = async (
    path,
    options = {
        headers: {
            Authorization: `Bearer ${cookie.load('token')}`,
        },
    },
) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (
    path,
    data,
    options = {
        headers: {
            Authorization: `Bearer ${cookie.load('token')}`,
        },
    },
) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export const remove = async (
    path,
    options = {
        headers: {
            Authorization: `Bearer ${cookie.load('token')}`,
        },
    },
) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export const put = async (
    path,
    data,
    options = {
        headers: {
            Authorization: `Bearer ${cookie.load('token')}`,
        },
    },
) => {
    const response = await httpRequest.put(path, data, options);
    return response.data;
};

export default httpRequest;
