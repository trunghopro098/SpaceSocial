import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as fecthAPI from '../../util/fetchApi';
import { updateListRoom } from '../../../redux/reducers/messenges.reducer';
import { windowW } from '../../util/Dimension';
import { SetHTTP } from '../../util/SetHTTP';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { deCode } from '../../util/crypto';
import { timeAgo } from '../../util/timeAgo';
import VirtualizedViewFlaslist from '../../util/VituallizedViewFlast';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


export default function ChatScreen() {
  const {currentUser} = useSelector((value)=>value.UserReducer);
  const {listRoom} = useSelector((value)=>value.MessengesReducer);
  const [ListRoomToShow, setListRoomToShow] = useState([])
  const [CurrentTime, setCurrentTime] = useState(0);
  // const dispath = useDispatch();
 

  useEffect(() => {
      // console.log(currentUser)
      setListRoomToShow(listRoom);
      // console.log(listRoom)
  }, [listRoom])
useEffect(() => {
  const interval = setInterval(() => {
      setCurrentTime(Date.now())
  }, 1000);

  return () => {
    clearInterval(interval);
  }
}, [])


  const renderItem = ({item})=>{
    return(
        <TouchableOpacity style={styles.chatItem}>
            <View style={styles.avatarChatItem}>
                {item.avatar === null ?
                      <TouchableOpacity>
                          <Image 
                          source={require('../../../assets/img/avatar.jpg')}
                          style={{ width: 50, height: 50, borderRadius:50 }}
                          resizeMode='cover'
                          />
                      </TouchableOpacity>:
                      <TouchableOpacity>
                            <Image
                                source={{ uri:SetHTTP(item.avatar)}}
                                resizeMode='cover'
                                style={{ width: 50, height: 50, borderRadius: 50 }}
                              />
                      </TouchableOpacity>
                  }
            </View>
            <View style={styles.rightChatItem}>
                  <View style={styles.InforRoomChat}>
                  {item.nameRoom === null ? 
                      <Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold'  }}>{item.firstName} {item.lastName}</Text>:
                      <Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold'  }}>{item.nameRoom}</Text>
                  }   
                      <View style={{ flexDirection:'row' }}>
                          <Text style={{ color: 'gray', fontSize: 13, marginTop: 5 ,fontWeight: 'bold' }}>{item.lastNameSent}: </Text>
                          <Text style={{ color: 'gray', fontSize: 13, marginTop: 5  }}>{deCode(item.message).substring(0,18)+"..."}</Text>
                      </View>

                  </View>
                      
                  <View style={styles.dateRoomchat}>
                      <Text style={{ marginTop: 25 }}>{timeAgo(CurrentTime, item.update_at)}</Text>
                  </View>
            </View>
        </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
          <View style={styles.headerChat}>
                <View style={styles.leftHeader}>
                    {currentUser.avatar === null ?
                        <TouchableOpacity>
                            <Image 
                            source={require('../../../assets/img/avatar.jpg')}
                            style={{ width: 48, height: 48, borderRadius:50 }}
                            resizeMode='cover'
                            />
                        </TouchableOpacity>:
                        <TouchableOpacity>
                              <Image
                                  source={{ uri:SetHTTP(currentUser.avatar)}}
                                  resizeMode='cover'
                                  style={{ width: 48, height: 48, borderRadius: 50 }}
                                />
                        </TouchableOpacity>
                    }
                      <Text style={{ fontWeight:'bold', fontSize: 19, color: 'black', marginLeft: 20 }}>CHAT</Text>
                </View>
                <View style={styles.rightHeader}>
                    <TouchableOpacity>
                        <AntDesign name='addusergroup' size={23} color='black' style={{ marginRight: 20 }}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Fontisto name='arrow-swap' size={23} color='black'/>
                    </TouchableOpacity>       
                </View>
          </View>

          <VirtualizedViewFlaslist style={styles.Chat}>
              <View style={styles.search}>
                <TouchableOpacity style={styles.Itemsearch}>
                    <Fontisto name='search' size={22} color='gray'/>
                    <Text style={{ color:'black', fontSize: 13, marginLeft: 10 }}>Tìm kiếm</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                  data={ListRoomToShow}
                  keyExtractor={(item)=>item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderItem}
              />
          </VirtualizedViewFlaslist>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:'#F7F7F7', 
  },
  headerChat:{
    width: windowW,
    height: 55,
    backgroundColor: 'white',
    shadowColor:'#000',
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  rightHeader:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'center'
  },
  leftHeader:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center'
  },
  Chat:{
    marginTop: 5,
    flexDirection:'column',
    alignItems:'center',
    alignContent:'center'
  },
  chatItem:{
    width: windowW,
    height: 65,
    backgroundColor: 'white',
    marginTop: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    flexDirection: 'row',
    alignContent:'center',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  avatarChatItem:{
    width: 60,
    height: '96%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignContent:'center',
    alignItems:'center'
  },
  rightChatItem:{
    width: windowW-70,
    height: '100%',
    backgroundColor:'white',
    marginLeft: 3,
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingTop: 10,
    paddingRight: 10

  },
  InforRoomChat:{
    flexDirection: 'column',
    width: '65%',
    backgroundColor:'white'
  },
  search:{
    width: windowW-20,
    height: 35,
    // backgroundColor:'red',
    borderRadius: 40,
    margin: 10,
    paddingLeft: 20,
    borderWidth:0.5,
    borderColor: 'black',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    alignItems:'center',
  },
  Itemsearch:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    alignItems:'center',
  }
})