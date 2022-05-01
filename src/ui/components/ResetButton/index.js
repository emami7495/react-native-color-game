import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';


const ResetButton = ({isWin, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        margin: 24,
        width: '50%',
        borderRadius: 4,
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
        {isWin?'Start Again':'Reset'}
      </Text>
    </TouchableOpacity>
  );
};
export default memo(ResetButton);
