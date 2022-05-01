import React, {memo} from 'react';
import {View} from 'react-native';
import SelectSquareSizeButton from '../SelectSquareSizeButton';
import * as Animatable from 'react-native-animatable';


const SelectSquareSizeRow = ({squareSideSize, onPress}) => {
  const buttons= [];
  for (let i = 2; i <=10; i++) {
    buttons.push(
        <SelectSquareSizeButton
          num={i}
          onPress={()=>onPress(i)}
          isCurrentSize={i===squareSideSize}
        />,
    );
  }
  return (
    <Animatable.View
      duration={2500}
      useNativeDriver={true}
      animation="fadeInDown"
    >
      <View style={{flexDirection: 'row'}}>{buttons}</View>
    </Animatable.View>);
};
export default memo(SelectSquareSizeRow);
