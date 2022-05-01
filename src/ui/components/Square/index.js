import React, {memo} from 'react';
import {View} from 'react-native';
import SquareItem from '../SquareItem';

const Square = ({
  time,
  square,
  itemsMargin,
  itemWidthAndHeight,
  squareSideSize,
  selectedItem,
  setSelectedItem,
  setIsWin,
  setWinTime,
  setSquare,
}) => {
  const temp = [];
  for (let i = 0; i < squareSideSize; i += 1) {
    const rowArray = [];
    for (let j = 0; j < squareSideSize; j += 1) {
      rowArray.push(
          <SquareItem
            key={i+'-'+j}
            item={square?.[i]?.[j]}
            itemsMargin={itemsMargin}
            squareSideSize={squareSideSize}
            itemWidthAndHeight={itemWidthAndHeight}
            onPress={()=>{
              {
                const tmp = [...square];
                if (selectedItem) {
                  if (selectedItem.color===tmp[i][j].color && selectedItem.num!==tmp[i][j].num) {
                    tmp[i][j].hidden = true;
                    for (let k = 0; k < squareSideSize; k++) {
                      for (let l = 0; l < squareSideSize; l++) {
                        if (tmp[k][l].num===selectedItem.num) {
                          tmp[k][l].hidden=true;
                          setSelectedItem(null);
                          break;
                        }
                      }
                    }
                  }
                  else {
                    for (let k = 0; k < squareSideSize; k++) {
                      for (let l = 0; l < squareSideSize; l++) {
                        if (tmp[k][l].selected) {
                          tmp[k][l].selected=false;
                          break;
                        }
                      }
                    }
                    setSelectedItem(null);
                  }
                }
                else {
                  tmp[i][j].selected = true;
                  setSelectedItem(tmp[i][j]);
                }
                //
                let winFlag=0;
                for (let k = 0; k < squareSideSize; k++) {
                  for (let l = 0; l < squareSideSize; l++) {
                    if (!tmp[k][l].hidden) {
                      winFlag+=1;
                    }
                  }
                }
                if (winFlag===0) {
                  setIsWin(true);
                  setWinTime(time);
                }
                //
                setSquare(tmp);
              }
            }}/>);
    }
    temp.push(<View key={i} style={{flexDirection: 'row'}}>{rowArray}</View>);
  }
  return (
    [...temp]
  );
};
export default memo(Square);
