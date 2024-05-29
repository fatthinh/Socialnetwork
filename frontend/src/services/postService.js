import { convertDate } from '~/utils';
import * as httpRequest from '~/utils/httpRequest';
import cookie from 'react-cookies';

export const load = async () => {
    try {
        const res = await httpRequest.get('post/GetAllPosts');
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

export const loadPostsManagement = async (page, state) => {
    try {
        const startDate = convertDate(state.startDate);
        const endDate = convertDate(state.endDate);

        const res = await httpRequest.get('Admin/PostManagement', {
            params: {
                page,
                startDate,
                endDate,
            },
            headers: {
                Authorization: `Bearer ${cookie.load('token')}`,
            },
        });
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

export const loadDashboard = async () => {
    try {
        const res = await httpRequest.get('Admin/Dashboard');

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getPostById = async (postId) => {
    try {
        const res = await httpRequest.get(`post/GetPostById/?postId=${postId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getPostLikeCount = async (postId) => {
    try {
        const res = await httpRequest.get(`like/GetPostLikeCount/?postId=${postId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getPostComments = async (postId) => {
    try {
        const res = await httpRequest.get(`post/GetCommentsOfPost/?postId=${postId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addPostComment = async (postId, text) => {
    try {
        const res = await httpRequest.post(`post/AddComment`, {
            postId: postId,
            text: text,
        });
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
                Authorization: `Bearer ${cookie.load('token')}`,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getMyPosts = async () => {
    try {
        const res = await httpRequest.get(`post/GetAllPostsOfUser`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getMyBookmarkedPosts = async () => {
    try {
        const res = await httpRequest.get('bookmark/GetPostIdsBookmarked');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const checkBookmarked = async (postId) => {
    try {
        const res = await httpRequest.get(`bookmark/UserBookmarkedPost/?postId=${postId}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addBookmark = async (postId) => {
    try {
        const res = await httpRequest.post(`bookmark/BookmarkPost/?postId=${postId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const unBookmark = async (postId) => {
    try {
        const res = await httpRequest.post(`bookmark/UnbookmarkPost/?postId=${postId}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteMyPost = async (postId) => {
    try {
        const res = await httpRequest.remove(`post/DeletePost/?postId=${postId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const editMyPost = async (postId, description) => {
    try {
        const res = await httpRequest.put(`post/EditPost/?postId=${postId}`, {
            Description: description,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
