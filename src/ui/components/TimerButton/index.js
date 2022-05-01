import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {getTime} from '../../../utils/utils';
import * as Animatable from 'react-native-animatable';


const TimerButton = ({isWin, winTime, time, onPress}) => {
  return (
    <Animatable.View
      duration={2500}
      useNativeDriver={true}
      animation="fadeInDown"
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: '50%',
          marginVertical: 24, borderRadius: 4,
          backgroundColor: isWin?'#49a910':'#4c93da',
        }}>
        <Text
          style={{
            margin: 16,
            fontSize: 18,
            fontWeight: '300',
            textAlign: 'center',
            paddingHorizontal: 16,
            color: isWin?'white':'black',
          }}>
          {isWin?getTime(winTime+1):getTime(time)}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};
export default memo(TimerButton);
