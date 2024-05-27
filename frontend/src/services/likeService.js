import * as httpRequest from '~/utils/httpRequest';
const accessToken = sessionStorage.getItem('access-token');

export const addLike = async (postId) => {
    try {
        const res = await httpRequest.post(
            `like/LikePost/?postId=${postId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const unLike = async (postId) => {
    try {
        const res = await httpRequest.post(
            `like/UnlikePost/?postId=${postId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const checkLiked = async (postId) => {
    try {
        const res = await httpRequest.get(`like/UserLikedPost/?postId=${postId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};
