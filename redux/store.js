import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TestReducer, UserReducer, PostReducer } from './reducers';

const rootReducer = combineReducers({
    TestReducer,
    UserReducer,
    PostReducer,
});


const store = configureStore({
    reducer:rootReducer
})

export default store;