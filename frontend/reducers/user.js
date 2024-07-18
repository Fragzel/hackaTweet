import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isConnected: false,
    token: '',
    username: ''
};

export const userSlice = createSlice({
    name: 'user',

    initialState,
    reducers: {
        login: (state, action) => {
            state.isConnected = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
        },
        logout: (state, action) => {
            state.isConnected = false;
            state.token = action.payload.token;
            state.username = action.payload.username;
        },
    },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;