import React, { memo, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import { changeNumToFa, getTime } from '../../../utils/utils';
import Text from '../../kit/Text';

interface Props{
    time:number,
    isWin:boolean,
    winTime:number,
    userErrorCount:number,
}
const TimerButton: React.FC<Props> = function TimerButton({
  time, isWin, winTime, userErrorCount,
}) {
  let avRef:any;
  const { t } = useTranslation();

  useEffect(() => {
    if (avRef) avRef.rubberBand(1000);
  }, [userErrorCount]);
  return (
    <Animatable.View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      duration={2500}
      useNativeDriver
      animation="fadeInDown"
    >
      <TouchableOpacity
        style={{
          borderRadius: 128,
          marginVertical: 24,
          marginHorizontal: 4,
          backgroundColor: isWin ? '#49a910' : '#4c93da',
        }}
      >
        <Text
          style={{
            margin: 16,
            fontSize: 14,
            fontWeight: '300',
            textAlign: 'center',
            paddingHorizontal: 4,
            color: 'white',
          }}
        >
          {t('time')}
          {' : '}
          {changeNumToFa(isWin ? getTime(winTime + 1) : getTime(time))}
        </Text>
      </TouchableOpacity>

      <Animatable.View
        ref={(node) => {
          if (node) {
            avRef = node;
          }
        }}
        duration={1000}
        animation={userErrorCount !== 0 ? 'rubberBand' : undefined}
      >
        <TouchableOpacity
          style={{
            marginVertical: 24,
            borderRadius: 128,
            backgroundColor: userErrorCount !== 0 ? '#ff5a5a' : '#4c93da',
            marginHorizontal: 4,
          }}
        >
          <Text style={{
            margin: 16,
            fontSize: 14,
            color: 'white',
            fontWeight: '300',
            textAlign: 'center',
            paddingHorizontal: 4,
          }}
          >
            {userErrorCount !== 0 ? `${t('mistake')} : ${changeNumToFa(`${userErrorCount}`)}` : t('no.mistake')}
          </Text>
        </TouchableOpacity>
      </Animatable.View>

    </Animatable.View>
  );
};
export default memo(TimerButton);
