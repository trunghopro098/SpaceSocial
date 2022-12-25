import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function CallTime({times}) {
    const [mins, setMins] = useState(0)
    const [second, setSecond] = useState(0)
    const [hour, setHour] = useState(0)
    
    useEffect(() => {
        setSecond(times % 60);
        setMins(Math.floor(times / 60) % 60);
        setHour(Math.floor(times / 3600)% 24);
    }, [times])

  return (

    <Text style={{ color: 'white', textAlign:'center', fontSize:12 }}>{hour} giờ : {mins} phút : {second} giây</Text>
  
  )
}