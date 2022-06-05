import React, {useEffect,useRef,useState} from "react";
import {View,StyleSheet, StatusBar, Text, Image, TouchableOpacity} from 'react-native';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';
import Peer from "simple-peer";
import { windowH, windowW } from "../../util/Dimension";
import { SetHTTP } from '../../util/SetHTTP';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import { updateIdRoomCall, updateMessenges, updateStatusCall, updateVisibleCall } from '../../../redux/reducers/messenges.reducer';
import * as FetchAPI from '../../util/fetchApi';

// const Peer = require('simple-peer');
function GettingVideo({route, navigation}){
    const {currentUser} = useSelector(e=>e.UserReducer);
    const {socket,item} = route.params;
    const connectionRef = useRef();
    const [Camera, setCamera] = useState(false);
    const [myStream, setmyStream] = useState();
    const [streamUser, setstreamUser] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [statusCalling, setstatusCalling] = useState(false);
    const [receivingCall,setReceivingCall] = useState(false);
    const [userToCall,setuserToCall] = useState("");
    const [ caller, setCaller ] = useState("");
    const [ name, setName ] = useState("");
    const [ callerSignal, setCallerSignal ] = useState();
    const dispatch = useDispatch();
    const {datacall,idRoomCall,statusCall,visibleCall} = useSelector(e=>e.MessengesReducer);
   
    // console.log(item);
    let isFront = true;
    // useEffect(() => {
    //     setMyVideo();
    // }, [])

    //Run calling
    useEffect(()=>{
        if(visibleCall){
            if(statusCall==="calling"){
                setstatusCalling(true);
                if(!statusCalling){
                    callUser();
                }
                socket.on("user-left-call",async(data)=>{
                    if(callAccepted===false){
                        if(data.positionSocket===0){
                            // await sendMessCall();
                        }
                        // audioPhoneHangUpRef.current.play();
                        setrejectCall(true);
                        setstatusCalling(false);
                    }else{
                        leaveCall();
                    }
                })
            }
        }
        return ()=>{
            socket.off("user-left-call")
        }
    },[visibleCall,statusCall,callAccepted]);

    const leaveCall = async() => {
      // await sendMessCall();
      connectionRef.current.destroy();
    }



    const callUser = async() => {
      const data = {"idRoom":idRoomCall,"idUser":currentUser.idUser};
      const res = await FetchAPI.postDataAPI("/messenges/getReciver",data);
      const idTocall = res.msg;
      mediaDevices.enumerateDevices().then(sourceInfos => {
        // console.log(sourceInfos)
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if(sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
            videoSourceId = sourceInfo.deviceId;
          }
        }
        mediaDevices.getUserMedia({
          audio: true,
          video: {
            frameRate: 30,
            facingMode: (isFront ? "user" : {exact:"environment"}),
            deviceId: videoSourceId
          }
        })
        .then(stream => {
              setmyStream(stream);
              const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream,
                config: {
                  iceServers: [
                    {
                      urls: "stun:numb.viagenie.ca",
                      credential: "128Dat128",
                      username: "kennavi281@gmail.com",
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        credential: "128Dat128",
                        username: "kennavi281@gmail.com",
                    },
                    // { urls: 'stun:stun.l.google.com:19302' }, 
                    // { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }
                  ],
                },
                wrtc: {
                  RTCPeerConnection,
                  RTCIceCandidate,
                  RTCSessionDescription,
                  RTCView,
                  MediaStream,
                  MediaStreamTrack,
                  mediaDevices,
                  registerGlobals
                },
              })
          
                peer._debug = console.log;
                peer.on("signal", (data) => {
                    socket.emit("callUser", {
                        userToCall: idTocall,
                        signalData: data,
                        from: currentUser.idUser,
                        idRoom: idRoomCall,
                        name: currentUser.firstName+" "+currentUser.lastName
                    })
                })
                peer.on("stream", (stream) => {
                    console.log("hello")
                    setstreamUser(stream)
                    // if(videoUserRef.current){
                    //     videoUserRef.current.srcObject = stream
                    // }
                })
                peer.on('close',() => {
                    handleInit();
                });
                socket.on("callAccepted", (signal) => {
                    setCallAccepted(true)
                    // myVideoRef.current.srcObject = stream;
                    peer.signal(signal);
                    // setstatusCalling(false);
                })
                socket.on("rejectCall", (data)=>{
                    if(data==="reject"){
                        // audioPhoneHangUpRef.current.play();
                        // setrejectCall(true);
                        // setstatusCalling(false);
                    }
                })
                connectionRef.current = peer

          
          })
          .catch(error => {
              console.log("loi roi", error)
          });
        });  
	  }

    // const setMyVideo = async()=>{
    //     mediaDevices.enumerateDevices().then(sourceInfos => {
    //         console.log(sourceInfos)
    //         let videoSourceId;
    //         for (let i = 0; i < sourceInfos.length; i++) {
    //           const sourceInfo = sourceInfos[i];
    //           if(sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
    //             videoSourceId = sourceInfo.deviceId;
    //           }
    //         }

    //         mediaDevices.getUserMedia({
    //           audio: true,
    //           video: {
    //             // width: 640,
    //             // height: 480,
    //             frameRate: 30,
    //             facingMode: (isFront ? "user" : {exact:"environment"}),
    //             deviceId: videoSourceId
    //           }
    //         })
    //         .then(stream => {
    //           // Got stream!
    //             setmyStream(stream)
    //         })
    //         .catch(error => {
    //             console.log("loi roi", error)
    //         });
    //       });  
    // } 

    //Return to default state
    const handleInit = async()=>{
      // audioPhoneHangUpRef.current.play();
      dispatch(updateIdRoomCall(null));
      dispatch(updateStatusCall(null));
      dispatch(updateVisibleCall(false));
      setReceivingCall(false);
      setCallAccepted(false);
      setCaller("");
      setName("");
      setCallerSignal();
      // setmoveMyvideo(false);
      setuserToCall();
      // settotalTime(0);
      navigation.goBack();
    }
    
    return(
        <View style={{ flex:1}}>
            <StatusBar 
              backgroundColor={'white'}
              barStyle={'dark-content'}/>
              <View style={{position:'relative'}}>
                <View>
                  {myStream !==undefined && callAccepted &&
                    <RTCView objectFit="cover" style={styles.rtcView} streamURL={myStream.toURL()} />
                  }
                </View>
                <View>
                  {streamUser !==undefined &&
                    <RTCView style={styles.rtcViewUser} streamURL={streamUser.toURL()} />
                  }
                </View>
              </View>
                {
                  !callAccepted && 
                  <View style = {styles.call_wait_accept}>
                      <View style={styles.Wrap_Call}>
                      
                        {item.avatar === null ?                          
                              <Image 
                              source={require('../../../assets/img/avatar.jpg')}
                              style={{ width: 80, height: 80, borderRadius:50 }}
                              resizeMode='cover'
                              />:             
                                <Image
                                    source={{ uri:SetHTTP(item.avatar)}}
                                    resizeMode='cover'
                                    style={{ width: 80, height: 80, borderRadius: 50 }}
                                  />
  
                            }
                            <View style={{ flexDirection:'row',  marginTop: 20, marginBottom: windowH*0.3 }}>
                                <Text style={{ color:'blue', fontWeight:'bold', fontSize:18 }}>Đang gọi : </Text>
                                <Text style={{ color:'black', fontWeight:'bold', fontSize:18 }}>{item.lastName} {item.firstName}</Text>
                            </View>
                          <TouchableOpacity
                               style={styles.btn_cancel}
                               onPress={()=>{
                                 handleInit();
                               }}>
                                <Ionicons name='call' size={30} color='white'/>
                          </TouchableOpacity>
                      </View>
                  </View>
                } 

        </View>
    )
}
// Later on in your styles..
var styles = StyleSheet.create({
    rtcView: {
      width:windowW*0.5,
      height:windowH*0.3,
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      zIndex:1,
    //   backgroundColor:'red'
    },
    rtcViewUser:{
      width:windowW,
      height:windowH,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left:0,
      zIndex:-1
    },
    call_wait_accept:{
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignContent:'center',
      alignItems:'center',
      
    },
    Wrap_Call:{
      marginHorizontal : 20,
      marginTop: 30,
      marginBottom: 40,
      // marginVertical: 40,
      width: windowW-40,
      height: windowH-70,
      shadowColor:'#000',
      shadowOffset:{
        width: 2,
        height: 2,
      },
      shadowOpacity: .3,
      shadowRadius: 4,
      elevation: 4,
      // backgroundColor:'red',
      borderRadius: 8,
      justifyContent:'center',
      flexDirection:'column',
      alignContent:'center',
      alignItems:'center'
    },
    btn_cancel:{
      width: 60,
      height: 60,
      backgroundColor:'red',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      borderRadius:50
    }
  });
export default GettingVideo;