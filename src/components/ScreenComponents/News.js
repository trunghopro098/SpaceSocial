import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, {memo} from 'react'
import { SetHTTP } from '../../util/SetHTTP';
import avatarDefault from '../../../assets/img/avatar.jpg'
function News({Data}) {
    const renderItem = ({item})=>{
        return(
            <TouchableOpacity style={styles.wrapNews} activeOpacity={.8}>
                <View style={styles.wrapImage}>
                    {/* {console.log(`${item.image}`)} */}
                    <Image
                        source={item.avatar ? {uri : SetHTTP(item.avatar)} : avatarDefault}
                        resizeMode='cover'
                        style={{ width: 50, height:50, borderRadius: 13 }}
                        
                    />
                </View>
                <Text style={{ fontWeight:'bold' }}>{`${item.lastName}`}</Text>
            </TouchableOpacity>
 
        )
    }
  return (
    <View style={styles.container}>
      <FlatList
        data={Data}
        keyExtractor={item=>item.id}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
export default memo(News);
const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 95,
        padding: 5,
        justifyContent:'center',
        alignItems:'center',
    },
    wrapNews:{
        width:80,
        height:85,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapImage:{
        width:65,
        height:65,
        backgroundColor:'white',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'rgba(210, 215, 211,1)',
        borderRadius:15
    }
})