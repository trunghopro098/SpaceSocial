import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList,StatusBar,SafeAreaView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { windowW } from '../../util/Dimension';
import { SetHTTP } from '../../util/SetHTTP';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { deCode } from '../../util/crypto';
import TimeAgoScreen from '../ComponentUtils/TimAgoScreen';
import VirtualizedViewFlaslist from '../../util/VituallizedViewFlast';
import { LinearTextGradient } from 'react-native-text-gradient';


export default function ChatScreen({navigation}) {
  const {currentUser,userOnline} = useSelector((value)=>value.UserReducer);
  const {listRoom} = useSelector((value)=>value.MessengesReducer);
  const [ListRoomToShow, setListRoomToShow] = useState([])
  // const dispath = useDispatch();


  useEffect(() => {
      // console.log(currentUser)
      setListRoomToShow(listRoom);
      // console.log(listRoom)
  }, [listRoom])

  const renderItem = ({item})=>{
    return(
      <SafeAreaView style={styles.wrapperItemchat}>
        <TouchableOpacity
            onPress={()=>{
              navigation.navigate('chatdetail',{item: item})
            }}
            style={Platform.OS === "ios" ? {...styles.chatItem,marginVertical:5} :{...styles.chatItem}}
          >
            <View style={styles.avatarChatItem}>
              {item.type===1 ? 
                <>
                {item.avatar === null ?
                  <Image 
                    source={require('../../../assets/img/avatar.jpg')}
                    style={{ width: 50, height: 50, borderRadius:50 }}
                    resizeMode='cover'
                  />
                  :
                  <Image
                      source={{ uri:SetHTTP(item.avatar)}}
                      resizeMode='cover'
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                }
                {userOnline !== null &&
                    <>
                        {userOnline.find(p=>p.targetId===item.idUserToChat) &&
                          <View style={styles.online}/>
                        }
                    </>
                }
                </>
                :
                <>
                 {item.avatarRoom === null ?
                 <Image 
                    source={require('../../../assets/img/avatar_chat_room.png')}
                    style={{ width: 50, height: 50, borderRadius:50 }}
                    resizeMode='cover'
                  />
                  :
                  <Image
                      source={{ uri:SetHTTP(item.avatarRoom)}}
                      resizeMode='cover'
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                 }
                </>
                
              }
            </View>
            <View style={styles.rightChatItem}>
                  <View style={styles.InforRoomChat}>
                  {item.nameRoom === null ? 
                      <Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold'  }}>{item.firstName} {item.lastName}</Text>:
                      <Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold'  }}>{item.nameRoom}</Text>
                  }   
                      <View style={{ flexDirection:'row' }}>
                          {
                            currentUser.idUser === item.sourceId ? 
                              <Text style={{ color: 'gray', fontSize: 13, marginTop: 5 ,fontWeight: 'bold' }}>Bạn: </Text>:
                              <Text style={{ color: 'gray', fontSize: 13, marginTop: 5 ,fontWeight: 'bold' }}>{item.lastNameSent}: </Text>
                          }
                
                          <Text style={{ color: 'gray', fontSize: 13, marginTop: 5  }}>{deCode(item.message).substring(0,18)+"..."}</Text>
                      </View>

                  </View>
                  <TimeAgoScreen time={item.update_at} style={{color:'gray'}}/>
            </View>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
          <StatusBar 
            backgroundColor={'white'}
            barStyle={'dark-content'}
          />
          <View style={styles.headerChat}>
                <View style={styles.leftHeader}>
                    {currentUser.avatar === null ?
                        <TouchableOpacity>
                            <Image 
                              source={require('../../../assets/img/avatar.jpg')}
                              style={{ width: 40, height: 40, borderRadius:50 }}
                              resizeMode='cover'
                            />
                        </TouchableOpacity>:
                        <TouchableOpacity>
                              <Image
                                  source={{ uri:SetHTTP(currentUser.avatar)}}
                                  resizeMode='cover'
                                  style={{ width: 40, height: 40, borderRadius: 50 }}
                                />
                        </TouchableOpacity>
                    }
                        <LinearTextGradient
                              locations={[0,1]}
                              colors={['red','blue']}
                              start={{ x:0,y:0 }}
                              end={{ x:1, y:0 }}
                              style={{ marginLeft: 20 }}
                          >
                              <Text style={{ fontWeight:'bold', fontSize: 19, }}>Nhắn Tin</Text>
                        </LinearTextGradient>
                      
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
                    <Fontisto name='search' size={22} color='grey'/>
                    <Text style={{ color:'grey', fontSize: 13, marginLeft: 10 }}>Tìm kiếm</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                  data={ListRoomToShow}
                  keyExtractor={(item)=>item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderItem}
                  style={{flex:1}}
              />
          </VirtualizedViewFlaslist>
    </SafeAreaView>
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
    flex:1,
    marginTop: 5,
    flexDirection:'column',
    alignItems:'center',
    alignContent:'center'
  },
  wrapperItemchat:{
    paddingBottom:5
  },
  chatItem:{
    position:'relative',
    flex:1,
    height: 65,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginHorizontal:10,
    flexDirection: 'row',
    alignContent:'center',
    alignItems:'center',
    justifyContent:'flex-start',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius:10
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
    flex:1,
    height: '100%',
    backgroundColor:'white',
    marginLeft: 3,
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingTop: 10,
  },
  InforRoomChat:{
    flexDirection: 'column',
    width: '65%',
    backgroundColor:'white'
  },
  search:{
    width: windowW-20,
    height: 40,
    // backgroundColor:'red',
    borderRadius: 40,
    margin: 10,
    paddingLeft: 10,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    alignItems:'center',
    backgroundColor:'#E9E9E9'
  },
  Itemsearch:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    alignItems:'center',
  },
  online:{
    width:10,
    height:10,
    borderRadius:20,
    backgroundColor:'green',
    position:'absolute',
    bottom:10,
    left:42
  }
})