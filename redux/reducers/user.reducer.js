import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState:{
        currentUser:null,
        followers:[],
        followings:[],

    },
    reducers:{
        updateUer: (state,action)=>{
            state.currentUser = action.payload;
        },
        updateFollowers: (state, action)=>{
            state.followers = action.payload;
        },
        updateFollowing: (state, action)=>{
            state.followings = action.payload;
        }
    }
})

export const { updateUer, updateFollowers, updateFollowing } = userSlice.actions;
export default userSlice.reducer;