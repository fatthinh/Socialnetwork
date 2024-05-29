import * as httpRequest from '~/utils/httpRequest';
import cookie from 'react-cookies';

export const register = async (email, username, password) => {
    try {
        const res = await httpRequest.post('authentication/register', {
            Email: email,
            Username: username,
            Password: password,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (username, password, rememberMe) => {
    try {
        const res = await httpRequest.post('authentication/login', {
            Username: username,
            Password: password,
            RememberMe: rememberMe,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentuser = async () => {
    try {
        const res = await httpRequest.get('user/GetCurrentUser');

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const uploadAvatar = async (file) => {
    try {
        const formData = new FormData();
        formData.append('MediaFile', file);
        const res = await httpRequest.post('user/UpdateProfileImage', formData, {
            headers: {
                Authorization: `Bearer ${cookie.load('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const searchUsers = async (search) => {
    try {
        const res = await httpRequest.get('user/GetUsersByText', {
            params: {
                search,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getFollowings = async () => {
    try {
        const res = await httpRequest.get(`user/GetFollowings`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
