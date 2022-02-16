import React, { useEffect, useState } from 'react';
import { Text, View,StyleSheet} from 'react-native';
import * as GETAPI from './src/util/fetchApi';
import {useDispatch, useSelector} from 'react-redux';
import { test } from './redux/reducers/test.reducer';


const App = ()=>{
    const usedispatch = useDispatch();
    const testw = useSelector((state)=>state.TestReducer.tests);

    const a = [
      {
        name: "trung",
        age:20,
    },
    {
      name:"ta",
      age:15
    }

    ]

    useEffect(() => {
      
      usedispatch(test(a));
      console.log("dang thu ne")
    },[])

    useEffect(() => {
      
      console.log("day ne",testw)
    },[])

  return(
    <View style={styles.container}>
      <Text>Xin chao cac ban</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'

  },
});

export default App;
