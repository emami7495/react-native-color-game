import { Dimensions, Platform } from 'react-native';

const APP_CONSTANTS = {
  randomColor: require('randomcolor'),
  screenWidth: Dimensions.get('window').width,
  os: Platform.OS,
};
export default APP_CONSTANTS;
