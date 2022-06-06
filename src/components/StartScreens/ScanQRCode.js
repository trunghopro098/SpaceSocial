import React ,{useState,useRef} from 'react';
import {View,ToastAndroid,TouchableOpacity,StyleSheet} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function ScanQrCode({navigation}){
    let refQR = useRef(null);
    const [flashlight, setflashlight] = useState(false);
    const [cameraFront, setcameraFront] = useState(false);
    const onSuccess = e => {
        console.log(e.data)
        try {
            const dataArr = JSON.parse(e.data);
            const {idUser,type} = dataArr;
            if(idUser!==undefined&&type!==undefined){
                if(type==="space_social"){ 
                    navigation.replace('profile',{idUser:idUser})
                }else{
                    ToastAndroid.showWithGravityAndOffset(
                        "Không tìm thấy người dùng !!",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    setTimeout(()=>{
                        refQR.reactivate();
                    },2000)
                }
            }
        } catch (error) {
            ToastAndroid.showWithGravityAndOffset(
                "Không tìm thấy người dùng !!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            setTimeout(()=>{
                refQR.reactivate();
            },2000)
        }
       
    
       
    };
    return(
        <QRCodeScanner
            ref={e=>refQR = e}
            onRead={onSuccess}
            flashMode={flashlight?RNCamera.Constants.FlashMode.torch:null}
            showMarker
            fadeIn
            topContent={
                <View style={styles.topContent}>
                    <TouchableOpacity style={{...styles.btn,marginRight:20}} onPress={()=>setflashlight(!flashlight)}>
                        <Entypo name='flashlight' size={24}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={()=>setcameraFront(!cameraFront)}>
                        <MaterialCommunityIcons name='video-switch-outline' size={24}/>
                    </TouchableOpacity>
                </View>
            }
            markerStyle={{ borderColor:'red' }}
            cameraType={cameraFront?"front":"back"}
      />
    )
}

const styles = StyleSheet.create({
    topContent:{
        marginBottom:20,
        flexDirection:'row'
    },
    btn:{
        width: 35,
        height:35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
        marginRight: 5,
        shadowColor:'#000',
        shadowOffset:{
          width: 0,
          height: 3,
        },
        shadowOpacity: .3,
        shadowRadius: 5,
        elevation: 5
    },
})
export default ScanQrCode;