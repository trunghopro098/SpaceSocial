import {createSlice} from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'post',
    initialState:{
        dataNotification:[],
        quantityNotificationUnread:0
    },
    reducers:{
        updateDataNotification: (state,action)=>{
            state.dataNotification = action.payload;
        },
        updateQuantityUnread: (state,action)=>{
            state.quantityNotificationUnread = action.payload;
        }
    }
})
export const {updateDataNotification,updateQuantityUnread} = notificationSlice.actions;

export default notificationSlice.reducer;