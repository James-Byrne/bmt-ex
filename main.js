import Exponent, { Accelerometer } from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { SmoothLine } from 'react-native-pathjs-charts'

gyro = Accelerometer;

class App extends React.Component {
  state = {
    gyroData: [
      [{ x: 0, y: 0}],
      [{ x: 0, y: 0}],
      [{ x: 0, y: 0}]
    ],
    nextX: 0,
    nextY: 0,
    nextZ: 0
  }

  componentWillMount() {
    gyro.setUpdateInterval(200);

    this._subscription = gyro.addListener((result) => {
      let nextX = this.state.nextX;
      let nextY = this.state.nextY;
      let nextZ = this.state.nextZ;

      let newX = this.state.gyroData[0].slice();
      let newY = this.state.gyroData[1].slice();
      let newZ = this.state.gyroData[2].slice();

      newX.push({x: nextX, y: round(result.x)});
      newY.push({x: nextY, y: round(result.y)});
      newZ.push({x: nextZ, y: round(result.z)});

      this.setState({
        gyroData: [newX, newY, newZ],
        nextX: nextX + 1,
        nextY: nextY + 1,
        nextZ: nextZ + 1,
      });
    });
  }

  render() {
    let dataX = [this.state.gyroData[0]];
    let dataY = [this.state.gyroData[1]];
    let dataZ = [this.state.gyroData[2]];

    let options = {
      width: 300,
      height: 200,
      color: '#2980B9',
      margin: {
        top: 50,
        left: 15,
        bottom: 50,
        right: 14
      },
      axisX: {
        showAxis: true,
        showLines: false,
        showLabels: true,
        showTicks: false,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: false,
        showLabels: true,
        showTicks: false,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Gyro Data</Text>
          <SmoothLine data={dataX} options={options} xKey='x' yKey='y' />
          <SmoothLine data={dataY} options={options} xKey='x' yKey='y' />
          <SmoothLine data={dataZ} options={options} xKey='x' yKey='y' />
        </View>
      </ScrollView>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

function roundToZero(n) {
  if(!n || n < 0) {
    return 0
  }
  return Math.floor(n * 100) / 100;
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
