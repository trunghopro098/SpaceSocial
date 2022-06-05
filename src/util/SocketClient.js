import { View} from 'react-native'
import React ,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as FetchAPI from './fetchApi';
import {updateDataFriend,updateUserOnline} from '../../redux/reducers/user.reducer';
import { updateCall, updateMessenges,updateStatusCall,updateIdRoomCall,updateVisibleCall } from '../../redux/reducers/messenges.reducer';
import { Audio } from './Audio'
import { useNavigation } from '@react-navigation/native';

export default function SocketClient({socket}) {
    const navigation = useNavigation();
    const {currentUser,followers,followings,currentIdRoom} = useSelector(e=>e.UserReducer);
    const {currentMessenges, datacall} = useSelector(e=>e.MessengesReducer);
    const dispatch = useDispatch();

    //JoinUser
    useEffect(() => {
        if(currentUser!==null){
            const data = {"idUser":currentUser.idUser,"followers":followers}
            socket.emit('joinUser', data);
        }
        return ()=>{
            socket.off('joinUser');
        }
    }, [socket, currentUser])

    //GetUserOnl
    useEffect(() => {
        const data = {"followings":followings};
        // console.log("nef ner")
        // console.log("datane",data)
        socket.on("changeJoin",async(_)=>{
            socket.emit("checkUserOnline",data);
            //Update friend to see lastLogin
            const res = await FetchAPI.postDataAPI("/user/getFriendById",{"idUser":currentUser.idUser});
            dispatch(updateDataFriend(res.msg));
            // console.log(res)
            //Update array user online
        })
        socket.on("getUserOnline",data=>{
            dispatch(updateUserOnline(data));
        })
        return ()=>{
            socket.off('changeJoin');
            socket.off('getUserOnline');
        }
    },[socket,currentUser])


    // Message
    useEffect(() => {
        socket.on("message", async(data) => {
            // updateRoom();
            const res = await FetchAPI.postDataAPI("/user/getInforById",{"idUser":data.sourceId})
            const dataUserSent = res.msg[0];
            if(currentIdRoom===null){
                if(data.sourceId!==currentUser.idUser){
                   Audio('ting.mp3');
                }
            }else{
                if(currentIdRoom===data.idRoom){
                    if(data.sourceId!==currentUser.idUser){
                        Audio('ting.mp3');
                    }
                    let arr = JSON.parse(JSON.stringify(currentMessenges));
                    arr.push(
                        {
                            avatar: dataUserSent.avatar,
                            sourceId: data.sourceId,
                            firstName: dataUserSent.firstName,
                            lastName: dataUserSent.lastName,
                            message: data.message,
                            typeMess: data.typeMess,
                            create_at: data.create_at
                        }
                    )
                    // console.log(arr);
                    dispatch(updateMessenges(arr));
                }else{
                    if(data.sourceId!==currentUser.idUser){
                        Audio('ting.mp3');
                        
                        // notification.open({
                        //     message: 'Tin nhắn mới',
                        //     description:
                        //         `Bạn có một tin nhắn từ ${dataUserSent.firstName} ${dataUserSent.lastName}`,
                        //     onClick: () => {
                        //       console.log('Notification Clicked!');
                        //     },
                        // });
                    }
                }
            }
        })
        return () => {
            socket.off("message");
        }
    }, [socket,currentIdRoom,currentMessenges]);


    //Call video
    useEffect(() => {
        socket.on("callUser", (data) => {
            dispatch(updateCall(data));
            dispatch(updateStatusCall("called"));
            dispatch(updateIdRoomCall(data.idRoom));
            dispatch(updateVisibleCall(true));
            navigation.navigate("videocall")
		})
        return () => {
            socket.off("callUser");
        }
    },[socket,datacall])


    return (
        <View style={{display:'none'}}>
        
        </View>
    )
}

