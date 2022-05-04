import React, { memo } from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleProp, TextStyle } from 'react-native';

interface Props{
    winTextWidthAndHeight:number
}
const TimerButton:React.FC<Props> = function TimerButton({ winTextWidthAndHeight }) {
  const textStyle : StyleProp<TextStyle> = {
    fontSize: 36,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: winTextWidthAndHeight,
    height: winTextWidthAndHeight,
  };
  return (
    <Animatable.Text
      duration={2000}
      animation="rubberBand"
      easing="ease-out"
      style={textStyle}
      iterationCount="infinite"
    >
      ❤️ YOU WIN ❤️
    </Animatable.Text>
  );
};
export default memo(TimerButton);
