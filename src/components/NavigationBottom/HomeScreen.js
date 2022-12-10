import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { memo,useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as GETAPI from '../../util/fetchApi'; 
import { updatePostData } from '../../../redux/reducers/post.reducers';
import { LinearTextGradient } from 'react-native-text-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Post from '../ScreenComponents/Post';
import News from '../ScreenComponents/News';
import VirtualizedViewFlaslist from '../../util/VituallizedViewFlast';
import { updateListRoom } from '../../../redux/reducers/messenges.reducer';
import { updateDataFriend } from '../../../redux/reducers/user.reducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Facebook } from 'react-content-loader/native';
// import TruncateText from '../../util/TruncateText';
 function HomeScreen({route, navigation},props) {
  const [showContent, setshowContent] = useState(false);
  const {dataPost, listLike} = useSelector(value=>value.PostReducer)
  const {currentUser,dataFriend} = useSelector(e=>e.UserReducer);
  const {currentMessenges} = useSelector(e=>e.MessengesReducer);
  const dispath = useDispatch();
  const {socket,item} = route.params;
  
  useEffect(() => {
    if(currentUser !== null){
      getDataPost();
      // console.log(dataPost)
    }
    // console.log('socket', socket)
  }, [currentUser])

  useEffect(() => {
    if(currentUser !== null){
      getRomChat();
    }
    
  }, [currentMessenges])

  useEffect(()=>{
    getDataFriend()
  },[])
  const getDataFriend = async()=>{
    const data = {idUser:currentUser.idUser};
    const res = await GETAPI.postDataAPI("/user/getFriendById",data);
    dispath(updateDataFriend(res.msg));
  }

  const getDataPost = async()=>{
      const data = {idUser:currentUser.idUser};
      const res = await GETAPI.postDataAPI("/post/getPostById",data);
      dispath(updatePostData(res.msg))
      // console.log(res);
      setshowContent(true);
  }

  const getRomChat = async()=>{
    const data = {idUser: currentUser.idUser};
    const res = await GETAPI.postDataAPI("/messenges/getListCovensation", data);
    // console.log(res)
    dispath(updateListRoom(res.msg))
    // console.log('log xong')
  }

  const data = [
    {
        id:1,
        image:require('../../../assets/img/anh900080.jpg'),
        name: 'Thành',
    },
    {
        id:2,
        image:require('../../../assets/img/avatar.jpg'),
        name: 'Chiến',
    },
    {
        id:3,
        image: require('../../../assets/img/anh900080.jpg'),
        name: 'Trung',
    },
    {
        id:4,
        image: require('../../../assets/img/avatar.jpg'),
        name: 'An',
    },
    {
        id:5,
        image:require('../../../assets/img/anh900080.jpg'),
        name:'Thuần',
    },
  ]
  const SkeletonPost = ()=>(
    <View style={styles.wrapperSkeletonPost}>
      <Facebook />
    </View>
  )
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      {/* <TruncateText/> */}
        <View style={styles.header}>
              <LinearTextGradient
                  locations={[0,1]}
                  colors={['red','blue']}
                  start={{ x:0,y:0 }}
                  end={{ x:1, y:0 }}
              >
                  <Text style={{ fontSize: 20 , fontWeight: 'bold' }}>SPACE SOCIAL</Text>
              </LinearTextGradient>
              <View style={styles.gruopRight}>
              <TouchableOpacity 
                style={{...styles.search,marginRight:15}}
                onPress={()=>navigation.navigate("scanqr")}
              >
                    <MaterialCommunityIcons name='qrcode-scan' size={20}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.search}>
                    <EvilIcons name='search' size={28}/>
              </TouchableOpacity>
              </View>
        </View>
        <VirtualizedViewFlaslist>
              {/* new */}
              <News Data={dataFriend}/>
              {/* post */}
              {!showContent ? 
                <>
                  <SkeletonPost/>
                  <SkeletonPost/>
                  <SkeletonPost/>
                </>
                :
                <Post DataPost={dataPost} navigation = {navigation} currentUser={currentUser} socket={socket} />
              }  
        </VirtualizedViewFlaslist>
    </SafeAreaView>
  )
}
export default memo(HomeScreen);
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white'
  },
  header:{
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: 15,
    paddingBottom: 5,
    marginTop: 10

  },
  search:{
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
    elevation: 10
    
  },
  gruopRight:{
    flexDirection: 'row'
  },
  wrapperSkeletonPost:{
    borderRadius:10,
    flex:1,
    backgroundColor:'white',
    padding:10,
    margin:10,
    shadowColor:'#000',
    shadowOffset:{
      width: 0,
      height: 3,
    },
    shadowOpacity: .3,
    shadowRadius: 5,
    elevation: 10
  }
})