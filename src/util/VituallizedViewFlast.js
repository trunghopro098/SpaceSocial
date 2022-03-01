import React from 'react';
import {FlatList,ScrollView} from 'react-native';

export default function VirtualizedViewFlaslist(props) {

    return (
      <FlatList
        data={[]}
        ListEmptyComponent={null}
        keyExtractor={() => "dummy"}
        renderItem={null}
        ListHeaderComponent={() => (
          <React.Fragment>{props.children}</React.Fragment>
        )}
      >
        
      </FlatList>
    );
  }