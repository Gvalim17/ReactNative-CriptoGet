import React from 'react';
import { StyleSheet, View } from 'react-native';
import CryptoConverter from './CryptoConverter/CryptoConverter';

const App = () => {
  return (
    <View style={styles.container}>
      <CryptoConverter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
