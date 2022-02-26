import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet,LogBox, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabBottomNavigation from './src/components/NavigationBottom/TabBottomNavigation';
import Login from './src/components/StartScreens/Login';
import Register from './src/components/StartScreens/Register';

const Stack = createStackNavigator();

const App = ()=>{
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
  return(
    <NavigationContainer>
      <StatusBar 
      backgroundColor={'#F7F7F7'}
      barStyle={'dark-content'}/>
      <Stack.Navigator
        initialRouteName='login'
        screenOptions={{ headerShown:false }}
      >
        <Stack.Screen name='home' component={TabBottomNavigation} />
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='register' component={Register}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'

  },
});

export default App;
