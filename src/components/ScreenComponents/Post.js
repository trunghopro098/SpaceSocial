import { View, Text,FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { windowH, windowW } from '../../util/Dimension'
import { SetHTTP } from '../../util/SetHTTP'
import {API_URL} from "@env"
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
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
                                <EvilIcons name='user' 
                                    size={70} 
                                    color={'black'}
                                    style={{marginLeft: -8}}/>
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
                            <Text style={{ color:'grey',fontSize: 11 }}>{timeAgo(CurrentDay,item.create_at)} </Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <SimpleLineIcons  name='options-vertical' size={20} color={'#C1C1C1'}/>
                    </TouchableOpacity>
                   
                        
                </View>
               
                                         {/* <Image 
                        source={{ uri:SetHTTP(item.image_description)}}
                        style={{ width: 50, height: 50 }}
                        resizeMode='contain'

                    /> */}
                <Text>{item.lastName}</Text>
            </View>
        )
    }
  return (
    <View style={styles.container}>
      <FlatList
        data={DataPost}
        renderItem={renderItem}
        keyExtractor={item=>item.id}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingBottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapItemPost: {
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 15,
        alignItems: 'center',
        width: windowW*0.93,
        height: windowH*0.6,
        borderRadius: 10,
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height:2,
        },
        shadowOpacity: .6,
        shadowRadius: 2,
        elevation: 2,
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
    }
})