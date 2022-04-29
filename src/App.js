import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
const randomColor = require('randomcolor'); // import the script

function App() {
  const [squareSideSize] = useState(4);
  const [square, setSquare] = useState(new Array(squareSideSize).fill(new Array(squareSideSize)));
  const [colorArray, setColorArray] = useState(null);
  const squareUi = [];
  //
  const generateRandomColors = useCallback(
    () => {
      const halfArray = randomColor({
        luminosity: 'light',
        format: 'rgba',
        hue: 'blue',
        alpha: 0.50,
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
    [],
  );

  function renderItem(row, itemNum) {
    return (
      <TouchableOpacity
        key={`${row}${itemNum}`}
        onPress={() => {
          const temp = [...square];
          temp[row][itemNum].selected = true;
          setSquare(temp);
        }}
        style={{
          margin: 4,
          width: 56,
          height: 56,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: square[row][itemNum].color,
          borderWidth: square[row][itemNum].selected ? 4 : 0,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: '100',
          }}
        >
          {square[row][itemNum].num}
        </Text>
      </TouchableOpacity>
    );
  }
  //
  function renderRow(row) {
    const rowArray = [];
    for (let i = 0; i < squareSideSize; i += 1) {
      rowArray.push(renderItem(row, i));
    }
    return <View style={{ flexDirection: 'row' }}>{rowArray}</View>;
  }
  //
  function generateSquare() {
    for (let i = 0; i < squareSideSize; i += 1) {
      square[i] = new Array(squareSideSize);
    }
    //
    let counter = 1;
    for (let i = 0; i < squareSideSize; i += 1) {
      for (let j = 0; j < squareSideSize; j += 1) {
        square[i][j] = {
          num: counter,
          selected: false,
          color: colorArray[counter - 1],
        };
        counter += 1;
      }
    }
    //
    for (let i = 0; i < squareSideSize; i += 1) {
      squareUi.push(renderRow(i));
    }
    return (<View style={{ flexDirection: 'column' }}>{squareUi}</View>);
  }
  //
  useEffect(() => {
  }, [square]);
  //
  useEffect(() => {
    generateRandomColors();
  }, []);
  //
  if (colorArray) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          {generateSquare()}
        </View>
      </SafeAreaView>
    );
  }
  return <View />;
}

export default App;
