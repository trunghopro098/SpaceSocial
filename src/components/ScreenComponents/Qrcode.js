import { View, StyleSheet } from 'react-native'
import React from 'react'
import QRCode from 'react-qr-code'

export default function Qrcode({idUser}) {
  return (
    <View style={styles.container}>
      <QRCode value={JSON.stringify({ "idUser":idUser, type:"space_social" })} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        marginTop: 20
    }
})