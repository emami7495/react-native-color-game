import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
const randomColor = require('randomcolor');
const screenWidth = Dimensions.get('window').width;

const App = () => {
  const [squareSideSize, setSquareSideSize] = useState(4);
  const [squareUi, setSquareUi] = useState([]);
  const [colorArray, setColorArray] = useState(null);
  const [square, setSquare] = useState(new Array(squareSideSize));
  const [selectedItem, setSelectedItem]=useState(null);
  const itemsMargin = 2.5;
  const itemWidthAndHeight = ((screenWidth-(((squareSideSize+1)*2)*itemsMargin)-16)/squareSideSize);
  const winTextWidthAndHeight = (itemWidthAndHeight*squareSideSize)+squareSideSize*2*itemsMargin;
  const [isWin, setIsWin]=useState(false);

  const generateRandomColors = useCallback(() => {
    setIsWin(false);
    const halfArray = randomColor({
      luminosity: 'light',
      format: 'rgba',
      // hue: 'blue',
      alpha: 0.8,
      count: (squareSideSize * squareSideSize) / 2,
    });
    const finalArray = halfArray.concat(halfArray);
    finalArray.sort(() => {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          return -1;
        case 1:
          return 0;
        case 2:
          return 1;
        default:
          break;
      } return 0;
    });
    setColorArray(finalArray);
  },
  [squareSideSize],
  );
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

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < squareSideSize; i += 1) {
      const rowArray = [];
      for (let j = 0; j < squareSideSize; j += 1) {
        rowArray.push(
            <TouchableOpacity
              key={`${i}${j}`}
              onPress={() => {
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
                }
                //
                setSquare(tmp);
              }}
              style={!square?.[i]?.[j]?.hidden?{
                margin: itemsMargin,
                width: itemWidthAndHeight,
                height: itemWidthAndHeight,
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: square?.[i]?.[j]?.color,
                borderWidth: square?.[i]?.[j]?.selected ? itemsMargin : 0,
                borderColor: '#000000',
              }:{
                margin: itemsMargin,
                width: itemWidthAndHeight,
                height: itemWidthAndHeight,
              }}
            >
              {!square?.[i]?.[j]?.hidden&&
                  <Text style={{fontSize: 34-(squareSideSize*2), fontWeight: '100'}}>
                    {square?.[i]?.[j]?.num}
                  </Text>}
            </TouchableOpacity>,
        );
      }
	  temp.push(<View key={i} style={{flexDirection: 'row'}}>{rowArray}</View>);
    }
    setSquareUi([...temp]);
  }, [square]);

  useEffect(() => {
    generateRandomColors();
  }, []);

  useEffect(()=>{
    generateRandomColors();
  }, [squareSideSize]);

  const renderButtons=()=> {
    const buttons= [];
    for (let i = 2; i <=10; i++) {
      buttons.push(
          <TouchableOpacity
            key={i+'btn'}
            onPress={()=>{
              setSquareSideSize(1);
              setSquareSideSize(i);
            }}>
            <Text
              style={{fontSize: 10,
                borderRadius: 4,
                marginHorizontal: 2.5,
                paddingHorizontal: 4,
                paddingVertical: 6,
                backgroundColor: '#000000',
                color: '#ffffff',
                fontWeight: '300'}}>
              {i} X {i}
            </Text>
          </TouchableOpacity>);
    }
    return <View style={{flexDirection: 'row'}}>{buttons}</View>;
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {renderButtons()}
        <Text
          style={{
            textAlign: 'center',
            margin: 16,
            fontWeight: '200',
            fontSize: 18,
          }}>
          Click On The Same Colors
        </Text>
        {!isWin?squareUi:<Text
          style={{fontWeight: '200',
            fontSize: 36,
            width: winTextWidthAndHeight,
            height: winTextWidthAndHeight,
            textAlign: 'center',
            textAlignVertical: 'center'}}>
          YOU WIN!
        </Text>}
        <TouchableOpacity
          onPress={()=>{
            generateRandomColors();
          }}
          style={{width: '50%',
            backgroundColor: isWin?'#49a910':'#ff5a5a',
            margin: 16, borderRadius: 4}}>
          <Text
            style={{
              color: isWin?'white':'black',
              textAlign: 'center',
              margin: 16,
              fontWeight: '300',
              fontSize: 18,
              paddingHorizontal: 16,
            }}>
            {isWin?'Start Again':'Reset'}
          </Text>
        </TouchableOpacity>
        <Text style={{marginTop: 16,
          fontSize: 12,
          fontWeight: '200'}}>
          Developed By Mostafa Emami
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default App;
