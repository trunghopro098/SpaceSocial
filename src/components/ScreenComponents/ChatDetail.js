import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, Alert, SafeAreaView, Platform } from 'react-native'
import React,{useEffect, useRef, useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SetHTTP } from '../../util/SetHTTP';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import { updateIdRoom } from '../../../redux/reducers/user.reducer';
import * as FetchAPI from '../../util/fetchApi';
import { updateIdRoomCall, updateMessenges, updateStatusCall, updateVisibleCall } from '../../../redux/reducers/messenges.reducer';
import { windowW } from '../../util/Dimension';
import { deCode,endCode } from '../../util/crypto';
import moment from 'moment';
import CallTime from '../StartScreens/CallTime';

export default function ChatDetail({route, navigation}) {
    const {currentUser,userOnline} = useSelector(e=>e.UserReducer);
    const {currentMessenges} = useSelector(e=>e.MessengesReducer);
    const idUser = currentUser.idUser;
    const {socket,item} = route.params;
    const {idRoom} = item;
    // const [messenges, setmessenges] = useState([]);
    const [showTool, setshowTool] = useState(true);
    const [text, settext] = useState("")
    const dispatch = useDispatch();
    const [listRevicer, setlistRevicer] = useState([]);
    const [showMess, setshowMess] = useState(false)
    let viewBot = useRef(null);

    useEffect(() => {
      setshowMess(false);
      dispatch(updateIdRoom(idRoom));
      getMessenges();
      getReciver();
    }, [item])

    const getMessenges = async()=>{
        const data = {"idRoom":item.idRoom}
        const res = await FetchAPI.postDataAPI("/messenges/getMessengesByIdRoom", data);
        // console.log(res)
        dispatch(updateMessenges(res.msg));
        setshowMess(true);
    } 
    
    const getReciver = async()=>{
        const data = {"idRoom":idRoom,"idUser":currentUser.idUser};
        const res = await FetchAPI.postDataAPI("/messenges/getReciver",data);
        // console.log(res.msg);
        setlistRevicer(res.msg);
    }


    const sendMess = async()=>{
        if(text!==""){
            const encode_text = endCode(text);
            const data = {"idUser":currentUser.idUser,"idRoom":idRoom,"message":encode_text,"typeMess":0};
            const res = await FetchAPI.postDataAPI("/messenges/addMessenger",data);
            if(res.msg==="Success"){
                console.log("ok");
            }
            socket.emit("chat", {"text":encode_text,"targetId":listRevicer,"idRoom":idRoom,"typeMess":0});
            settext("");
        }
    }

    const handleFile = (text)=>{
        const StringFile = deCode(text);
        const lastIndex = StringFile.lastIndexOf("\\");
        const str = StringFile.substring(lastIndex+1, StringFile.length);
        return str;
    }

    const handleCallVideo = ()=>{
        dispatch(updateStatusCall("calling"));
        dispatch(updateIdRoomCall(idRoom));
        dispatch(updateVisibleCall(true));
        console.log("dang goi")
        navigation.navigate("videocall",{item: item})

        let i = 0;
        listRevicer.map(e=>{
            if(userOnline!==null){
                if(userOnline.find(p=>p.targetId === e.idUser)){
                    i++;
                }
            }
        })
        if(i>0){
            // dispatch(updateStatusCall("calling"));
            // dispatch(updateIdRoomCall(idRoom));
            // dispatch(updateVisibleCall(true));
            // console.log("dang goi")
            navigation.navigate("videocall",{item: item})
        }else{
            Alert.alert("Space Social", "Hiện tại không hoạt động vui lòng gọi lại sau!!"),
            [{
                text:'cancel',
                style:"cancel"
            }]
        } 
    }

    const renderItem = ({item, index})=>{
        // let itemEnd = messenges.length-1;        
        return(
            <SafeAreaView style={styles.itemMess}>
                {/* <View style={idUser === item.sourceId ?styles.you:styles.me} >
                    <Text style={{...styles.text}}>{deCode(item.message)}</Text>
                    <Text>xin chao</Text>
                </View> */}

                {idUser === item.sourceId ? 
                    <View style={styles.me}>
                        <View style={{ marginRight: 5 }}>
                                <Text style={styles.formatday}>{moment(item.create_at).format('dddd')} {moment(item.create_at).format('L')}</Text>
                                <Text style={styles.formatday}>{moment(item.create_at).format('LT')}</Text>
                            </View>
                        {
                            item.typeMess === 0 && <Text style={{...styles.text, backgroundColor: 'blue'}}>{deCode(item.message)}</Text>
                        }
                        {
                            item.typeMess === 1 && 
                                <Image
                                    source={{ uri:SetHTTP(deCode(item.message))}}
                                    resizeMode='cover'
                                    style={{ 
                                        width: windowW*0.6,
                                        height: windowW*0.6,
                                        borderRadius: 5
                                    }}
                                />
                        }
                        {
                            item.typeMess === 2 && 
                            <TouchableOpacity>
                                <Text style={{...styles.text, backgroundColor:'green'}}>{handleFile(item.message)}</Text>
                            </TouchableOpacity> 
                        }
                        {
                        item.typeMess === 3 && 
                        <View style={styles.boxCall}>
                            <Text style={{ color: 'white', marginTop: 15, fontSize: 15}}>Cuộc gọi đi.</Text>
                            <CallTime times={deCode(item.message)}/>
                            <TouchableOpacity style={ styles.CallBack }>
                                <Text style={{ color: 'red',}}>Gọi Lại</Text>
                            </TouchableOpacity>
                        </View>
                        }                                   
                        {
                            item.typeMess === 4 && 
                            <View style={styles.boxCall}>
                            <Text style={{ color: 'white', marginTop: 15, fontSize: 15}}>Bạn đã lỡ cuộc gọi của {item.lastName}.</Text>
                            <CallTime times={deCode(item.message)}/>
                            <TouchableOpacity style={ styles.CallBack }>
                                <Text style={{ color: 'red',}}>Gọi Lại</Text>
                            </TouchableOpacity>
                        </View>
                        }                           
                        
                        
                    </View>:
                    <View style={styles.you}>
                        <View style={styles.avatarAndText}>
                            {index === currentMessenges.length-1 || currentMessenges[index===currentMessenges.length-1 ? 0:index+1].sourceId!==item.sourceId  ?
                                <> 
                                {item.avatar === null ?
                                    <Image 
                                    source={require('../../../assets/img/avatar.jpg')}
                                    style={{ width: 20, height: 20,  marginRight: 5, borderRadius:50 }}
                                    resizeMode='cover'
                                    />:                               
                                    <Image
                                        source={{ uri:SetHTTP(item.avatar)}}
                                        resizeMode='cover'
                                        style={{ width: 20, height: 20,  marginRight: 5, borderRadius: 50 }}
                                    />                                  
                                }
                            </>:<View style={{ marginLeft: 25 }}></View>
                                }
                                {
                                    item.typeMess === 0 && <Text style={{...styles.text, backgroundColor:'green'}}>{deCode(item.message)}</Text>
                                }
                                {
                                    item.typeMess === 1 && 
                                        <Image
                                            source={{ uri:SetHTTP(deCode(item.message))}}
                                            resizeMode='cover'
                                            style={{ 
                                                width: windowW*0.6,
                                                height: windowW*0.6,
                                                borderRadius: 5
                                            }}
                                        />
                                }
                                {
                                    item.typeMess === 2 && 
                                    <TouchableOpacity>
                                        <Text style={{...styles.text, backgroundColor:'green'}}>{handleFile(item.message)}</Text>
                                    </TouchableOpacity> 
                                }
                                    {
                                    item.typeMess === 3 && 
                                    <View style={styles.boxCall}>
                                        <Text style={{ color: 'white', marginTop: 15, fontSize: 15}}>{item.lastName} đã gọi cho bạn.</Text>
                                        <CallTime times={deCode(item.message)}/>
                                        <TouchableOpacity style={ styles.CallBack }>
                                            <Text style={{ color: 'red',}}>Gọi Lại</Text>
                                        </TouchableOpacity>
                                    </View>
                                }                                   
                                {
                                    item.typeMess === 4 && 
                                    <View style={styles.boxCall}>
                                    <Text style={{ color: 'white', marginTop: 15, fontSize: 15}}>Bạn đã lỡ cuộc gọi của {item.lastName}.</Text>
                                    <CallTime times={deCode(item.message)}/>
                                    <TouchableOpacity style={ styles.CallBack }>
                                        <Text style={{ color: 'red',}}>Gọi Lại</Text>
                                    </TouchableOpacity>
                                </View>
                                }                                
                            <View style={{ marginLeft: 5 }}>
                                <Text style={styles.formatday}>{moment(item.create_at).format('dddd')} {moment(item.create_at).format('L')}</Text>
                                <Text style={styles.formatday}>{moment(item.create_at).format('LT')}</Text>
                            </View>
                            
                        </View>       
                    </View>
                }
            </SafeAreaView>
        )
    }


    return (
    <SafeAreaView style={styles.container}>
        <StatusBar 
            backgroundColor={'white'}
            barStyle={'dark-content'}/>
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <TouchableOpacity 
                    onPress={(e)=>{
                        e.preventDefault();
                        if (navigation.canGoBack())
                            navigation.goBack()
                        else
                            navigation.navigate('home')
                    }
                }>
                    <AntDesign name='arrowleft' size={25} color='blue' style={{ marginRight: 10 }}/>
                </TouchableOpacity>
                    {item.type===1 ? 
                    <>
                    {item.avatar === null ?
                        <TouchableOpacity>
                            <Image
                                source={require("../../../assets/img/avatar.jpg")}
                                style={{ width: 40, height: 40, borderRadius:50 }}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>:
                        <TouchableOpacity>
                                <Image
                                    source={{ uri:SetHTTP(item.avatar)}}
                                    resizeMode='cover'
                                    style={{ width: 40, height: 40, borderRadius: 50 }}
                                />
                        </TouchableOpacity>
                    }
                    {userOnline !== null &&
                        <>
                            {userOnline.find(p=>p.targetId===item.idUserToChat) &&
                                <View style={styles.online}/>
                            }
                        </>
                    }
                    </>
                    :
                    <>
                    {item.avatarRoom === null ?
                    <Image 
                       source={require('../../../assets/img/avatar_chat_room.png')}
                       style={{ width: 40, height: 40, borderRadius:50 }}
                       resizeMode='cover'
                     />
                     :
                     <Image
                         source={{ uri:SetHTTP(item.avatarRoom)}}
                         resizeMode='cover'
                         style={{ width: 40, height: 40, borderRadius: 50 }}
                     />
                    }
                    </>
                    }
                {item.nameRoom === null ? 
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginLeft: 10  }}>{item.firstName} {item.lastName}</Text>:
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginLeft: 10  }}>{item.nameRoom}</Text>
                }
            </View>
            <View style={styles.headerRight}>
                <TouchableOpacity>
                        <Ionicons name='call' size={21} color='blue' style={{ marginRight: 13 }}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>{
                        handleCallVideo();
                    }}>
                        <FontAwesome name='video-camera' size={21} color='blue' style={{ marginRight: 13 }}/>
                </TouchableOpacity>
                <TouchableOpacity>
                        <Entypo name='info-with-circle' size={21} color='blue' style={{ marginRight: 13}}/>
                </TouchableOpacity>
                
                
                
            </View>
        </View>
        <View style={styles.contentMess}>
            {showMess ?
                <FlatList
                    data={currentMessenges}
                    renderItem={renderItem}
                    keyExtractor={(_,index)=>index.toString()}
                    ref={e=>viewBot=e}
                    onContentSizeChange={() => viewBot.scrollToEnd({animated: true})}
                    onLayout={() => viewBot.scrollToEnd({animated: true})}
                    initialNumToRender={currentMessenges.length}
                />
                :
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>Đang tải tin nhắn, vui lòng đợi...</Text>
                </View>
            }
        </View>
        <View style={styles.bottomContentMess}>
            {showTool ?
            <>
                <TouchableOpacity>
                    <AntDesign name='appstore-o' size={21} color='#0083E1'/>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft:5 }}>
                    <FontAwesome name='file-picture-o' size={19} color='#0083E1'/>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft:5, marginRight:3}}>
                    <Entypo name='image' size={23} color='#0083E1'/>
                </TouchableOpacity>
            </>
            :
                <TouchableOpacity onPress={()=>{setshowTool(true)}}>
                    <MaterialCommunityIcons name='arrow-right-thin-circle-outline' size={28} color='blue'/>
                </TouchableOpacity>
            }
            <TextInput
                    placeholder='Aa'
                    style={{ 
                        marginHorizontal: 3,
                        width: showTool ? windowW*0.62:windowW*0.75,
                        height:"90%",
                        backgroundColor:'#E9E9E9',
                        borderRadius: 50,
                        paddingHorizontal: 15,
                        textAlignVertical:'center'
                    }}
                    onChangeText={settext}
                    value={text}
                    onPressOut={()=>setshowTool(false)}
            />
            <TouchableOpacity
                style={{ marginLeft:"auto",marginRight:2 }}
                onPress={()=>{
                    sendMess()  
                }}
            >
                <Ionicons name='send' size={29} color='#0083E1' />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        backgroundColor:'white',
        width: "100%",
        height: 60,
        paddingHorizontal: 10,
        shadowColor:Platform.OS === 'ios' ? null : '#000',
        shadowOffset:{
            width: 0,
            height: Platform.OS ? 0 : 2
         },
         shadowOpacity: Platform.OS === 'ios' ? 0:.5,
         shadowRadius : Platform.OS === 'ios' ? 0 : 3,
         elevation: Platform.OS === 'ios' ? 0 : 3,
         flexDirection:'row',
         justifyContent:'space-between',
         alignContent:'center',
         alignItems:'center'
    },
    headerLeft:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'

    },
    headerRight:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignContent:'center',
        alignItems:'center'
    },
    contentMess:{
        flex: 1,
        flexDirection: 'column-reverse',
        alignContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },

    itemMess:{
        width: windowW,
        marginBottom: 5,
        paddingHorizontal: 10
    },
    you:{
        width:'100%',
        flexDirection:'column',

    },

    me:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
    },

    bottomContentMess:{
        width: '100%',
        height: 45,
        backgroundColor:'white',
        bottom: 0,
        flexDirection:'row',
        alignContent: 'center',
        alignItems:'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10
    },
    text:{
        fontSize:16,
        maxWidth: windowW*0.58,
        borderRadius: 10,
        padding: 10,
        color:'white'
    },
    avatarAndText:{
        width: '100%',
        flexDirection:'row',
        justifyContent: 'flex-start',

    },
    formatday:{
        fontSize: 8,
        color:'gray',
    },
    boxCall:{
        width: windowW*0.50,
        height: 110,
        backgroundColor: 'black',
        borderRadius:10, 
        flexDirection:'column',
        alignContent:'center',
        alignItems:'center'
    },
    CallBack:{
        width: 70,
        height: 40,
        backgroundColor: 'white',
        marginTop: 8,
        borderRadius: 10,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    online:{
        width:10,
        height:10,
        borderRadius:20,
        backgroundColor:'green',
        position:'absolute',
        bottom:0,
        left:68
    }
})