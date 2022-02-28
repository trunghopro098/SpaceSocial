import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState:{
        dataPost:[],
        listLike:[],

    },
    reducers:{
        updatePostData: (state, action)=>{
            state.dataPost = action.payload;
        },
        updateListlike:(state, action)=>{
            state.listLike = action.payload;
        }

    }
    
})
export const {updatePostData, updateListlike} = postSlice.actions;
export default postSlice.reducer;