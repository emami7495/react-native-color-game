import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

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
  const [isWin, setIsWin]=useState(false);
  const [squareSideSize, setSquareSideSize] = useState(4);
  const [squareUi, setSquareUi] = useState([]);
  const [colorArray, setColorArray] = useState(null);
  const [selectedItem, setSelectedItem]=useState(null);
  const [square, setSquare] = useState(new Array(squareSideSize));
  //
  const itemsMargin = 2.5;
  const itemWidthAndHeight = ((screenWidth-(((squareSideSize+1)*2)*itemsMargin)-16)/squareSideSize);
  const winTextWidthAndHeight = (itemWidthAndHeight*squareSideSize)+squareSideSize*2*itemsMargin;
  //

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
            <Animatable.View
              key={`${i}${j}`}
              animation="bounceIn"
              duration={2000}
              useNativeDriver={true}
            >
              <TouchableOpacity
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
              </TouchableOpacity>
            </Animatable.View>,
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
      const isCurrentSize = i===squareSideSize;
      buttons.push(
          <TouchableOpacity
            key={i+'btn'}
            onPress={()=>{
              setSquareSideSize(1);
              setSquareSideSize(i);
            }}>
            <Text
              style={{fontSize: 12,
                textAlign: 'center',
                textAlignVertical: 'center',
                borderRadius: 4,
                marginHorizontal: 2.5,
                paddingHorizontal: 4,
                paddingVertical: 6,
                backgroundColor: isCurrentSize?'#ffffff':'#000000',
                color: isCurrentSize?'#000000':'#ffffff',
                borderWidth: 1,
                borderColor: '#000000',
                fontWeight: '300'}}>
              {i}X{i}
            </Text>
          </TouchableOpacity>);
    }
    return (
      <Animatable.View
        duration={2500}
        animation="fadeInDown"
        useNativeDriver={true}
      >
        <View style={{flexDirection: 'row'}}>{buttons}</View>
      </Animatable.View>);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {renderButtons()}
        <Animatable.View
          duration={2500}
          animation="zoomIn"
          useNativeDriver={true}
        >
          <Text
            style={{
              textAlign: 'center',
              margin: 16,
              fontWeight: '200',
              fontSize: 18,
            }}>
            {isWin?'congratulation!':'Click On The Same Colors'}
          </Text>
        </Animatable.View>
        {!isWin?
            squareUi :
            <Animatable.Text
              duration={1000}
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              style={{
                color: '#000000',
                fontSize: 36,
                fontWeight: 'bold',
                textAlign: 'center',
                textAlignVertical: 'center',
                width: winTextWidthAndHeight,
                height: winTextWidthAndHeight,
              }}>
                ❤️ YOU WIN! </Animatable.Text>
        }
        <TouchableOpacity
          onPress={()=>{
            generateRandomColors();
          }}
          style={{width: '50%',
            backgroundColor: isWin?'#49a910':'#ff5a5a',
            margin: 24, borderRadius: 4}}>
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
        <Animatable.View
          duration={2500}
          animation="fadeInUp"
          useNativeDriver={true}
        >
          <Text style={{marginTop: 0,
            fontSize: 12,
            fontWeight: '200'}}>
          Developed By Mostafa Emami
          </Text>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};
export default App;
