import React, { memo } from 'react';
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

function DeveloperLabel() {
  return (
    <Animatable.View
      duration={2500}
      animation="fadeInUp"
      useNativeDriver
    >
      <Text
        style={styles.labelText}
      >
        Developed By Mostafa Emami
      </Text>
    </Animatable.View>
  );
}
export default memo(DeveloperLabel);
