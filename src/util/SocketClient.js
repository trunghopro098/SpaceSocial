import { View} from 'react-native'
import React ,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as FetchAPI from './fetchApi';
import {updateDataFriend,updateUserOnline} from '../../redux/reducers/user.reducer';
import { updateMessenges } from '../../redux/reducers/messenges.reducer';
import { Audio } from './Audio'
export default function SocketClient({socket}) {
    const {currentUser,followers,followings,currentIdRoom} = useSelector(e=>e.UserReducer);
    const {currentMessenges} = useSelector(e=>e.MessengesReducer);

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
        socket.on("changeJoin",async(_)=>{
            socket.emit("checkUserOnline",data);
            //Update friend to see lastLogin
            const res = await FetchAPI.postDataAPI("/user/getFriendById",{"idUser":currentUser.idUser});
            // dispatch(updateDataFriend(res.msg));
            //Update array user online
        })
        socket.on("getUserOnline",data=>{
            console.log("run")
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
                        // audioNotifyRef.current.play();
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
    return (
        <View style={{display:'none'}}>
        
        </View>
    )
}

