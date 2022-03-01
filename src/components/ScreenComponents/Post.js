import { View, Text,FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { windowH, windowW } from '../../util/Dimension'
import { SetHTTP } from '../../util/SetHTTP'
import {API_URL} from "@env"
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { timeAgo } from '../../util/timeAgo'
export default function Post({DataPost}) {
    console.log("day lad pros",DataPost)
    console.log(Date.now())
    const CurrentDay = Date.now();
    const renderItem = ({item})=>{
        return(
            <View style={styles.wrapItemPost}>    
                <View style={styles.headerPost}>
                    <View style={styles.headerAvatar}>
                        {item.avatar === null ?
                            <View >
                                <Image 
                                    source={require('../../../assets/img/avatar.jpg')}
                                    style={{ width: 50, height: 50, borderRadius:50 }}
                                    resizeMode='cover'
                                    />
                            </View>:
                                <Image 
                                    source={{ uri:API_URL+item.avatar}}
                                    style={{ width: 50, height: 50, borderRadius:50 }}
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
                            <Text style={{ fontWeight: 'bold',color:'black',fontSize: 14 }}>{item.lastName} {item.firstName}</Text>
                            <View 
                                style={{
                                    flexDirection:'row',
                                    justifyContent: 'flex-start'
                                  }}>
                                <Text style={{ color:'grey',fontSize: 11 }}>{timeAgo(CurrentDay,item.create_at)} </Text>
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
                            <Text style={{ maxWidth: '90%', color:'black' }}>{item.message}</Text>
                    </View>
                    {item.image_description==='null'?
                    null:
                        <Image 
                        source={{ uri:SetHTTP(item.image_description)}}
                        style={{ width: '95%', height: '95%', borderRadius: 10 }}
                        resizeMode='contain'
                        />
                    }

                </View>
                <View style={ styles.numberlikeAndComment }>
                    <TouchableOpacity style={styles.itemumberlikeAndComment}>
                        <AntDesign name='like2' size={19}/>
                        <Text style={{ marginLeft: 5 }}>{item.numberEmotion!=='null'?item.numberEmotion:0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemumberlikeAndComment}>
                        <Text>{item.numberEmotion!=='null'?item.numberEmotion:0}</Text>
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
                        <Text style={{ marginLeft: 5 }}>Chia sẽ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
  return (
    <View style={styles.container}>
      <FlatList
        data={DataPost}
        renderItem={renderItem}
        keyExtractor={item=>item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapItemPost: {
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 15,
        alignItems: 'center',
        width: windowW*0.93,
        maxHeight: windowH*0.6,
        borderRadius: 10,
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height:2,
        },
        shadowOpacity: .6,
        shadowRadius: 2,
        elevation: 1,
        padding: 10
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
        alignItems: 'center'
    },
    headerPost:{
        width: '100%',
        height: '17%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#C1C1C1',
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
        maxHeight: '65%',
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
        height: '10%',
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
        height: '6%',
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
    }


})