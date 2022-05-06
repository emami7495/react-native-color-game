import React, { memo } from 'react';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import Text from '../../kit/Text';

function DeveloperLabel() {
  const { t } = useTranslation();
  return (
    <Animatable.View duration={2500} animation="fadeInUp" useNativeDriver>
      <Text style={styles.labelText}>{t('developer.name')}</Text>
    </Animatable.View>
  );
}
export default memo(DeveloperLabel);
