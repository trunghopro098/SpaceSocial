import { View, Text,FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React,{memo} from 'react'
import { windowH, windowW } from '../../util/Dimension'
import { SetHTTP } from '../../util/SetHTTP'
import {API_URL} from "@env"
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { timeAgo } from '../../util/timeAgo';
import LayoutImgPost from '../../components/ScreenComponents/LayoutImgPost'
import SubStr from '../StartScreens/SubStr'
import VirtualizedViewFlaslist from '../../util/VituallizedViewFlast'

function ImgDetail(props) {
    const DataPost = props.route.params.image;
    // console.log("rerender nef")
    const CurrentDay = Date.now();
    console.log(DataPost.arr_img)
  return (
    <ScrollView>
        <View style={styles.wrapItemPost}>    
            <View style={styles.headerPost}>
                <View style={styles.headerAvatar}>
             
                      {DataPost.avatar === null ?
                              <Image 
                                  source={require('../../../assets/img/avatar.jpg')}
                                  style={styles.avatarImg}
                                  resizeMode='cover'
                                  />:
                              <Image 
                                  source={{ uri:API_URL+DataPost.avatar}}
                                  style={styles.avatarImg}
                                  resizeMode='cover'
                              />
                      }
            
                      <View
                          style={{
                              marginLeft: 10,
                              flexDirection:'column',
                              justifyContent:'flex-start',
                              marginTop: 5
                          }}
                      >
                              <TouchableOpacity
                                  onPress={()=>{
                                      // console.log(item.idUser)
                                      props.navigation.navigate("profile",{"idUser": DataPost.idUser})
                                  }}
                              >
                                  <Text style={{ fontWeight: 'bold',color:'black',fontSize: 14 }}>{DataPost.lastName} {DataPost.firstName}</Text>
                              </TouchableOpacity>
                          <View 
                              style={{
                                  flexDirection:'row',
                                  justifyContent: 'flex-start'
                                }}>
                              <Text style={{ color:'grey',fontSize: 11 }}>{timeAgo(CurrentDay,DataPost.create_at)} </Text>
                              <TouchableOpacity>
                                  <MaterialIcons name='public' size={16} color={'grey'}/>
                              </TouchableOpacity>
                        </View>
                          
                      </View>
                  </View>
                  <TouchableOpacity>
                      <SimpleLineIcons  name='options-vertical' size={20} color={'#C1C1C1'}/>
                  </TouchableOpacity>           
              </View>
              <View style={styles.postContent}>
                  <View style={styles.messageContent}>
                          {/* <Text style={{ maxWidth: '90%', color:'black' }}>{item.message}</Text> */}
                        <SubStr text={DataPost.message} lengths={200}/>
                  </View>
                  {/* Image */}
                  <Text>xin chao</Text>
              </View>
              <View style={ styles.numberlikeAndComment }>
                  <TouchableOpacity style={styles.itemumberlikeAndComment}>
                      {/* <AntDesign name='like2' size={19}/> */}
                      <Text>{DataPost.numberEmotion=='null'?DataPost.numberEmotion:null}</Text>
                      <Text style={{ marginLeft: 5 }}>Lượt Thích</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.itemumberlikeAndComment}>
                      <Text>{DataPost.numberEmotion!=='null'?DataPost.numberEmotion:0}</Text>
                      <Text style={{ marginLeft: 5 }}>Bình Luận</Text>
                  </TouchableOpacity>
                
                  <TouchableOpacity style={styles.itemumberlikeAndComment}>
                      <Text>1</Text>
                      <EvilIcons name='share-google' size={19} style={{ marginLeft: 5 }}/>
                  </TouchableOpacity>
              </View>
              <View style={ styles.likeAndComment }>
                  <TouchableOpacity style={styles.itemumberlikeAndComment}>
                      <AntDesign name='like2' size={19}/>
                      <Text style={{ marginLeft: 5 }}>Thích</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.itemumberlikeAndComment}>
                      <MaterialCommunityIcons name='comment-outline' size={18}/>
                      <Text style={{ marginLeft: 5 }}>Bình luận</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.itemumberlikeAndComment}>
                      <EvilIcons name='share-google' size={19}/>
                      <Text style={{ marginLeft: 5 }}>Chia sẻ</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </ScrollView>
  )
}
export default memo(ImgDetail);
const styles = StyleSheet.create({

    wrapItemPost: {
        backgroundColor: 'white',
        marginBottom: 15,
        alignItems: 'center',
        height: 'auto',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        marginBottom:10,
        
    },
    avatar:{
        width: 60,
        height: 60,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity : .9,
        shadowRadius: 3,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    headerPost:{
        width: '100%',
        height: 56,
        // borderBottomWidth: 0.5,
        // borderBottomColor: '#C1C1C1',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        
    },
    headerAvatar:{
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    postContent:{

        marginTop: 5,
        width: '100%',
        flexDirection:'column',
        alignItems:'center'
        
    },
    messageContent:{
        marginTop: 5,
        flexDirection:'row',
        justifyContent:'flex-start',
        width: '95%'    
    },
    likeAndComment:{
        width: '100%',
        height: 30,
        marginTop: 5,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        alignItems:'center',
        borderTopWidth: 0.5,
        borderTopColor: '#C1C1C1',
    },
    numberlikeAndComment:{
        width: '100%',
        height: 30,
        marginTop: 5,
        marginBottom:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        alignItems:'center',
    },
    itemumberlikeAndComment:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },

    avatarImg:{
      width: 50,
      height: 50,
      borderRadius:50,
      borderWidth: 3,
      borderColor:"#DEE1E6"
    }

})