import * as httpRequest from '~/utils/httpRequest';
export const addLike = async (postId) => {
    try {
        const res = await httpRequest.post(`like/LikePost/?postId=${postId}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const unLike = async (postId) => {
    try {
        const res = await httpRequest.post(`like/UnlikePost/?postId=${postId}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const checkLiked = async (postId) => {
    try {
        const res = await httpRequest.get(`like/UserLikedPost/?postId=${postId}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};
