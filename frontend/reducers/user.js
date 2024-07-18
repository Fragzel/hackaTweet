import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isConnected: false,
    token: '',
    username: '',
    firstname: '',
    image: ''
};

export const userSlice = createSlice({
    name: 'user',

    initialState,
    reducers: {
        login: (state, action) => {
            state.isConnected = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.firstname = action.payload.firstname;
            state.image = action.payload.image;
        },
        logout: (state, action) => {
            state.isConnected = false;
            state.token = "";
            state.username = "";
            state.firstname = "";
            state.image = "";
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;