import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid, Platform } from 'react-native'
import React, { useEffect,useState } from 'react'
import * as FetchAPI from "../../util/fetchApi";
import { SetHTTP } from '../../util/SetHTTP';
import { API_URL } from '../../util/config';
import {windowW, windowH} from "../../util/Dimension"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import { useSelector } from 'react-redux';
import Post from './Post';
import VirtualizedViewFlaslist from '../../util/VituallizedViewFlast';
import FriendUser from './FriendUser';
import ImageProfile from './ImageProfile';
import Qrcode from './Qrcode';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage  from '@react-native-async-storage/async-storage'

export default function ProfileScreen(props) { 
  const navigation = useNavigation();
  const currentUser = useSelector((value)=> value.UserReducer.currentUser)
  const {socket} = props?.route.params
  const [idUser, setidUser] = useState();
  const [dataUser, setdataUser] = useState([]);
  const [showMenu, setshowMenu] = useState(1);
  const [dataPostOfUser, setdataPostOfUser] = useState([]);

  useEffect(() => {
      getInforUser()
      getDataPost()

  }, [idUser])


  const getDataPost = async()=>{
    const data = {"sourceId":currentUser.idUser,"targetId":checkUser()};
    const res = await FetchAPI.postDataAPI("/post/getPostOfUser",data);
    setdataPostOfUser(res.msg);
    // console.log(res.msg[0])
  }

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

  const handleLogout = async()=>{
    socket.emit("end")
    await AsyncStorage.removeItem('token');
    props.navigation.replace('login')
    ToastAndroid.showWithGravity(
      "Đăng xuất thành công!",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  return (
   
      <VirtualizedViewFlaslist style = {styles.container}>      
        <View style={styles.header}>
          {
            dataUser.coverImage === null ? 
            <Image source={require('../../../assets/img/coverImage.jpg')}
                  resizeMode='cover'
                  style={styles.imageCover}
              />:
              <Image source={{ uri: API_URL+dataUser.coverImage}}
              resizeMode='cover'
              style={styles.imageCover}
          />
          }
            <Text style={styles.name}>{dataUser.lastName} {dataUser.firstName}</Text>
            {currentUser.idUser === idUser && 
            <View style={styles.wrapperButton}>
                <TouchableOpacity style={styles.editProfile}>
                    <Feather name='edit-2' size={20}/>
                    <Text>Chỉnh sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logOut} onPress={handleLogout}>
                 <Text style={{color:'white'}}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            }
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
            {currentUser?.idUser != idUser &&
              <View style={styles.followFriend}>
                  
                      <TouchableOpacity style={styles.btnFllowFrenid}>
                          <AntDesign name='check' size={18} color='white' style={{marginRight: 5}}/>
                          <Text style={styles.text}>Bạn bè</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ ...styles.btnFllowFrenid, width: "50%" }}>
                          <AntDesign name='check' size={18} color='white' style={{marginRight: 5}}/>
                          <Text style={{ ...styles.text, fontSize: 12 }}>Đang theo dõi</Text>
                      </TouchableOpacity>
              </View>
              }

              <View style={styles.menu}>
    
                    <TouchableOpacity 
                        onPress={()=>{
                            setshowMenu(1);
                          }
                        }
                      style={styles.btnMenu}
                    >
                        <Text style={showMenu == 1? styles.textColor:null}>Bài viết</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>{
                            setshowMenu(2);
                          }
                        }
                      style={styles.btnMenu}
                    >
                        <Text style={showMenu == 2? styles.textColor:null}>Giới thiệu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>{
                            setshowMenu(3);
                          }
                        }
                      style={styles.btnMenu}
                    >
                        <Text style={showMenu == 3? styles.textColor:null}>Bạn bè</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>{
                            setshowMenu(4);
                          }
                        }
                      style={styles.btnMenu}
                    >
                        <Text style={showMenu == 4? styles.textColor:null}>Ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>{
                            setshowMenu(5);
                          }
                        }
                      style={styles.btnMenu}
                    >
                        <Text style={showMenu == 5? styles.textColor:null}>QR code</Text>
                    </TouchableOpacity>
              </View>
        </View> 
        <View style={styles.content}>
             {showMenu ===1 && <Post DataPost={dataPostOfUser} navigation={navigation}/>}
             {showMenu ===2 && <View><Text style={{marginTop:10}}>Screen is developing ...</Text></View>}
             {showMenu ===3 && <FriendUser idUser ={idUser} navigation={navigation} />}
             {showMenu ===4 && <ImageProfile idUser ={idUser} navigation={navigation}/>}
             {showMenu ===5 && <Qrcode idUser={idUser}/>}
        </View>
      </VirtualizedViewFlaslist>
  )
}



const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    width: windowW,
    height:260,
    shadowColor:"#000",
    shadowOffset:{
      width: 2,
      height: 1
    },
    shadowOpacity: .4,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: 'white',
  },

  imageCover:{
    width: "100%",
    height: '70%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20,
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
    bottom: 40,
    borderRadius: 50,
    backgroundColor:"#DEE1E6",
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
    bottom:95,
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
  },
  name:{
    fontWeight:'bold',
    position:"absolute",
    bottom:50,
    left: 105,
    color:'black',
    fontSize:15
  },
  menu:{
    position: "absolute",
    bottom:-3,
    height: 32,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around'
    

  },
  btnMenu:{
    width: "20%",
    height: "80%",
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    marginBottom: 10,
    shadowColor:'#000',
    shadowOffset:{
      width: Platform.OS === "ios" ? 0 : 2,
      height: Platform.OS === "ios" ? 0 : 3
    },
    shadowOpacity: Platform.OS === "ios" ? 0.2 : 6,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor:'white'
  },
  textColor:{
    color:'#3b75df',
    fontWeight:'400'
  },
  editProfile:{
    borderRadius: 5,
    backgroundColor:'#DEE1E6',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{
      width:2,
      height: 3
    },
    shadowOpacity:.4,
    shadowRadius:2,
    elevation:4,
    padding:5
  },
  logOut:{
    borderRadius: 5,
    backgroundColor:'#3B75DF',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{
      width:2,
      height: 3
    },
    shadowOpacity:.4,
    shadowRadius:2,
    elevation:4,
    paddingVertical:5,
    paddingHorizontal:10,
    marginLeft:10
  },
  wrapperButton:{
    flexDirection:'row',
    position:'absolute',
    bottom:40,
    right: 10,
    zIndex: 1,
  },
  content:{
    flex: 1,
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },

})