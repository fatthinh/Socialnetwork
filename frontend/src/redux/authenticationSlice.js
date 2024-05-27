import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'authentication',
    initialState: {},
    reducers: {
        login: (state, action) => {
            sessionStorage.setItem('access-token', action.payload);
        },
        logout: (state) => {
            sessionStorage.removeItem('access-token');
        },
    },
});
