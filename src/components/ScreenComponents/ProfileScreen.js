import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import * as FetchAPI from "../../util/fetchApi";
import {API_URL} from "@env"
import {windowW, windowH} from "../../util/Dimension"
import AntDesign from "react-native-vector-icons/AntDesign"

export default function ProfileScreen(props) {
    const [idUser, setidUser] = useState();
    const [dataUser, setdataUser] = useState([]);




    useEffect(() => {
        getInforUser()
    }, [])

    const getInforUser = async()=>{
        const data = {"idUser": checkUser()}
        const res = await FetchAPI.postDataAPI("/user/getFullInforUserById",data);
        setdataUser(res.msg[0])
        
    }
    const checkUser = ()=>{
        if(props.idUser === undefined){
            const userParam = props.route.params.idUser;
            setidUser(userParam)
            return userParam
        }else{
            setidUser(props.idUser);
            return props.idUser;
        }

    }

  return (
    <View style = {styles.container}>
      <View style={styles.header}>
          <Image source={{ uri: API_URL+dataUser.coverImage }}
                resizeMode='cover'
                style={styles.imageCover}
            />
          <View style={styles.avatar}>
            {dataUser.avatar === null ? 
               <Image 
               source={require('../../../assets/img/avatar.jpg')}
               style={styles.imageAvatar}
               resizeMode='cover'
               />:
              <Image
                source={{ uri: API_URL+dataUser.avatar }}
                resizeMode='cover'
                style={styles.imageAvatar}
              />
            }
          </View>
            <View style={styles.followFriend}>
                
                    <TouchableOpacity style={styles.btnFllowFrenid}>
                        <AntDesign name='check' size={18} color='white' style={{marginRight: 5}}/>
                        <Text style={styles.text}>Bạn bè</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.btnFllowFrenid, width: "50%" }}>
                        <AntDesign name='check' size={18} color='white' style={{marginRight: 5}}/>
                        <Text style={{ ...styles.text, fontSize: 12 }}>Đang theo giỏi</Text>
                    </TouchableOpacity>
            </View>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    width: windowW,
    height:220,
  },

  imageCover:{
    width: "100%",
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius:30,
    opacity:.8
  },

  avatar:{
    width: 80,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent:'center',
    alignItems:'center',
    padding: 10,
    backgroundColor:'red',
    position: "absolute",
    zIndex: 1,
    bottom: -25,
    borderRadius: 50,
    backgroundColor:"#1DDA19",
    marginLeft: 20
  },

  imageAvatar:{
    width: 70,
    height: 70,
    borderRadius: 50

  },
  followFriend:{
    width: windowW*0.65,
    height: 40,

    flexDirection: 'row',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',

    position:"absolute",
    zIndex:1,
    bottom:10,
    right: 5,
    

  },
  btnFllowFrenid:{
    width:'45%',
    height:"90%",
    backgroundColor:'#3B75DF',
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    marginRight: 10,
    borderRadius: 5,
  },
  text:{
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
    fontSize: 13
  }

})