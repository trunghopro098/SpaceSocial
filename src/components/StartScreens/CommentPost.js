import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { windowW, windowH } from '../../util/Dimension'

export default function CommentPost() {
  return (
    <View style={styles.container}>
      <Text>CommentPost</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: windowW,
        height:windowH,
        backgroundColor: "pink"
    }
})