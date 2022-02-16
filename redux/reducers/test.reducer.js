import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
    name:'test',
    initialState:{
        tests:[],
    },
    reducers:{
        test:(state,action)=>{
            state.tests = action.payload;
        }
    }
})

export const {test} = testSlice.actions;
export default testSlice.reducer;