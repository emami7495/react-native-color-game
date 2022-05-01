import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';


const SquareItem = ({key, item, itemsMargin, itemWidthAndHeight, squareSideSize, onPress}) => {
  const dynamicStyleItems = !item?.hidden?
      {
        borderRadius: 4,
        margin: itemsMargin,
        alignItems: 'center',
        borderColor: '#000000',
        justifyContent: 'center',
        width: itemWidthAndHeight,
        height: itemWidthAndHeight,
        backgroundColor: item?.color,
        borderWidth: item?.selected ? itemsMargin : 0,
      }:{
        margin: itemsMargin,
        width: itemWidthAndHeight,
        height: itemWidthAndHeight,
      };
  const textStyle={fontSize: 34-(squareSideSize*2), fontWeight: '100'};
  return (
    <Animatable.View
      key={key}
      duration={2000}
      animation="bounceIn"
      useNativeDriver={true}
    >
      <TouchableOpacity
        onPress={onPress}
        style={dynamicStyleItems}
      >
        {!item?.hidden && <Text style={textStyle}>{item?.num}</Text>}
      </TouchableOpacity>
    </Animatable.View>
  );
};
export default memo(SquareItem);
