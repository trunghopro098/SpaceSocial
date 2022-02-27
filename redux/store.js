import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TestReducer, UserReducer } from './reducers';

const rootReducer = combineReducers({
    TestReducer,
    UserReducer
});


const store = configureStore({
    reducer:rootReducer
})

export default store;