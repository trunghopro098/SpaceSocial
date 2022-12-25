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
import {useDispatch, useSelector} from 'react-redux';
import { endCode } from '../../util/crypto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { updateIdRoomCall, updateMessenges, updateStatusCall, updateVisibleCall } from '../../../redux/reducers/messenges.reducer';
import * as FetchAPI from '../../util/fetchApi';
import { IP_LOCAL } from "../../util/config";
import CallTime from "../StartScreens/CallTime";
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
    const [ rejectCall, setrejectCall] = useState(false);
    const [missCall, setmissCall] = useState(false);
    const [userToCall,setuserToCall] = useState("");
    const [totalTime, settotalTime] = useState(0);
    const [ caller, setCaller ] = useState("");
    const [ name, setName ] = useState("");
    const [ callerSignal, setCallerSignal ] = useState();
    const dispatch = useDispatch();
    const {datacall,idRoomCall,statusCall,visibleCall} = useSelector(e=>e.MessengesReducer);
   
    // console.log(item);
    let isFront = true;
    useEffect(() => {
        setMyVideo();
    }, [])

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

    //Run called
    useEffect(() => {
      if(visibleCall){
          if(statusCall==="called"){
              console.log("zô")
              if(datacall!==null){
                  if(!callAccepted){
                      setReceivingCall(true);
                      setCaller(datacall.from);
                      setName(datacall.name);
                      setCallerSignal(datacall.signal);
                      // audioPhoneRef.current.play();
                  }
                  if(rejectCall){
                      setrejectCall(false);
                  }
                  if(missCall){
                      setmissCall(false);
                  }
                  socket.on("user-left-call",async(data)=>{
                      if(callAccepted){
                          leaveCall();
                          // if(connectionRef.current){
                              
                          //     // await sendMessCall();
                          //     // connectionRef.current.destroy();
                          //     // handleInit();
                          // }
                      }else{
                          if(data.positionSocket===0){
                              await sendMessCall();
                          }
                          // audioPhoneRef.current.pause();
                          setmissCall(true);
                          setReceivingCall(false);
                      }
                  })
                  
              }
          }
      }
      return ()=>{
          socket.off("user-left-call")
      }
    },[datacall,visibleCall,statusCall,callAccepted])

    //Set time call
    useEffect(() => {
      if(callAccepted){
          setInterval(()=>{
              settotalTime(t=> t+1);
          },1000)
      }
    },[callAccepted])

    const leaveCall = async() => {
      await sendMessCall();
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
                        urls:`stun:${IP_LOCAL}:3478`
                      },
                      {
                        urls: `turn:${IP_LOCAL}:3478`,
                        username: "chien",
                        credential: "123456"
                      }
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
                    console.log(data)
                    if(data==="reject"){
                      console.log("reject")
                      // audioPhoneHangUpRef.current.play();
                      setrejectCall(true);
                      setstatusCalling(false);
                      handleInit();
                    }
                })
                connectionRef.current = peer

          
          })
          .catch(error => {
              console.log("loi roi", error)
          });
        });  
	  }

    const answerCall =() =>  {
      mediaDevices.enumerateDevices().then(sourceInfos => {
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
          setCallAccepted(true);
              const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: stream,
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
                config: {
                    iceServers: [
                      {
                        urls:`stun:${IP_LOCAL}:3478`
                      },
                      {
                        urls: `turn:${IP_LOCAL}:3478`,
                        username: "chien",
                        credential: "123456"
                      }
                    //   {
                    //     urls: "turn:numb.viagenie.ca",
                    //     credential: "muazkh",
                    //     username: "webrtc@live.com",
                    //   },
                    //   { urls: 'stun:stun.l.google.com:19302' }, 
                    //   { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }
                    ],
              },
          })
          // peer._debug = console.log;
          peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
          })

          peer.on("stream", (stream) => {
            setstreamUser(stream)
          })
          peer.on('close',() => {
              handleInit();
          });
          peer.signal(callerSignal);
          connectionRef.current = peer
        })
        .catch(error => {
          console.log("loi roi", error)
        });  
      })
    }

    const handlerejectCall = async()=>{
      await sendMessCall();
      socket.emit("rejectCall", {to: caller});
      handleInit();
    }

    const sendMessCall = async() =>{
      if(statusCall==="calling"&&callAccepted){
          const idCall = await FetchAPI.postDataAPI("/messenges/getReciver", {"idRoom":idRoomCall,"idUser":currentUser.idUser});
          const idTocall = idCall.msg;
          const encode_text = endCode(totalTime.toString());
          const data = {"idUser":currentUser.idUser,"idRoom":idRoomCall,"message":encode_text,"typeMess":3};
          const res = await FetchAPI.postDataAPI("/messenges/addMessenger",data);
          if(res.msg==="Success"){
              console.log("ok");
          }
          socket.emit("chat", {"text":encode_text,"targetId":idTocall,"idRoom":idRoomCall,"typeMess":3});
      }else if(statusCall==="called"&&callAccepted){
          const idCall = await FetchAPI.postDataAPI("/messenges/getReciver", {"idRoom":idRoomCall,"idUser":datacall.from});
          const idTocall = idCall.msg;
          const encode_text = endCode(totalTime.toString());
          const data = {"idUser":datacall.from,"idRoom":idRoomCall,"message":encode_text,"typeMess":3};
          const res = await FetchAPI.postDataAPI("/messenges/addMessenger",data);
          if(res.msg==="Success"){
              console.log("ok");
          }
          socket.emit("chat", {"text":encode_text,"targetId":idTocall,"idRoom":idRoomCall,"typeMess":3});
      }else if(statusCall==="calling"&&!callAccepted){
          const idCall = await FetchAPI.postDataAPI("/messenges/getReciver", {"idRoom":idRoomCall,"idUser":currentUser.idUser});
          const idTocall = idCall.msg;
          const encode_text = endCode(totalTime.toString());
          const data = {"idUser":currentUser.idUser,"idRoom":idRoomCall,"message":encode_text,"typeMess":4};
          const res = await FetchAPI.postDataAPI("/messenges/addMessenger",data);
          if(res.msg==="Success"){
              console.log("ok");
          }
          socket.emit("chat", {"text":encode_text,"targetId":idTocall,"idRoom":idRoomCall,"typeMess":4});
      }else if(statusCall==="called"&&!callAccepted){
          const idCall = await FetchAPI.postDataAPI("/messenges/getReciver", {"idRoom":idRoomCall,"idUser":datacall.from});
          const idTocall = idCall.msg;
          const encode_text = endCode(totalTime.toString());
          const data = {"idUser":datacall.from,"idRoom":idRoomCall,"message":encode_text,"typeMess":4};
          const res = await FetchAPI.postDataAPI("/messenges/addMessenger",data);
          if(res.msg==="Success"){
              console.log("ok");
          }
          socket.emit("chat", {"text":encode_text,"targetId":idTocall,"idRoom":idRoomCall,"typeMess":4});
      }
    }

    const setMyVideo = async()=>{
        mediaDevices.enumerateDevices().then(sourceInfos => {
            console.log(sourceInfos)
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
                // width: 640,
                // height: 480,
                frameRate: 30,
                facingMode: (isFront ? "user" : {exact:"environment"}),
                deviceId: videoSourceId
              }
            })
            .then(stream => {
              // Got stream!
                setmyStream(stream)
            })
            .catch(error => {
                console.log("loi roi", error)
            });
          });  
    } 

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
      setuserToCall();
      settotalTime(0);
      navigation.goBack();
    }
    
    return(
        <View style={{ flex:1}}>
            <StatusBar 
              backgroundColor={'white'}
              barStyle={'dark-content'}/>
              <View style={{position:'relative'}}>
                <View style={styles.wrapperTrackCallTime}>
                    {/* <Text style={{color:'white',textAlign:'center'}}>00:00:00</Text> */}
                    <CallTime times={totalTime}/>
                </View>
                {callAccepted &&
                <>
                <View>
                  {myStream !==undefined &&
                    <RTCView objectFit="cover" style={styles.rtcView} streamURL={myStream.toURL()} />
                  }
                </View>
                <View>
                  {streamUser !==undefined &&
                    <RTCView style={styles.rtcViewUser} streamURL={streamUser.toURL()} />
                  }
                </View>
                <View style={styles.wrapperBtnEndCall}>
                  <TouchableOpacity
                    style={styles.endCall}
                    onPress={leaveCall}
                  >
                    <MaterialIcons style={styles.iconBtnReceivingCall} name="call-end"/>
                    <Text style={styles.txtBtnReceivingCall}>Kết thúc</Text>
                  </TouchableOpacity>
                </View>
                </>
                }
              </View>
              {!callAccepted && statusCalling && 
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
                               onPress={handleInit}
                              >
                                <Ionicons name='call' size={30} color='white'/>
                          </TouchableOpacity>
                      </View>
                  </View>
              }
              <View>
                {receivingCall && !callAccepted ? (
                  <View style={styles.wrapperReceivingCall}>
                    <Image source={require('../../../assets/img/phone-call.gif')} style={{width:300,height:300}}/>
                    
                    <Text style={styles.calledText}>{name} đang gọi...</Text>
                    <View style={styles.groupBtnReceivingCall}>
                        <View >
                          <TouchableOpacity 
                            style={styles.rejectCall}
                            onPress={handlerejectCall}
                          >
                            <MaterialIcons style={styles.iconBtnReceivingCall} name="call-end"/>
                            <Text style={styles.txtBtnReceivingCall}>Từ chối</Text>
                          </TouchableOpacity>
                        </View>

                        <View >
                        <TouchableOpacity style={styles.acceptCall} onPress={answerCall}>
                            <Feather style={styles.iconBtnReceivingCall} name="phone-call"/>
                            <Text style={styles.txtBtnReceivingCall}>Trả lời</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
      
                  </View>
                ) : null}
              </View>

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
    },
    wrapperReceivingCall:{
      backgroundColor:'white',
      display:"flex",
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      height:windowH
    },
    calledText:{
      fontSize:20,
      marginVertical:10,
      fontWeight:'bold'
    },
    groupBtnReceivingCall:{
      width:'100%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around'
    },
    rejectCall:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      width:120,
      backgroundColor:"red",
      padding:20,
      borderRadius:80,
    },
    endCall:{
      position:'absolute',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      width:120,
      backgroundColor:"red",
      padding:20,
      borderRadius:80,
      top:windowH*0.85,
      left:windowW*0.35,
      zIndex:1000
    },
    acceptCall:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      width:120,
      backgroundColor:"green",
      padding:20,
      borderRadius:80,
    },
    txtBtnReceivingCall:{
      color:"white",
      fontSize:16,
      fontWeight:'400'
    },
    iconBtnReceivingCall:{
      color:"white",
      fontSize:16,
      fontWeight:'400',
      marginRight:10
    },
    wrapperTrackCallTime:{
      width: 130,
      height: 20,
      backgroundColor:'#009933',
      position:'absolute',
      top:10,
      left:20,
      borderRadius: 15
    }
  });
export default GettingVideo;