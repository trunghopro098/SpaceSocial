import React from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-get-random-values';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';

import store from './redux/store';

export default function Register(){
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Register);
