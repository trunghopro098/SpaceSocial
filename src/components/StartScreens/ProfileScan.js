import React from 'react';
import {Text,View} from 'react-native';

function ProfileScan({route}){
    const {idUser} = route.params;
    return(
        <View>
            <Text>{idUser}</Text>
        </View>
    )
}

export default ProfileScan;