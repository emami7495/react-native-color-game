import React, { memo } from 'react';
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import styles from './styles';

function DeveloperLabel() {
  const { t } = useTranslation();
  return (
    <Animatable.View duration={2500} animation="fadeInUp" useNativeDriver>
      <Text style={styles.labelText}>{t('developer_name')}</Text>
    </Animatable.View>
  );
}
export default memo(DeveloperLabel);
