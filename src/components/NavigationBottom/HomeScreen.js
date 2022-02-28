import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { UserReducer } from '../../../redux/reducers';
import * as GETAPI from '../../util/fetchApi'; 
export default function HomeScreen() {
  const currentUser = useSelector((value)=> value.UserReducer.currentUser)
  const dispath = useDispatch();
  useEffect(() => {
    if(currentUser !== null){
      getDataPost();
    }
    
  }, [])
  
  const getDataPost = async()=>{
      const data = {idUser:currentUser.idUser};
      const res = await GETAPI.postDataAPI("/post/getPostById",data);
      console.log('aaaa',res);
  }

  return (
    <View style={{flex:1, backgroundColor:'white' }}>
      <View >
         <Text>header</Text>
      </View>
    </View>
  )
}