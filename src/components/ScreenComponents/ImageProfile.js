import { View, Text, StyleSheet, FlatList,TouchableOpacity,Image } from 'react-native'
import React, { memo, useEffect,useState } from 'react'
import * as FetchAPI from "../../util/fetchApi";
import { windowH, windowW } from '../../util/Dimension';
import { SetHTTP } from '../../util/SetHTTP';
 function ImageProfile({idUser}) {
  const [dataImage, setdataImage] = useState([])
  
  
  useEffect(() => {
    getImageProfile()
    // console.log("rendernef")
  }, [])
  

  const getImageProfile = async()=>{
    const data = {"idUser":idUser}
    const res = await FetchAPI.postDataAPI("/user/getImagePosted",data)
    // console.log(res)
    setdataImage(res.msg)
  }

  const renderItem = ({item,index})=>{
    return(
    <TouchableOpacity style={styles.wrapItem}>
      <Image source={{ uri:SetHTTP(item.url) }}
        resizeMode='cover'
        style={{ width: "100%", height: 130 }}
      />
        {/* <Text>{item.url}</Text> */}
    </TouchableOpacity>

    )
  }  

  return (
    <View style={styles.container}> 
        <FlatList
          numColumns={3}
          data={dataImage}
          renderItem={renderItem}
          keyExtractor={(item,index)=>index}
        />
    </View>
  )
}
export default memo(ImageProfile);
const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'yellow',
    flexDirection:'row',
    paddingLeft:windowW*0.02,
    // paddingRight:windowW*0.02,
    paddingTop: 10
    
  },
  wrapItem:{
    width:windowW*0.3065,
    // height: 100,
    // backgroundColor:'pink',
    marginRight:windowW*0.02,
    marginBottom: 10,
    borderRadius: 4,

  }
})

