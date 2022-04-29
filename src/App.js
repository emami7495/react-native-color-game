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
  const itemWidthAndHeight = (screenWidth/squareSideSize)-(12);

  const generateRandomColors = useCallback(() => {
    const halfArray = randomColor({
      luminosity: 'light',
      format: 'rgba',
      hue: 'blue',
      alpha: 0.75,
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
                setSquare(tmp);
              }}
              style={!square?.[i]?.[j]?.hidden?{
                margin: 4,
                width: itemWidthAndHeight,
                height: itemWidthAndHeight,
                borderRadius: 12, alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: square?.[i]?.[j]?.color,
                borderWidth: square?.[i]?.[j]?.selected ? 3 : 0,
                borderColor: '#49a910',
              }:{
                margin: 4,
                width: itemWidthAndHeight,
                height: itemWidthAndHeight,
              }}
            >
              {!square?.[i]?.[j]?.hidden&&
                  <Text style={{fontSize: 32-squareSideSize, fontWeight: '100'}}>
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
    for (let i = 2; i <9; i++) {
      buttons.push(
          <TouchableOpacity onPress={()=>{
            setSquareSideSize(i);
          }}>
            <Text
              style={{borderRadius: 4,
                marginHorizontal: 4,
                padding: 6,
                backgroundColor: '#5e9bea'}}>
              {i}X{i}
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
            fontSize: 22,
          }}>
          CLICK ON THE SAME COLORS
        </Text>
        {squareUi}
        <TouchableOpacity
          onPress={()=>{
            generateRandomColors();
          }}
          style={{backgroundColor: '#ff5a5a', margin: 16, borderRadius: 12}}>
          <Text style={{
            textAlign: 'center',
            margin: 16,
            fontWeight: '400',
            fontSize: 22,
          }}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default App;
