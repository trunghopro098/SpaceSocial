import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SetHTTP } from '../../util/SetHTTP'
import { windowH, windowW } from '../../util/Dimension'

export default function LayoutImgPost({image,navigation, postData}) {
  const Layout1 = ()=>
    (
      <TouchableOpacity 
          onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
          style={styles.img1}
          activeOpacity={1}
        >
            <Image
                source={{ uri: SetHTTP(image[0].url)}}
                resizeMode='cover'
                style={{ width: windowW * 0.9, height: windowH*0.35, borderRadius: 5 }}             
            />
        </TouchableOpacity>
    )
  const Layout2 = ()=>
      (
        <View style={styles.img2}>
            <TouchableOpacity 
              onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
              activeOpacity={1}
            >
              <Image
                  source={{ uri: SetHTTP(image[0].url)}}
                  resizeMode='cover'
                  style={{ width: windowW * 0.46, height: windowH*0.2, marginRight: 3, borderRadius: 5 }}             
              />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
            activeOpacity={1}
          >
              <Image
                  source={{ uri: SetHTTP(image[1].url)}}
                  resizeMode='cover'
                  style={{ width: windowW * 0.46, height: windowH*0.2, borderRadius: 5}}             
              />
          </TouchableOpacity>
        </View>
      )
      const Layout3 = ()=>
      (
        <View style={styles.img3}>
            <View style={styles.leftImge}>
            <TouchableOpacity 
                onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
                activeOpacity={1}
            >
                  <Image
                    source={{ uri: SetHTTP(image[0].url)}}
                    resizeMode='cover'
                    style={{ width: windowW * 0.43, height: windowH*0.165, margin: 1, borderRadius: 5 }}             
                />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>{navigation.navigate("imagedetail",{"image":imagpostDatae})}} 
                activeOpacity={1}
              >
                      <Image
                        source={{ uri: SetHTTP(image[1].url)}}
                        resizeMode='cover'
                        style={{ width: windowW * 0.43, height: windowH*0.165, margin: 1, borderRadius: 5 }}             
                    />
              </TouchableOpacity>
            </View>

            <View style={styles.rightImge} >
                  <TouchableOpacity 
                      onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
                      activeOpacity={1}
                  >
                      <Image
                              source={{ uri: SetHTTP(image[2].url)}}
                              resizeMode='cover'
                              style={{ width: windowW * 0.45, height: windowH*0.34, margin: 1, borderRadius: 5 }}             
                          />
                </TouchableOpacity>
            </View>
        </View>
      )

      const Layout4 = ()=>
      (
        <View style={styles.img4}>
            <View style={styles.left4}>
            <TouchableOpacity 
                onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
                activeOpacity={1}
            >
                    <Image
                          source={{ uri: SetHTTP(image[0].url)}}
                          resizeMode='cover'
                          style={{ width: windowW * 0.43, height: windowH*0.165, marginTop: 2, borderRadius: 5 }}             
                      />
            </TouchableOpacity>
            <TouchableOpacity 
                  onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
                  activeOpacity={1}
              >
                      <Image
                        source={{ uri: SetHTTP(image[1].url)}}
                        resizeMode='cover'
                        style={{ width: windowW * 0.43, height: windowH*0.165, marginTop: 2, borderRadius: 5 }}             
                      />
            </TouchableOpacity>
            </View>
            <View style={styles.right4}>
                <TouchableOpacity 
                    onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
                    activeOpacity={1}
                  >
                    <Image
                          source={{ uri: SetHTTP(image[2].url)}}
                          resizeMode='cover'
                          style={{ width: windowW * 0.43, height: windowH*0.165, margin: 2, borderRadius: 5 }}             
                      />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
                    activeOpacity={1}
                >
                        <Image
                          source={{ uri: SetHTTP(image[3].url)}}
                          resizeMode='cover'
                          style={{ width: windowW * 0.43, height: windowH*0.165, margin: 2, borderRadius: 5 }}             
                      />
                </TouchableOpacity>
            </View>
        </View>
      )
      const Layout5 = ()=>
      (
        <View style={styles.img4}>
            <View style={styles.left4}>
              <TouchableOpacity 
                    onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}}
                    activeOpacity={1} 
                >
                  <Image
                        source={{ uri: SetHTTP(image[0].url)}}
                        resizeMode='cover'
                        style={{ width: windowW * 0.43, height: windowH*0.165, margin: 2, borderRadius: 5 }}             
                    />
              </TouchableOpacity>
              <TouchableOpacity 
                  onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
                  activeOpacity={1}
              >
                      <Image
                        source={{ uri: SetHTTP(image[1].url)}}
                        resizeMode='cover'
                        style={{ width: windowW * 0.43, height: windowH*0.165, margin: 2, borderRadius: 5 }}             
                    />
              </TouchableOpacity>
            </View>
            <View style={styles.right4}>
                <TouchableOpacity 
                  onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
                  activeOpacity={1}
                >
                    <Image
                          source={{ uri: SetHTTP(image[2].url)}}
                          resizeMode='cover'
                          style={{ width: windowW * 0.43, height: windowH*0.165, margin: 2, borderRadius: 5 }}             
                      />
                </TouchableOpacity>
                <View style={styles.imgmore}>
                    <TouchableOpacity 
                          onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}} 
                          activeOpacity={1}
                      >
                        <Image
                          source={{ uri: SetHTTP(image[3].url)}}
                          resizeMode='cover'
                          style={{ width: windowW * 0.43, height: windowH*0.165, margin: 2, borderRadius: 5 }}             
                      />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>{navigation.navigate("imagedetail",{"image":postData})}}
                        activeOpacity={1}
                        style={styles.positionNumberImg}>
                      <Text style={{ color: 'white', fontSize: 24, fontWeight:'bold', backgroundColor: 'transparent'}}>+ {image.length-4}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
      )


  


  return (
    <View style={styles.container}>
        {image.length === 0?null:
          (image.length === 1)?
              <View>
                <Layout1/>
              </View>:
          (image.length === 2) ? 
              <View>  
                <Layout2/>
              </View>:
          (image.length === 3) ?
              <View>
                <Layout3/>
              </View>:
          (image.length === 4) ?
              <View>
                <Layout4/>
              </View>:
              <View>
                <Layout5/>
              </View>
        }
        {/* <Text>LayoutImgPost</Text> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container : {
    flex: 1
  },
  img2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  img1:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems:'center',
    marginVertical: 10
  },
  img3:{
    width:windowW*0.93,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent:'center',
    alignItems:'center',
    marginVertical: 10,
  },
  leftImge:{
    width: windowW*0.45,
    flexDirection: 'column',
    alignContent:'center',
    alignItems:'center',
   
  },
  rightImge:{
    width: windowW*0.45,
  },

  img4:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',

    alignContent: 'center',
    alignItems:'center',
    paddingLeft: 2,
    paddingRight: 10
  },
  left4:{
    width: windowW*0.48,
    marginLeft: 15,
    alignContent:'center',
    alignItems:'center'
  },
  right4:{

    width: windowW*0.48,
  },
  imgmore:{
    // backgroundColor:'white'
  },
  positionNumberImg:{
    height: windowH*0.165,
    width: windowW*0.43,
    position: 'absolute',
    // opacity: .5,
    justifyContent: 'center',
    alignContent:'center',
    alignItems:'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderRadius: 5,
    margin: 2
  }




})