import React, { memo } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import SelectSquareSizeButton from '../SelectSquareSizeButton';

interface Props{
  squareSideSize:number,
  onPress:(name: number) => void,
}
const SelectSquareSizeRow :
    React.FC<Props> = function SelectSquareSizeRow({ squareSideSize, onPress }) {
      const buttons = [];
      for (let i = 2; i <= 10; i += 1) {
        buttons.push(
          <SelectSquareSizeButton
            key={`${i}-btn`}
            num={i}
            onPress={() => onPress(i)}
            isCurrentSize={i === squareSideSize}
          />,
        );
      }
      return (
        <Animatable.View
          duration={2500}
          useNativeDriver
          animation="fadeInDown"
        >
          <View style={{ flexDirection: 'row' }}>{buttons}</View>
        </Animatable.View>
      );
    };
export default memo(SelectSquareSizeRow);
