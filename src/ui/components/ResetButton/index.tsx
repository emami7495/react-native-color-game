import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';

interface Props{
    isWin:boolean,
    onPress:()=>void
}
const ResetButton:React.FC<Props> = function ResetButton({ isWin, onPress }) {
  const { t } = useTranslation();

  return (
    <Animatable.View
      duration={2500}
      animation="fadeInUp"
      useNativeDriver
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          margin: 24,
          width: '50%',
          borderRadius: 4,
          backgroundColor: isWin ? '#49a910' : '#ff5a5a',
        }}
      >
        <Text
          style={{
            margin: 16,
            fontSize: 18,
            fontWeight: '300',
            textAlign: 'center',
            paddingHorizontal: 16,
            color: isWin ? 'white' : 'black',
          }}
        >
          {isWin ? t('start_again') : t('reset')}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};
export default memo(ResetButton);
