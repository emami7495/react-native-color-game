import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';


const SelectSquareSizeButton = ({num, onPress, isCurrentSize}) => {
  const dynamicStyleItems = {
    color: isCurrentSize?'#000000':'#ffffff',
    backgroundColor: isCurrentSize?'#ffffff':'#000000',
  };
  return (
    <TouchableOpacity
      key={num+'btn'}
      onPress={onPress}>
      <Text style={[styles.buttonText, dynamicStyleItems]}>{num}X{num}</Text>
    </TouchableOpacity>
  );
};
export default memo(SelectSquareSizeButton);
