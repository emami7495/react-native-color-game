import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {getTime} from '../../../utils/utils';


const TimerButton = ({isWin, winTime, time, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '50%',
        marginVertical: 24, borderRadius: 4,
        backgroundColor: isWin?'#49a910':'#ff5a5a',
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
  );
};
export default memo(TimerButton);
