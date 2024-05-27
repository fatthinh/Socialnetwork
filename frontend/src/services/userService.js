import * as httpRequest from '~/utils/httpRequest';

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
        const accessToken = sessionStorage.getItem('access-token');
        const res = await httpRequest.get('user/GetCurrentUser', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};
