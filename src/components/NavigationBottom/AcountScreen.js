import { View, Text, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import * as FetchAPI from "../../util/fetchApi";
import { useSelector } from 'react-redux';
import ProfileScreen from '../ScreenComponents/ProfileScreen';
import { windowH,windowW } from '../../util/Dimension';
export default function AcountScreen({navigation}) {
  const currentUser = useSelector((value)=> value.UserReducer.currentUser)
  return (
    <View style={styles.container}>
      <ProfileScreen idUser = {currentUser.idUser} navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:windowW,
  }
})