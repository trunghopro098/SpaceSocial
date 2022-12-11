import { View, Text,FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React,{memo, useState} from 'react'
import { windowH, windowW } from '../../util/Dimension'
import { API_URL } from '../../util/config'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LayoutImgPost from '../../components/ScreenComponents/LayoutImgPost'
import SubStr from '../StartScreens/SubStr'
import ShowIcon from './ShowIcon'
import * as GETAPI from '../../util/fetchApi'; 
import TimeAgoScreen from '../ComponentUtils/TimAgoScreen';

function Post(props) {

    const {currentUser, socket} = props
    const [ShowComent, setShowComent] = useState(false);
    const [showIcon, setshowIcon] = useState(false);
    const [idPost, setidPost] = useState();
    const DataPost = props.DataPost;

    const handleComent = (id)=>{
        setShowComent(true)

    }
    const handlelike = async(type, item)=>{
        console.log("data", item)
        const data = {"idPost":item.id,"idUser":currentUser.idUser,"emotion":type}
        const res = await GETAPI.postDataAPI("/post/likePost",data);
        setshowIcon(false)
        if(res.msg){
            if(res.msg==="Success"){
                socket.emit("likePost",{
                    id:item.id,
                    idUser:currentUser.idUser,
                    firstName:currentUser.firstName,
                    lastName: currentUser.lastName,
                    avatar: currentUser.avatar,
                    emotion:type,
                    plusLike:item.statusLike===null||item.statusLike===0
                })
            }
        }
    }
    const handleUnlike = async(item)=>{
        const data = {"idPost":item.id,"idUser":currentUser.idUser};
        const res = await GETAPI.postDataAPI("/post/unlikePost",data);
        if(res.msg){
            if(res.msg==="Success"){
                socket.emit("unlikePost",{
                    id:item.id,
                    idUser:currentUser.idUser,
                    firstName:currentUser.firstName,
                    lastName: currentUser.lastName,
                    avatar: currentUser.avatar,
                })
            }
        }
    }

    const renderItem = ({item})=>{
        return(
            <View style={styles.wrapItemPost}>    
                <View style={styles.headerPost}>
                    <View style={styles.headerAvatar}>
                        {item.avatar === null ?
                                <Image 
                                    source={require('../../../assets/img/avatar.jpg')}
                                    style={{ width: 50, height: 50, borderRadius:50 }}
                                    resizeMode='cover'
                                    />:
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
                                <TouchableOpacity
                                    onPress={()=>{
                                        // console.log(item.idUser)
                                        props.navigation.navigate("profile",{"idUser": item.idUser})
                                    }}
                                >
                                    <Text style={{ fontWeight: 'bold',color:'black',fontSize: 14 }}>{item.lastName} {item.firstName}</Text>
                                </TouchableOpacity>
                            <View 
                                style={{
                                    flexDirection:'row',
                                    justifyContent: 'flex-start'
                                  }}>
                                {/* <Text style={{ color:'grey',fontSize: 11 }}>{timeAgo(CurrentDay,item.create_at)} </Text> */}
                                <View>
                                <TimeAgoScreen time={item.create_at} style={{color:'gray'}}/>
                                </View>
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
                           <SubStr text={item.message} lengths={200}/>
                    </View>
                    {/* Image */}
                    <LayoutImgPost navigation={props.navigation} image={item.arr_img} postData={item}/>
                </View>
                {showIcon === true && item.id === idPost ? 
                <View style={styles.showIconPost}>
                        <ShowIcon id={idPost} setshowIcon={(e)=>setshowIcon(e)} handlelike={handlelike} item={item}/>
                </View>:
                null} 
                <View style={ styles.numberlikeAndComment }>
                    <TouchableOpacity style={styles.itemumberlikeAndComment}>
                        {/* <AntDesign name='like2' size={19}/> */}
                        <Text>{item.numberEmotion!=='null'?item.numberEmotion:0}</Text>
                        <Text style={{ marginLeft: 5 }}>Lượt Thích</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.itemumberlikeAndComment}>
                        <Text>{item.numberComment!=='null'?item.numberComment:0}</Text>
                        <Text style={{ marginLeft: 5 }}>Bình Luận</Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity style={styles.itemumberlikeAndComment}>
                        <Text>1</Text>
                        <EvilIcons name='share-google' size={19} style={{ marginLeft: 5 }}/>
                    </TouchableOpacity>
                </View>
                <View style={ styles.likeAndComment }>
                    {item.statusLike === 0 || item.statusLike === null ?
                        <TouchableOpacity 
                            onLongPress={()=>{
                                setidPost(item.id)
                                setshowIcon(true)                            
                            }} 
                            onPress={()=>{handlelike(1, item)}}
                            style={styles.itemumberlikeAndComment}
                        >
                            <AntDesign name='like2' size={19} />
                            <Text style={{ marginLeft: 5 }}>Thích</Text>

                    </TouchableOpacity>
                :
                    <TouchableOpacity 
                        onPress={()=>{handleUnlike(item)}}
                        style={styles.itemumberlikeAndComment}
                    >
                        {item.statusLike === 1 && <>
                        <AntDesign name='like1' size={19} color='blue' />
                        <Text style={{ marginLeft: 5, color:'blue'}}>Đã Thích</Text></>}
                        {item.statusLike === 2 && <>
                        <FontAwesome5 name='kiss-wink-heart' size={19} color='red' />
                        <Text style={{ marginLeft: 5, color:"red" }}>Thương Thương</Text></>}
                        {item.statusLike === 3 && <>
                        <FontAwesome5 name='laugh-squint' size={19} color='#ff9900' />
                        <Text style={{ marginLeft: 5, color :'#ff9900' }}>Ha ha</Text></>}
                        {item.statusLike === 4 && <>
                        <Entypo name='emoji-sad' size={19} color='#ff9900' />
                        <Text style={{ marginLeft: 5, color :'#ff9900' }}>Buồn</Text></>}
                        {item.statusLike === 5 && <>
                        <FontAwesome5 name='surprise' size={19} color='#ff9900' />
                        <Text style={{ marginLeft: 5, color :'#ff9900' }}>Wow</Text></>}
                        {item.statusLike === 6 && <>
                        <FontAwesome5 name='angry' size={19} color='red' />
                        <Text style={{ marginLeft: 5 , color:"red" }}>Tức giận</Text></>}
                        
                    </TouchableOpacity>
                }


                    <TouchableOpacity onPress={()=>{handleComent(item.id)}} style={styles.itemumberlikeAndComment}>
                        <MaterialCommunityIcons name='comment-outline' size={18}/>
                        <Text style={{ marginLeft: 5 }}>Bình luận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemumberlikeAndComment}>
                        <EvilIcons name='share-google' size={19}/>
                        <Text style={{ marginLeft: 5 }}>Chia sẻ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
  return (
      <View>
            {DataPost.length > 0 ? 
                <FlatList
                    data={DataPost}
                    renderItem={renderItem}
                    keyExtractor={item=>item.id}
                    showsVerticalScrollIndicator={false}
                    style={{ flex:1,width: windowW, marginBottom: 70}}
                />:
                <View><Text>Hiện không có bài viết nào</Text></View>
            }

    </View>
  )
}
export default memo(Post);


const styles = StyleSheet.create({
    wrapItemPost: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 10,
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
        borderRadius:10
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
    test:{
        position:'absolute',
        zIndex: 1,
        borderRightColor:'red',
        
    },
    showIconPost:{
        position:'absolute',
        zIndex: 1,
        bottom:43,
        left:5,
        
    },


})