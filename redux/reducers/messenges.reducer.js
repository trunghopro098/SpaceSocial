import { createSlice } from "@reduxjs/toolkit";

const messSlice = createSlice({
    name:'messenges',
    initialState:{
        datacall: null,
        listRoom: [],
        currentMessenges: [],
    },
    reducers:{
        updateMessenges: (state, action)=>{
            state.currentMessenges = action.payload;
        },
        updateListRoom: (state, action) => {
            state.listRoom = action.payload;
        },
        updateCall: (state, action) => {
            state.datacall  =action.payload;
        },
    }
})

export const {updateMessenges, updateListRoom, updateCall} = messSlice.actions;
export default messSlice.reducer;