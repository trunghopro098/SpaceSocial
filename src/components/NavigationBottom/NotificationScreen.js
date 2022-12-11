import { View, Text, FlatList, TouchableOpacity,StyleSheet, Image, SafeAreaView, Platform } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { API_URL } from '../../util/config';
import { timeAgo } from '../../util/timeAgo';
import { LinearTextGradient } from 'react-native-text-gradient';
import TimeAgoScreen from '../ComponentUtils/TimAgoScreen';
export default function NotificationScreen() {
  const {dataNotification} = useSelector(e=>e.NotificationReducer);
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const renderItem = ({item})=> {
    return(
      <TouchableOpacity
        style={item.read===1? styles.wrapperItemNotification : {...styles.wrapperItemNotification,backgroundColor:'	rgb(192,192,192)'}}
      >
        <View
          style={{
            marginRight:10
          }}
        >
        {item.avatar === null ?
          <Image 
              source={require('../../../assets/img/avatar.jpg')}
              style={{ width: 50, height: 50, borderRadius:50 }}
              resizeMode='cover'
              />:
          <Image 
              source={{ uri:API_URL+item.avatar}}
              style={{ width: 50, height: 50, borderRadius:50 }}
              resizeMode='cover'
          />
        }
        </View>
        <View
          style={{
            flex:1,
            flexDirection:'column',
            justifyContent: 'space-between'
          }}
        >
          <View 
            style={{
              flex:1,
              flexDirection:'row',
              flexWrap:'wrap',
            }}
          >
            <Text style={{flex:1,flexWrap:'wrap'}}>
              <Text style={{fontWeight:'bold',marginRight:5}}>{`${item.firstName} ${item.lastName} `}</Text>
              <Text>{`${item.description}`}</Text>
            </Text>
          </View>
          <TimeAgoScreen time={item.create_at} style={{color:'gray'}}/>
        </View>
      </TouchableOpacity>
    )
  }
  
  return (
    <SafeAreaView>
      <LinearTextGradient
        locations={[0,1]}
        colors={['red','blue']}
        start={{ x:0,y:0 }}
        end={{ x:1, y:0 }}
        style={{
          fontWeight:'bold',
          fontSize: 20,
          // color:'black',
          paddingVertical:5,
          paddingLeft: 15
        }}
      >
      <Text>
        Thông báo
      </Text>
      </LinearTextGradient>
      <FlatList 
        data={dataNotification}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom:"28%"}}
      />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  wrapperItemNotification:{
    flexDirection:'row',
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