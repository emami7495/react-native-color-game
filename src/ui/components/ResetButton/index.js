import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';


const ResetButton = ({isWin, onPress}) => {
  return (
    <Animatable.View
      duration={2500}
      animation="fadeInUp"
      useNativeDriver={true}
    >
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
    </Animatable.View>
  );
};
export default memo(ResetButton);
