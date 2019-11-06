import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import axios from 'axios';
import {connect} from 'react-redux';
import { MainCalculation } from '../Furie';

class AccelerometerScreen extends React.Component {
  state = {
    accelerometerData: {},
    accelerometerHistory: [],
  };

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
      var accHistory = JSON.stringify(this.state.accelerometerHistory)
      console.log(accHistory)
    } else {
      Accelerometer.setUpdateInterval(20);
      this._subscribe();
    }
  };

  _slow = () => {
    Accelerometer.setUpdateInterval(20);
  };

  _fast = () => {
    Accelerometer.setUpdateInterval(20);
  };

  chunkArray (myArray, chunk_size) {
    var results = [];
    
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }
    
    return results;
}

  _calculateFurie = (accHistory) => {
    var reversedArray = accHistory.slice().reverse()
    var historyPieces = this.chunkArray(reversedArray, 750)
    // console.log(historyPieces[0])
    // console.log(historyPieces[1])

    return MainCalculation(historyPieces[0], historyPieces[1])
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      console.log(accelerometerData.z)
      this.setState(prevState => ({
        accelerometerHistory: [...prevState.accelerometerHistory, accelerometerData.z]
      }))
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };


  render() {
    let { x, y, z } = this.state.accelerometerData;
    return (
      <View style={styles.sensor}>
        <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._calculateFurie(this.state.accelerometerHistory)} style={styles.button}>
            <Text>Calculate Fourier Transform</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  text:{
    textAlign: 'center'
  }
});

function mapStateToProps (state) {
  return {
    motion: state.motion,
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccelerometerScreen)