import React, { memo } from 'react';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import Text from '../../kit/Text';

function ChangeLangButton() {
  const { t, i18n } = useTranslation();
  return (
    <Animatable.View
      duration={2500}
      animation="fadeInUp"
      useNativeDriver
    >
      <Text
        style={styles.labelText}
        onPress={() => {
          if (i18n.language === 'fa') {
            i18n.changeLanguage('en', () => {
            }).then(() => {});
          } else if (i18n.language === 'en') {
            i18n.changeLanguage('fa', () => {
            }).then(() => {});
          }
        }}
      >
        {t('change.lang')}
      </Text>
    </Animatable.View>
  );
}
export default memo(ChangeLangButton);
