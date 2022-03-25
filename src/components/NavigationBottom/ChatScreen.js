import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as fecthAPI from '../../util/fetchApi';
import { updateListRoom } from '../../../redux/reducers/messenges.reducer';
export default function ChatScreen() {
  const {currentUser} = useSelector((value)=>value.UserReducer);
  const {listRoom} = useSelector((value)=>value.MessengesReducer);
  const [ListRoomToShow, setListRoomToShow] = useState([])

  const dispath = useDispatch();
 

  useEffect(() => {
    // setListRoomToShow(ListRoom);
    console.log("abcc",listRoom);
  }, [listRoom])
  

  return (
    <View style={styles.container}>
          <View style={styles.headerChat}>
                <Text>xin chao</Text>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:'#F7F7F7', 
  },
})