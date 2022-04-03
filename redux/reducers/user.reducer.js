import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState:{
        currentUser:null,
        followers:[],
        followings:[],
        currentIdRoom:null,
        userOnline:[],
        dataFriend:[],
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
        },
        updateIdRoom: (state,action)=>{
            state.currentIdRoom = action.payload;
        },
        updateUserOnline : (state,action)=>{
            state.userOnline = action.payload;
        },
        updateDataFriend : (state,action)=>{
            state.dataFriend = action.payload;
        }
    }
})

export const { updateUer, updateFollowers, updateFollowing, updateIdRoom, updateUserOnline, updateDataFriend  } = userSlice.actions;
export default userSlice.reducer;