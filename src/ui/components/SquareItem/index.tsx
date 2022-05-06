import React, { memo } from 'react';
import {
  StyleProp, TextStyle, ViewStyle, TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Text from '../../kit/Text';
import { changeNumToFa } from '../../../utils/utils';

interface Props {
    inputKey:string,
    item:{num:number, selected:boolean, color:string, hidden:boolean},
    itemsMargin:number,
    itemWidthAndHeight:number,
    squareSideSize:number,
    onPress:()=>void,
}

const SquareItem: React.FC<Props> = function SquareItem({
  inputKey, item, itemsMargin,
  itemWidthAndHeight, squareSideSize, onPress,
}) {
  const dynamicStyleItems:StyleProp<ViewStyle> = !item?.hidden
    ? {
      borderRadius: 4,
      margin: itemsMargin,
      alignItems: 'center',
      borderColor: '#000000',
      justifyContent: 'center',
      width: itemWidthAndHeight,
      height: itemWidthAndHeight,
      backgroundColor: item?.color,
      borderWidth: item?.selected ? (12 - squareSideSize) / 2 : 0,
    } : {
      margin: itemsMargin,
      width: itemWidthAndHeight,
      height: itemWidthAndHeight,
    };
  const textStyle : StyleProp<TextStyle> = { fontSize: 34 - (squareSideSize * 2), fontWeight: '100' };
  return (
    <Animatable.View key={inputKey} duration={2000} useNativeDriver animation="bounceIn">
      <TouchableOpacity style={dynamicStyleItems} onPress={!item?.hidden && !item?.selected ? onPress : () => {}}>
        {!item?.hidden && <Text style={textStyle}>{item?.num ? changeNumToFa(`${item.num}`) : ''}</Text>}
      </TouchableOpacity>
    </Animatable.View>
  );
};
export default memo(SquareItem);
