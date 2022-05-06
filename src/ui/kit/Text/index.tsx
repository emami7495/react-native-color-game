import React, { memo } from 'react';
import { Text as T } from 'react-native';
import styles from './styles';

// Text
function Text({ style, ...props }:any) {
  return <T style={[styles.root, style]} {...props} />;
}

export default memo(Text);
