import React from 'react';
import {View, Text, StyleSheet,Dimensions,StatusBar} from 'react-native';
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

const Tab = createBottomTabNavigator();

export default function TabBottomNavigation() {
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
            <Tab.Screen name='Home' component={HomeScreen}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                    colors={['#a1def5','#7471EF','#7471EF','#9966CB']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <FontAwesome name="home" size={22} color={'white'}/>
                                </LinearGradient>
                                <Text style={{ color : focused ? '#7471EF' : '#748c94', fontSize : 12, bottom:10}}>HOME</Text>
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
                                    colors={['#a1def5','#7471EF','#7471EF','#9966CB']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <Ionicons name="chatbubble-ellipses" size={22} color={'white'}/>
                                </LinearGradient>
                                <Text style={{ color : focused ? '#7471EF' : '#748c94', fontSize : 12, bottom:10}}>CHAT</Text>
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
                                    colors={['#a1def5','#7471EF','#7471EF','#9966CB']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <AntDesign name="pluscircle" size={22} color={'white'}/>
                                </LinearGradient>
                                <Text style={{ color : focused ? '#7471EF' : '#748c94', fontSize : 12, bottom:10}}>ADD POST</Text>
                            </>:
                            <AntDesign name="pluscircleo" size={22} />
                            }
                            
                        </View>
                    )
                }}
            />
            <Tab.Screen name='Notification' component={NotificationScreen}
                 options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                     colors={['#a1def5','#7471EF','#7471EF','#9966CB']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <Ionicons name="notifications" size={22} color={'white'}/>
                                </LinearGradient>
                                <Text style={{ color : focused ? '#7471EF' : '#748c94', fontSize : 12, bottom:10}}>NOTIFY</Text>
                            </>:
                            <Ionicons name="notifications-outline" size={22} />
                            }
                            
                        </View>
                    )
                }}
            />
            <Tab.Screen name='Acount' component={AcountScreen}
                 options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{ alignItems : "center", justifyContent : "center",top:3}}>
                            {focused ? <>
                                <LinearGradient 
                                    colors={['#a1def5','#7471EF','#7471EF','#9966CB']}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                    style={ focused ? styles.focus : null }>
                                    <FontAwesome name="user" size={22} color={'white'}/>
                                </LinearGradient>
                                <Text style={{ color : focused ? '#7471EF' : '#748c94', fontSize : 12, bottom:10}}>ACCOUNT</Text>
                            </>:
                            <FontAwesome name="user-o" size={22} />
                            }
                        </View>
                    )
                }}
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
        bottom:15,


    }

})