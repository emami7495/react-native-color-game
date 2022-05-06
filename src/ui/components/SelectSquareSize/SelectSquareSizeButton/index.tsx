import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import Text from '../../../kit/Text';
import { changeNumToFa } from '../../../../utils/utils';

interface Props {
  num:number,
  onPress:()=>void,
  isCurrentSize:boolean,
}
const SelectSquareSizeButton:
    React.FC<Props> = function SelectSquareSizeButton({ num, onPress, isCurrentSize }) {
      const { t } = useTranslation();

      const dynamicStyleItems = {
        color: isCurrentSize ? '#000000' : '#ffffff',
        backgroundColor: isCurrentSize ? '#ffffff' : '#000000',
      };
      return (
        <TouchableOpacity
          key={`${num}btn`}
          onPress={onPress}
        >
          <Text style={[styles.buttonText, dynamicStyleItems]}>
            {changeNumToFa(`${num}`)}
            {t('x')}
            {changeNumToFa(`${num}`)}
          </Text>
        </TouchableOpacity>
      );
    };
export default memo(SelectSquareSizeButton);
