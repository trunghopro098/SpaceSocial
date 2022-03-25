import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, {memo} from 'react'
import { windowH, windowW } from '../../util/Dimension'

function News({Data}) {
    
    const renderItem = ({item})=>{
        return(
            <View style={styles.wrapNews}>
                <View style={styles.wrapImage}>
                    {/* {console.log(`${item.image}`)} */}
                    <Image
                        source={item.image}
                        resizeMode='cover'
                        style={{ width: 50, height:50, borderRadius: 13 }}
                        
                    />
                </View>
                <Text style={{ fontWeight:'bold' }}>{item.name}</Text>
            </View>
 
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
        borderWidth: 0.5,
        borderColor:'#C1C1C1',
        borderRadius:24
    }
})