import { View, Text, StyleSheet,StatusBar, Animated, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { windowH, windowW } from '../../util/Dimension'
import { LinearTextGradient } from 'react-native-text-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CheckAuth } from '../../util/checkAuth';
import { useDispatch } from 'react-redux'
export default function Splash({navigation}) {
    const facetim = useRef(new Animated.Value(0)).current;
    const dispath = useDispatch();
    useEffect(() => {
      Animated.timing(facetim,{
          toValue: 1,
          duration: 4000,
        useNativeDriver: true 
      }).start( async()=>{
        CheckAuths()
        // await AsyncStorage.removeItem('token')
        // console.log(await AsyncStorage.getItem('token')) 
      }
        
      );
    

    }, [facetim])

    const CheckAuths = async()=>{
        const statusAuth = await CheckAuth(dispath);
        // console.log(statusAuth)
        if(statusAuth){
            navigation.replace('home')
            
        }else{
            navigation.replace('login')
        }

    }

  return (
    <View style={styles.container}>
        <StatusBar 
            backgroundColor={'#F7F7F7'}
            barStyle={'dark-content'}/>
        <Animated.Image 
            source={require('../../../assets/img/logo_space.png')}
            resizeMode='cover'
            style={{ width: windowW*0.23, height: windowH*0.23, opacity: facetim }}
        />
        <LinearTextGradient
            locations={[0,1]}
            colors={['red','blue']}
            start={{ x:0, y:0 }}
            end={{ x:1,y:0 }}
        >
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>SPACE SOCIAL</Text>
        </LinearTextGradient>
        

        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
})