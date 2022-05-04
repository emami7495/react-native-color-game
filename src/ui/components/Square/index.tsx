import React, { memo } from 'react';
import { View } from 'react-native';
import SquareItem from '../SquareItem';
import { emptyItem } from '../../../utils/utils';

interface Props{
    time:number,
    square:Array<Array<{num:number, selected:boolean, color:string, hidden:boolean}>>,
    itemsMargin:number,
    itemWidthAndHeight:number,
    squareSideSize:number,
    selectedItem:{num:number, selected:boolean, color:string, hidden:boolean},
    setSelectedItem:(selectedItem: {num:number, selected:boolean, color:string, hidden:boolean})=>void,
    setIsWin:(isWin:boolean)=>void,
    setWinTime:(winTime:number)=>void,
    setSquare:(square:Array<Array<{num:number, selected:boolean, color:string, hidden:boolean}>>)=>void,
}
const Square :React.FC<Props> = function Square({
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
}) {
  const temp = [];
  for (let i = 0; i < squareSideSize; i += 1) {
    const rowArray = [];
    for (let j = 0; j < squareSideSize; j += 1) {
      rowArray.push(
        <SquareItem
          key={`${i}-+-${j}`}
          inputKey={`${i}--${j}`}
          item={square?.[i]?.[j]}
          itemsMargin={itemsMargin}
          squareSideSize={squareSideSize}
          itemWidthAndHeight={itemWidthAndHeight}
          onPress={() => {
            const tmp = [...square];
            if (selectedItem.num !== emptyItem.num) {
              if (selectedItem.color === tmp[i][j].color && selectedItem.num !== tmp[i][j].num) {
                tmp[i][j].hidden = true;
                for (let k = 0; k < squareSideSize; k += 1) {
                  for (let l = 0; l < squareSideSize; l += 1) {
                    if (tmp[k][l].num === selectedItem.num) {
                      tmp[k][l].hidden = true;
                      setSelectedItem(emptyItem);
                      break;
                    }
                  }
                }
              } else {
                for (let k = 0; k < squareSideSize; k += 1) {
                  for (let l = 0; l < squareSideSize; l += 1) {
                    if (tmp[k][l].selected) {
                      tmp[k][l].selected = false;
                    }
                  }
                }
                setSelectedItem(emptyItem);
              }
            } else if (!tmp[i][j].hidden) {
              tmp[i][j].selected = true;
              setSelectedItem(tmp[i][j]);
            }
            //
            let winFlag = 0;
            for (let k = 0; k < squareSideSize; k += 1) {
              for (let l = 0; l < squareSideSize; l += 1) {
                if (!tmp[k][l].hidden) {
                  winFlag += 1;
                }
              }
            }
            if (winFlag === 0) {
              setIsWin(true);
              setWinTime(time);
            }
            //
            setSquare(tmp);
          }}
        />,
      );
    }
    temp.push(<View key={i} style={{ flexDirection: 'row' }}>{rowArray}</View>);
  }
  return (
    <View>
      {[...temp]}
    </View>
  );
};
export default memo(Square);
