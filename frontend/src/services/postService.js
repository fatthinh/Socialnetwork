import * as httpRequest from '~/utils/httpRequest';
const accessToken = sessionStorage.getItem('access-token');

export const load = async () => {
    try {
        const res = await httpRequest.get('post/GetAllPosts', {});
        const posts = await Promise.all(
            res.map(async (item) => {
                const likes = await getPostLikeCount(item.id);
                return {
                    ...item,
                    likes: likes,
                };
            }),
        );

        return posts;
    } catch (error) {
        console.log(error);
    }
};

export const getPostLikeCount = async (postId) => {
    try {
        const res = await httpRequest.get(`like/GetPostLikeCount/?postId=${postId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getPostComments = async (postId) => {
    try {
        const res = await httpRequest.get(`post/GetCommentsOfPost/?postId=${postId}`, {});
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addPostComment = async (postId, text) => {
    try {
        const res = await httpRequest.post(
            `post/AddComment`,
            {
                postId: postId,
                text: text,
            },
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

export const addNewPost = async (caption, file) => {
    try {
        const formData = new FormData();
        formData.append('Description', caption);
        formData.append('MediaFile', file);

        const res = await httpRequest.post(`post/CreatePost`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getMyPosts = async () => {
    try {
        const res = await httpRequest.get(`post/GetAllPostsOfUser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteMyPost = async (postId) => {
    try {
        const res = await httpRequest.remove(`post/DeletePost/?postId=${postId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const editMyPost = async (postId, description) => {
    try {
        const res = await httpRequest.put(
            `post/EditPost/?postId=${postId}`,
            {
                Description: description,
            },
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
