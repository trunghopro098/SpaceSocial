import * as GETAPI from '../util/fetchApi';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateFollowers, updateFollowing, updateUer } from '../../redux/reducers/user.reducer';

export const CheckAuth  = async(dispath)=>{
    const token = await AsyncStorage.getItem('token');//Get token
    if(token === null || token === undefined){
        return false;
    }
    //get user
    const data = {'token':token}
    const res = await GETAPI.postDataAPI('/user/getUser',data);
    if(res.msg){
        if(res.msg.message ==='jwt expired'){
            ToastAndroid.showWithGravity(
                'Phiên đăng nhập đã hết!!!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            await AsyncStorage.removeItem('token');
            return false;
        }
    }else {
        if(res[0].status === 1){
            await AsyncStorage.removeItem('token');
            return false;
        }else{
            const followers = await GETAPI.postDataAPI("/user/getFollowers",{"idUser":res[0].idUser});
            const followings = await GETAPI.postDataAPI("/user/getFollowings",{'idUser':res[0].idUser});
            // console.log('day la fls : ',followers);
            // console.log('day la flg : ',followings);
            dispath(updateUer(res[0]))
            dispath(updateFollowers(followers.msg))
            dispath(updateFollowing(followings.msg))
            return true;
         }
        }

}