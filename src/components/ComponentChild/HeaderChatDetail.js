import { View, Text} from 'react-native'
import React from 'react'

export default function HeaderChatDetail(props) {
  return (
    <View style={{ marginLeft: -20 }}>
        <Text>{props.id}</Text>
    </View>
  )
}