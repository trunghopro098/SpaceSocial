import React, { useState } from 'react';
import {View, Text, StyleSheet,Dimensions,StatusBar,Badge} from 'react-native';
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import AddPostScreen from './AddPostScreen';
import NotificationScreen from './NotificationScreen';
import AcountScreen from './AcountScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';
import ProfileScreen from '../ScreenComponents/ProfileScreen';
import * as GETAPI from '../../util/fetchApi';
import { updateDataNotification,updateQuantityUnread } from '../../../redux/reducers/notification.reducer';
import {useDispatch, useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

export default function TabBottomNavigation({route, navigation}) {
    const {currentUser} = useSelector(e => e.UserReducer);
    const {quantityNotificationUnread,dataNotification} = useSelector(e=>e.NotificationReducer);
    const dispatch = useDispatch();
    const {socket} = route.params;


    React.useEffect(()=>{
        if(currentUser != null){
        getDataNotify()
        }
    },[currentUser])

    //Update quantity undread
    React.useEffect(() => {
        let i = 0;
        dataNotification.map(e=>{
            if(e.read===0){
                i++
            }
        })
        dispatch(updateQuantityUnread(i));
    },[dataNotification])


    const getDataNotify = async()=>{
        const data = {"idUser":currentUser.idUser};
        const res = await GETAPI.postDataAPI("/notification/getNotification",data);
        dispatch(updateDataNotification(res.msg));
    } 
    return (
    <View style={styles.container}>
        <StatusBar 
            backgroundColor="rgb(240, 240, 240)"
            barStyle="dark-content"
        />
        <Tab.Navigator
            screenOptions={{ 
                headerShown:false,
                tabBarShowLabel:false,
                tabBarStyle:{
                    position:'absolute',
                    backgroundColor:'white',
                    borderTopLeftRadius:16,
                    borderTopRightRadius:16,
                    borderTopWidth:1,
                    elevation:6,
                    borderTopColor: 'white',
                }

             }}
        >
            <Tab.Screen name='Home' component={HomeScreen} initialParams={{socket: socket}}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                    colors={['red','#8A0000','#7471EF','#7471EF']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <FontAwesome name="home" size={22} color={'white'}/>
                                </LinearGradient>
                                <LinearTextGradient
                                        locations={[0,1]}
                                        colors={['red','blue']}
                                        start={{ x:0,y:0 }}
                                        end={{ x:1, y:0 }}
                                        style={{marginBottom: 15 }}
                                    >
                                        <Text style={{ fontSize : 12 }}>Trang Chủ</Text>
                                </LinearTextGradient>
                                
                            </>:
                            <Ionicons name="home-outline" size={22}/>
                            }
                            
                        </View>
                    )
                }}
            />
            <Tab.Screen name='Chat' component={ChatScreen}
                 options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                    colors={['red','#8A0000','#7471EF','#7471EF']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <Ionicons name="chatbubble-ellipses" size={22} color={'white'}/>
                                </LinearGradient>
                                <LinearTextGradient
                                        locations={[0,1]}
                                        colors={['red','blue']}
                                        start={{ x:0,y:0 }}
                                        end={{ x:1, y:0 }}
                                        style={{marginBottom: 15 }}
                                    >
                                        <Text style={{ fontSize : 12 }}>Nhắn Tin</Text>
                                </LinearTextGradient>
                            </>:
                            <Ionicons name="chatbubble-ellipses-outline" size={22} />
                            }
                            
                        </View>
                    )
                }}
            />
            <Tab.Screen name='Addpost' component={AddPostScreen}
                 options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                    colors={['red','#8A0000','#7471EF','#7471EF']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <AntDesign name="pluscircle" size={22} color={'white'}/>
                                </LinearGradient>
                                <LinearTextGradient
                                        locations={[0,1]}
                                        colors={['red','blue']}
                                        start={{ x:0,y:0 }}
                                        end={{ x:1, y:0 }}
                                        style={{marginBottom: 15 }}
                                    >
                                        <Text style={{ fontSize : 12 }}>Đăng Bài</Text>
                                </LinearTextGradient>
                            </>:
                            <AntDesign name="pluscircleo" size={22} />
                            }
                            
                        </View>
                    )
                }}
            />
            <Tab.Screen name='Notification' component={NotificationScreen}
                 options={{
                    tabBarIcon: ({focused})=>{
                        return(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                     colors={['red','#8A0000','#7471EF','#7471EF']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <Ionicons name="notifications" size={22} color={'white'}/>
                                </LinearGradient>
                                <LinearTextGradient
                                        locations={[0,1]}
                                        colors={['red','blue']}
                                        start={{ x:0,y:0 }}
                                        end={{ x:1, y:0 }}
                                        style={{marginBottom: 15 }}
                                    >
                                        <Text style={{ fontSize : 12 }}>Thông Báo</Text>
                                </LinearTextGradient>
                            </>:
                            <View
                                style={{
                                    position:'relative'
                                }}
                            >
                                <Ionicons name="notifications-outline" size={22} />
                                {quantityNotificationUnread > 0 &&
                                <View 
                                    style={{
                                        backgroundColor:'red',
                                        borderRadius:15,
                                        padding:2,
                                        width:20,
                                        height:20,
                                        position:'absolute',
                                        right:-5,
                                        top: -10
                                    }}
                                >
                                    <Text style={{textAlign:'center',color:'white'}}>{quantityNotificationUnread}</Text>
                                </View>
                                }
                            </View> 
                            }
                            
                        </View>
                        )
                    },
                    // tabBarBadge: quantityNotificationUnread 
                }}
            />
            <Tab.Screen name='Acount' component={AcountScreen}
                 options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                    colors={['red','#8A0000','#7471EF','#7471EF']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <FontAwesome name="user" size={22} color={'white'}/>
                                </LinearGradient>
                                <LinearTextGradient
                                        locations={[0,1]}
                                        colors={['red','blue']}
                                        start={{ x:0,y:0 }}
                                        end={{ x:1, y:0 }}
                                        style={{marginBottom: 15 }}
                                    >
                                        <Text style={{ fontSize : 12 }}>Tài Khoản</Text>
                                </LinearTextGradient>
                            </>:
                            <FontAwesome name="user-o" size={22} />
                            }
                        </View>
                    )
                }}
                initialParams={{socket:socket}}
            />

        </Tab.Navigator>
    </View>
  )
}
const widthW = Dimensions.get('window').width;
const heightH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    shadow:{
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowColor:'#000',
        shadowOpacity:0.45,
        shadowRadius:5,
        elevation:3,
    },
    tabarIcon:{
        alignItems:'center',
        justifyContent:'center',
        top:3,
    },
    focus:{
        // backgroundColor:'#7471EF',
        width: 35,
        height: 35,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 50,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:10 ,
        },
        shadowOpacity:0.6,
        shadowRadius:4,
        elevation:7,
        bottom:8,


    }

})