import { View, Text, StyleSheet, FlatList,TouchableOpacity,Image } from 'react-native'
import React, { memo, useEffect,useState } from 'react'
import * as FetchAPI from "../../util/fetchApi";
import { windowH, windowW } from '../../util/Dimension';
import { useNavigation } from '@react-navigation/native';
import {API_URL} from "@env"
function FriendUser({idUser}) {
    const navigation = useNavigation();
    const [dataFriend, setdataFriend] = useState([]);

    useEffect(() => {
        getDataFriend()
    }, [])
    
    const getDataFriend = async()=>{
        const data = {"idUser": idUser};
        const res = await FetchAPI.postDataAPI("/user/getFriendById",data);
        setdataFriend(res.msg);
        console.log(res)
    }

    console.log("render")
    const renderItem = ({item}) =>{
        return(
            <TouchableOpacity
                onPress={()=>{
                    navigation.push("profile",{"idUser":item.idUser})
                }}
                style={styles.wrapitem}
            >                   
                {item.avatar === null ?
                        <Image 
                            source={require('../../../assets/img/avatar.jpg')}
                            style={ styles.image}
                            resizeMode='cover'
                            />:
                        <Image 
                            source={{ uri:API_URL+item.avatar}}
                            style={ styles.image}
                            resizeMode='cover'
                        />
                }
                <Text style={{ fontWeight:'bold' }}>{item.firstName} {item.lastName}</Text>
            </TouchableOpacity>
        )
    }
  return (
    <View style={styles.container}>
        {dataFriend.length > 0 ? 
                <FlatList
                    numColumns={2}
                    data={dataFriend}
                    renderItem={renderItem}
                    keyExtractor={item=>item.id}
                    showsVerticalScrollIndicator={false}
                    
                />:
                <View>
                    <Text>Hiện không có bạn bè nào!!!</Text>
                </View>
        }
    </View>
  )
}
export default React.memo(FriendUser)
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft: windowW*0.02,
        paddingTop: 10
    },
    wrapitem:{
        backgroundColor:'white',
        width:windowW*0.47,
        height: 190,
        marginRight:windowW*0.02,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:2,
            height: 4
        },
        shadowOpacity: .4,
        shadowRadius: 4,
        elevation: 3
    
    },
    image:{
        width: "89%",
        height: "89%",
        borderRadius:10,
        // borderWidth: 8,
        // borderColor:"#F5F6F7",
    }

})