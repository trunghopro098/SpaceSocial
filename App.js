import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, LogBox, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabBottomNavigation from './src/components/NavigationBottom/TabBottomNavigation';
import Register from './src/components/StartScreens/Register';
import ScanQrCode from './src/components/StartScreens/ScanQRCode';
import {useSelector} from 'react-redux';
import Splash from './src/components/StartScreens/Splash';
import ChatDetail from './src/components/ScreenComponents/ChatDetail';
import SocketClient from './src/util/SocketClient';
import io from 'socket.io-client';
import { API_URL } from './src/util/config';
import Login from './src/components/StartScreens/Login';
import GettingVideo from './src/components/ComponentVideoCall/GettingVideo';
import ProfileScreen from './src/components/ScreenComponents/ProfileScreen';
import ImgDetail from './src/components/StartScreens/ImgDetail';
import FpsCounter from './src/FpsCounter';
import Post from './src/components/ScreenComponents/Post';

const Stack = createStackNavigator();
const socket = io(API_URL + '/');

function App(){
  const [user, setuser] = useState(false);
  const currentUser = useSelector((value) => value.UserReducer.currentUser)
  
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
  ]);

  useEffect(() => {
    if(currentUser !== null){
      setuser(true);
      console.log(API_URL)
      // Audio('ting.mp3');
      // console.log(currentUser)
    }
  }, [currentUser])
  

  return(
    <NavigationContainer>
      <StatusBar 
      backgroundColor={'white'}
      barStyle={'dark-content'}/>
      {user && <SocketClient socket={socket}/>}
      {/* <View style={{width:"100%",height:50}}>
        <FpsCounter visible={true} />
      </View> */}
      
      <Stack.Navigator
        initialRouteName='splash'
        screenOptions={{ headerShown:false }}
      >
        <Stack.Screen name='videocall' component={GettingVideo} initialParams={{socket:socket}}/>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='profile' component={ProfileScreen} initialParams={{socket:socket}} options={{headerShown:true,headerTitle:'Hồ sơ cá nhân',headerBackTitle:'Trang chủ'}}/>
        <Stack.Screen name='splash' component={Splash}/>
        <Stack.Screen name='home' component={TabBottomNavigation} initialParams={{socket:socket}}/>
        <Stack.Screen name='register' component={Register} options={{headerShown:true,title:"Đăng ký"}}/>
        <Stack.Screen name='scanqr' component={ScanQrCode} options={{headerShown:true,title:"Quét bạn bè"}}/>
        {/* <Stack.Screen name='profilescan' component={ProfileScan} /> */}
        <Stack.Screen name='chatdetail' component={ChatDetail}  initialParams={{socket:socket}}/>
        <Stack.Screen name='imagedetail' component={ImgDetail} />
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
