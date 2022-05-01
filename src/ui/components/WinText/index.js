import React, {memo} from 'react';
import * as Animatable from 'react-native-animatable';

const TimerButton = ({winTextWidthAndHeight}) => {
  return (
    <Animatable.Text
      duration={1000}
      animation="pulse"
      easing="ease-out"
      iterationCount="infinite"
      style={{
        fontSize: 36,
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: winTextWidthAndHeight,
        height: winTextWidthAndHeight,
      }}>
          ❤️ YOU WIN !
    </Animatable.Text>
  );
};
export default memo(TimerButton);
