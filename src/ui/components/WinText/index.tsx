import React, { memo } from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleProp, TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import Text from '../../kit/Text';

interface Props{
    winTextWidthAndHeight:number
}
const TimerButton:React.FC<Props> = function TimerButton({ winTextWidthAndHeight }) {
  const { t } = useTranslation();

  const textStyle : StyleProp<TextStyle> = {
    fontSize: 36,
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: winTextWidthAndHeight,
    height: winTextWidthAndHeight,
  };
  return (
    <Animatable.View
      duration={2000}
      easing="ease-out"
      animation="rubberBand"
      iterationCount="infinite"
    >
      <Text style={textStyle}>
        ❤️
        {' '}
        {t('you.win')}
        {' '}
        ❤️
      </Text>
    </Animatable.View>
  );
};
export default memo(TimerButton);
