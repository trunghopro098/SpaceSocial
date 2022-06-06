import { View, Text, ScrollView, StyleSheet, FlatList} from 'react-native'
import React from 'react'
import { windowH, windowW } from '../../util/Dimension'

export default function FriendUser({DataFriend, navigation}) {

    const renderItem = ({item}) =>{
        return(
            <View>
                <Text>{item.firstName}</Text>
            </View>
        )
    }
  return (
    <View style={styles.container}>
        {DataFriend.length > 0 ? 
                <FlatList
                    data={DataFriend}
                    renderItem={renderItem}
                    keyExtractor={item=>item.id}
                    showsVerticalScrollIndicator={false}
                    
                />:
                <View>
                    <Text>HIỆN KHÔNG BẠN BÈ</Text>
                </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})