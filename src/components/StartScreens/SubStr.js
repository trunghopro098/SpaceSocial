import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'

export default function SubStr({text, lengths}) {
    const [Showmessage, setShowmessage] = useState(false);
  return (
    <View>
    {Showmessage ? 
        <View>
            <Text>{text}</Text>
            <TouchableOpacity onPress={()=>{
                setShowmessage(!Showmessage)
            }}>
                <Text style={{ textDecorationLine: 'underline', color: '#1DA3E9', fontStyle:'italic' }}>
                    Ẩn bớt
                </Text>
            </TouchableOpacity>
        </View>
        :
        <View>
            {text.length > lengths ? 
                    <>
                        <Text>{text.substring(0,lengths)+' ...'}</Text>
                        <TouchableOpacity
                            onPress={()=>{
                                setShowmessage(!Showmessage)
                            }}
                        >
                            <Text style={{ textDecorationLine: 'underline', color: '#1DA3E9', fontStyle:'italic' }}>
                                Xem thêm
                            </Text>
                        </TouchableOpacity>
                    </>:
                    <>
                         <Text>{text}</Text>
                    </>
            }

        </View>
        
        
    }

</View>

  )
}