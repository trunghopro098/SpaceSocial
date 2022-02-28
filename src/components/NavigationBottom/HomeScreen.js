import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { UserReducer } from '../../../redux/reducers';
import * as GETAPI from '../../util/fetchApi'; 
import { updatePostData } from '../../../redux/reducers/post.reducers';
import { LinearTextGradient } from 'react-native-text-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Post from '../ScreenComponents/Post';
export default function HomeScreen() {
  const [showContent, setshowContent] = useState(false);
  const {dataPost, listLike} = useSelector((value)=>value.PostReducer)
  const currentUser = useSelector((value)=> value.UserReducer.currentUser)
  const dispath = useDispatch();
  useEffect(() => {
    if(currentUser !== null){
      getDataPost();
    }
    
  }, [])
  const getDataPost = async()=>{
      const data = {idUser:currentUser.idUser};
      const res = await GETAPI.postDataAPI("/post/getPostById",data);
      dispath(updatePostData(res.msg))
      // console.log('aaaa',res);
      setshowContent(true);

  }

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <LinearTextGradient
          locations={[0,1]}
          colors={['red','blue']}
          start={{ x:0,y:0 }}
          end={{ x:1, y:0 }}
        >
            <Text style={{ fontSize: 20 , fontWeight: 'bold' }}>SPACE SOCIAL</Text>
        </LinearTextGradient>
        <View style={styles.search}>
              <EvilIcons name='search' size={28}/>
        </View>
      </View>
    {/* new */}
    {/* post */}
      <Post name={'ho van trung'} DataPost={dataPost}/>
      <View >
        {showContent?console.log('day laf reducer',dataPost):console.log('nullllll')}
         <Text>header</Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white'
  },
  header:{
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: 10,
    marginTop: 10

  },
  search:{

    width: 35,
    height:35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    marginRight: 15,
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