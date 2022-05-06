import React, { memo } from 'react';
import { Text as T } from 'react-native';
import styles from './styles';
import APP_CONSTANTS from '../../../constants/app';

// Text
function Text({ style, ...props }:any) {
  if (APP_CONSTANTS.os === 'ios') {
    return <T style={style} {...props} />;
  }
  return <T style={[styles.root, style]} {...props} />;
}

export default memo(Text);
