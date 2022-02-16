import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TestReducer } from './reducers';

const rootReducer = combineReducers({
    TestReducer
});


const store = configureStore({
    reducer:rootReducer
})

export default store;