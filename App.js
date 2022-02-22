import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { Text, View,StyleSheet,LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabBottomNavigation from './src/components/NavigationBottom/TabBottomNavigation';
const Stack = createStackNavigator();

const App = ()=>{
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
  return(
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='home'
        screenOptions={{ headerShown:false }}
      >
        <Stack.Screen name='home' component={TabBottomNavigation} />

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
