import { View, Text, FlatList, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';


export default function NotificationScreen() {
  const {dataNotification,quantityNotificationUnread} = useSelector(e=>e.NotificationReducer);


  const renderItem = ({item})=> {
    return(
      <TouchableOpacity
        style={styles.wrapperItemNotification}
      >
        <View 
          style={{
            flexDirection:'row'
          }}
        >
          <Text style={{fontWeight:'bold',marginRight:5}}>{`${item.firstName} ${item.lastName}`}</Text>
          <Text>{item.description}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  
  return (
    <View>
      <FlatList 
        data={dataNotification}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom:50}}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  wrapperItemNotification:{
    backgroundColor:'red',
    marginTop:10,
    marginHorizontal:10,
    borderRadius:5,
    padding:10,
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
})