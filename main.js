import Exponent, { Accelerometer } from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class App extends React.Component {
  state = {
    accelData: {},
    maxAccelData: {
      maxX: 0,
      maxY: 0,
      maxZ: 0
    },
  }

  componentWillMount() {
    Accelerometer.setUpdateInterval(0.5);

    this._subscription = Accelerometer.addListener((result) => {
      this.setState({accelData: result});
    });
  }

  render() {
    let { x, y, z } = this.state.accelData;

    return (
      <View style={styles.container}>
        <Text>Open up main.js to start working on your app!</Text>
        <Text>x: {round(x)}</Text>
        <Text>y: {round(y)}</Text>
        <Text>z: {round(z)}</Text>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  let num = Math.floor(n * 100) / 100;
  if (num < 0) {
    return 0;
  }
  return num;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Exponent.registerRootComponent(App);
