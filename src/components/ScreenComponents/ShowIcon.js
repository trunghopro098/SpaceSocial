import { View, Text,Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { windowH, windowW } from '../../util/Dimension';
import LottieView from "lottie-react-native";
export default function ShowIcon(props) {
    console.log(props.id)


    const handlelike = ()=>{
        props.setshowIcon(false)
    }
  return (
    <View style={styles.container}>
        <TouchableOpacity 
            onPress={()=>{handlelike(props.id)}}
        >
            <LottieView 
                source={require('../../../assets/lottifiles/like.json')}
                style={{ width:55, height:50}}
                autoPlay
                // loop  
            />
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={()=>{handlelike(props.id)}}
        >
            <LottieView 
                source={require('../../../assets/lottifiles/heart.json')}
                style={{ width:55, height:50}}
                autoPlay
                // loop  
            />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{handlelike(props.id)}}
        >
            <LottieView 
                source={require('../../../assets/lottifiles/phanno.json')}
                style={{ width:35, height:35}}
                autoPlay
                // loop  
            />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{handlelike(props.id)}}
        >
            <LottieView 
                source={require('../../../assets/lottifiles/wow.json')}
                style={{ width:35, height:35, marginLeft: 5}}
                autoPlay
                // loop  
            />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{handlelike(props.id)}}
        >
            <LottieView 
                source={require('../../../assets/lottifiles/thuongthuong.json')}
                style={{ width:35, height:35,}}
                autoPlay
                // loop  
            />
        </TouchableOpacity>
      {/* <Text>{props.id}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width: windowW*0.65,
        height: 45,

        paddingHorizontal: 10,
       
        backgroundColor:"white",
        borderRadius: 50,

        shadowColor:"#000",
        shadowOffset:{
            width: 3,
            height: 5,

        },
        shadowOpacity:.5,
        shadowRadius: 3,
        elevation: 4,

        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'

    }
})