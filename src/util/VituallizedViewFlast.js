import React from 'react';
import {FlatList,ScrollView} from 'react-native';

export default function VirtualizedViewFlaslist(props) {

    return (
      <FlatList
        style={{flex:1}}
        data={[]}
        ListEmptyComponent={null}
        keyExtractor={() => "dummy"}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <React.Fragment>{props.children}</React.Fragment>
        )}
      >
        
      </FlatList>
    );
  }