import { createSlice } from "@reduxjs/toolkit";

const messSlice = createSlice({
    name:'messenges',
    initialState:{
        datacall: null,
        listRoom: [],
        currentMessenges: [],
        visibleCall:false,
        idRoomCall:null,
        statusCall: null,
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
        updateVisibleCall: (state, action) => {
            state.visibleCall  =action.payload;
        },
        updateIdRoomCall: (state, action) => {
            state.idRoomCall  =action.payload;
        },
        updateStatusCall : (state,action)=>{
            state.statusCall  =action.payload;
        },

    }
})

export const {updateMessenges, updateListRoom, updateCall, updateVisibleCall, updateIdRoomCall, updateStatusCall}   = messSlice.actions;
export default messSlice.reducer;