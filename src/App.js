import React, { useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet, Text,
  useColorScheme, View,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const squareSideSize = 2;
  let square = null;

  function generateSquare() {
    square = new Array(squareSideSize);
    for (let i = 0; i < squareSideSize; i += 1) {
      square[i] = new Array(squareSideSize);
    }
    //
    let counter = 1;
    for (let i = 0; i < squareSideSize; i += 1) {
      for (let j = 0; j < squareSideSize; j += 1) {
        square[i][j] = { number: counter, color: '#111111' };
        counter += 1;
      }
    }
    return <Text style={{ maxWidth: 200 }}>{JSON.stringify(square)}</Text>;
  }

  useEffect(() => {
    generateSquare();
  }, [squareSideSize]);
  //
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        {generateSquare()}
      </View>
    </SafeAreaView>
  );
}

export default App;
