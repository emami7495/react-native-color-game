import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import styles from './styles';
import APP_CONSTANTS from '../../../constants/app';
import TimerButton from '../../components/TimerButton';
import ResetButton from '../../components/ResetButton';
import DeveloperLabel from '../../components/DeveloperLabel';
import WinText from '../../components/WinText';
import SelectSquareSizeRow from '../../components/SelectSquareSize/SelectSquareSizeRow';
import {createColorArray} from '../../../utils/utils';
import Square from '../../components/Square';

const Game = () => {
  const [time, setTime]=useState(0);
  const [isWin, setIsWin]=useState(false);
  const [winTime, setWinTime]=useState(0);
  const [squareSideSize, setSquareSideSize] = useState(4);
  const [colorArray, setColorArray] = useState(null);
  const [selectedItem, setSelectedItem]=useState(null);
  const [square, setSquare] = useState(new Array(squareSideSize));
  //
  const itemsMargin = 2.5;
  const itemWidthAndHeight = ((APP_CONSTANTS.screenWidth-(((squareSideSize+1)*2)*itemsMargin)-16)/squareSideSize);
  const winTextWidthAndHeight = (itemWidthAndHeight*squareSideSize)+squareSideSize*2*itemsMargin;


  useEffect(() => {
    const tmp = [...square];
    if (colorArray) {
      for (let i = 0; i < squareSideSize; i += 1) {
        tmp[i] = new Array(squareSideSize);
      }
      let counter = 1;
      for (let i = 0; i < squareSideSize; i += 1) {
        for (let j = 0; j < squareSideSize; j += 1) {
          tmp[i][j] = {
            num: counter,
            selected: false,
            color: colorArray?.[counter - 1],
            hidden: false,
          };
          counter += 1;
        }
      }
      //
      if (squareSideSize%2===1) {
        for (let i = 0; i < squareSideSize; i += 1) {
          for (let j = 0; j < squareSideSize; j += 1) {
            let flag=0;
            for (let k = 0; k < squareSideSize; k += 1) {
              for (let l = 0; l < squareSideSize; l += 1) {
                if (tmp[i][j].color===tmp[k][l].color && !(i===k&&j===l)) {
                  flag+=1;
                }
              }
            }
            if (flag===0) {
              tmp[i][j].hidden=true;
            }
          }
        }
      }
      //
      setSquare(tmp);
    }
  }, [colorArray]);

  const generateRandomColors = useCallback(() => {
    setTime(0);
    setWinTime(0);
    setIsWin(false);
    setColorArray(createColorArray(squareSideSize));
  }, [squareSideSize]);

  useEffect(()=>{
    const timer = setTimeout(()=>setTime(time+1), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  useEffect(()=>{
    generateRandomColors();
  }, [squareSideSize]);

  return (
    <SafeAreaView style={styles.container}>
      <SelectSquareSizeRow onPress={i=>setSquareSideSize(i)} squareSideSize={squareSideSize}/>
      <TimerButton time={time} isWin={isWin} winTime={winTime} onPress={()=>{generateRandomColors();}}/>
      {!isWin? <Square time={time} square={square} itemsMargin={itemsMargin} selectedItem={selectedItem}
        squareSideSize={squareSideSize} itemWidthAndHeight={itemWidthAndHeight} setIsWin={isWin=>{setIsWin(isWin);}}
        setSquare={square=>{setSquare(square);}} setWinTime={winTime=>{setWinTime(winTime);}}
        setSelectedItem={selectedItem=>{setSelectedItem(selectedItem);}}
      /> :
          <WinText winTextWidthAndHeight={winTextWidthAndHeight}/>}
      <ResetButton isWin={isWin} onPress={()=>{generateRandomColors();}}/>
      <DeveloperLabel/>
    </SafeAreaView>
  );
};
export default Game;
