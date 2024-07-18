import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    author: '',
    username: '',
    content: '',
    creationDate: ''
};

export const tweetSlice = createSlice({
    name: 'tweet',

    initialState,
    reducers: {
        AddToTweetList: (state, action) => {
            console.log("action", action.payload)

            for (let i = 0; i > action.payload.length; i++) {

                state.value.push({ author: action.payload[i].author, username: action.payload[i].username, content: action.payload[i].content, creationDate: action.payload[i].creationDate });
            }

        },

    },
});

export const { AddToTweetList } = tweetSlice.actions;
export default tweetSlice.reducer;