import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trend: 'test'
}

export const trendSlice = createSlice({
    name: 'trend',
    initialState,
    reducers: {
        trendSelector: (state, action) => {
            state.trend = action.payload;
        },

    },
});

export const { trendSelector } = trendSlice.actions;
export default trendSlice.reducer;