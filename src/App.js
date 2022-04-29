import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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

const App = () => {
  const [squareSideSize] = useState(4);
  const [squareUi, setSquareUi] = useState([]);
  const [colorArray, setColorArray] = useState(null);
  const [square, setSquare] = useState(new Array(squareSideSize));

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
  [],
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
        rowArray.push(<TouchableOpacity
          key={`${i}${j}`}
          onPress={() => {
            const tmp = [...square]; tmp[i][j].selected = true;
		      setSquare(tmp);
          }}
          style={{
            margin: 4,
            width: 56,
		    height: 56,
		    borderRadius: 12,
		    alignItems: 'center',
            justifyContent: 'center',
		    backgroundColor: square?.[i]?.[j]?.color,
            borderWidth: square?.[i]?.[j]?.selected ? 3 : 0,
		    borderColor: '#49a910',
          }}
        >
          <Text style={{fontSize: 32, fontWeight: '100'}}>
            {square?.[i]?.[j]?.num}
          </Text>
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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            margin: 16,
            fontWeight: '200',
            fontSize: 22,
          }}>
          Click On Similar Colors
        </Text>
        {squareUi}
      </View>
    </SafeAreaView>
  );
};
export default App;
