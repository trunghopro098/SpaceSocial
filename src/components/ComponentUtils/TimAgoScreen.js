import { View, Text } from "react-native";
import React, {useEffect,useState} from "react";
import { StyleSheet } from "react-native";
import { timeAgo } from "../../util/timeAgo";

export default function TimeAgoScreen ({time,style}) {
    const [CurrentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now())
        }, 1000);
    
        return () => {
          clearInterval(interval);
        }
      }, [])

    return(
       <View style={styles.dateRoomchat}>
            <Text style={{...style}}>{timeAgo(CurrentTime, time)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dateRoomchat:{

    }
})