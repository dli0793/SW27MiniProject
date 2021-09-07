import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import auth from '@react-native-firebase/auth';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import LoadingScreen from './screens/LoadingScreen';
import DashBoardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import ResultScreen from './screens/ResultScreen';

import firebase from 'firebase';
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
	
  render() {
  //return the app navigation
	  return <AppNavigator/>;
  }
}
  
//navigate to different screens
const AppSwitchNavigator = createSwitchNavigator({
	  LoginScreen:LoginScreen,
	  DashBoardScreen:DashBoardScreen,
	  //LoadingScreen:LoadingScreen,
	  ResultScreen:ResultScreen
})
  
const AppNavigator = createAppContainer(AppSwitchNavigator);

///////////////////////////////Camera Scanning/////////////////////////////////////////////
  /* const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

//This asks the user for camera permissions.
  useEffect(() => {
    askForCameraPermission();
  }, []);

//This is what happens when we scan the barcode.
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

//Checking permission text and empty box if null
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  
//Checking permission is false then ask for permission again for it to work
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

//If there is permission, return the view
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='blue' />}
    </View>
  ); */
///////////////////////////////Camera Scanning/////////////////////////////////////////////

///////////////////////////////User Authentication///////////////////////////////////////////// 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'blue'
  }
});