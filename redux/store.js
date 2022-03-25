import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TestReducer, UserReducer, PostReducer, MessengesReducer } from './reducers';

const rootReducer = combineReducers({
    TestReducer,
    UserReducer,
    PostReducer,
    MessengesReducer,


});


const store = configureStore({
    reducer:rootReducer
})

export default store;