import { View, Text,Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { windowH, windowW } from '../../util/Dimension';
import LottieView from "lottie-react-native";
export default function ShowIcon(props) {

    const handlelike = (num, item)=>{
        props.handlelike(num, item)
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity 
            onPress={()=>{handlelike(1, props.item)}}
        >
            {/* like */}
            <LottieView 
                source={require('../../../assets/lottifiles/like.json')}
                style={{ width:55, height:50}}
                autoPlay
                // loop  
            />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{handlelike(2, props.item)}}
        >
            {/* heart  heart */}
            <LottieView 
                source={require('../../../assets/lottifiles/thuongthuong.json')}
                style={{ width:35, height:35,}}
                autoPlay
                // loop  
            />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{handlelike(3, props.item)}}
            // haha
        >
            <LottieView 
                source={require('../../../assets/lottifiles/wow.json')}
                style={{ width:38, height:38,}}
                autoPlay
                // loop  
            />
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={()=>{handlelike(4, props.item)}}
            style={{marginHorizontal:10}}
        >
            {/* heart */}
            <LottieView 
                source={require('../../../assets/lottifiles/sad.json')}
                style={{ width:32, height:32}}
                autoPlay
                // loop  
            />
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={()=>{handlelike(5, props.item)}}
            style={{marginHorizontal:10}}

        >
            {/* woww */}
            <Image
                source={require("../../../assets/img/wow.png")}
                resizeMode='contain'
                style={{ width:26, height:26}}             
            />
        </TouchableOpacity>


        <TouchableOpacity
            onPress={()=>{handlelike(6, props.item)}}
        >
            {/* phan no */}
            <LottieView 
                source={require('../../../assets/lottifiles/phanno.json')}
                style={{ width:35, height:35, marginLeft:4}}
                autoPlay
                // loop  
            />
        </TouchableOpacity>
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