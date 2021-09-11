import React, { Component, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Container, ImageBackground, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { withNavigation } from "react-navigation"
import nodejs from 'nodejs-mobile-react-native';


/*class DashboardScreen extends Component  {
	
	state = {
		hasPermission: null,
		scanned: false,
		//setScanned: false,
		//text: 'Not yet scanned',
		//setText: 'Not yet scanned',
	}
	
	async componentDidMount() {
		
		askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);
		
	}
	
	async componentDidMount() {
    // ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasPermission: status === "granted" ? true : false });
  }
	
	// What happens when we scan the bar code
  handleBarCodeScanned = ({ type, data }) => {
    //setScanned: true;
    //setText: data;
	this.props.navigation.navigate('Result', {
        data: data 
      });
    console.log('Type: ' + type + '\nData: ' + data)
  }
  
  render() {
	  const { hasPermission, scanned} = this.state;
  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return the View
  else {
      // we have permission and this screen is under focus
      return 
	  <View style={styles.container}>
        <Text>Scan code inside window</Text>
        <BarCodeScanner
          onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned }
          style = {{
            height:  window.height / 2,
            width: window.height,
          }}
        >
        </BarCodeScanner>
      </View>
    }
  
    (<View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      //<Text style={styles.maintext}>{this.text}</Text>
      //{scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='blue' />}
    </View>);
  //);
	}
}*/

class DashboardScreen extends Component{
  static navigationOptions = {
    header: null
  }
  //Component State
  state = {
    hasPermission: null, // app has camera permission
    scanned: false, // if scanned already
    number: null,
    onChangeNumber: null
  }
  async componentDidMount() {
    //asks for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasPermission: status === "granted" ? true : false });
  }

  handleBarCodeScanned = ({ type, data }) => {
      console.log('Type: ' + type + '\nData: ' + data)
	  //Reads the data into result screen
      this.props.navigation.navigate('ResultScreen', {
        data: data 
      });
	  
  }
  render(){
    const { hasPermission, scanned } = this.state;
    const { number, onChangeNumber } = this.state;

    if(hasPermission === null){
      // requesting permission
      return (
        <View style={styles.container}>
         <Text>Requesting for camera permission</Text>
        </View>
      );
    }
	
    if(hasPermission === false){
        //permission denied
      return ( 
        <View style={styles.container}>
         <Text>Please grant the camera permission</Text>
        </View>
      )
    }
	
   else{
	return(
	  //barcode scanner
    <View style={styles.container}>
      <ImageBackground
          source={require('../assets/orange.jpg')}
          blurRadius={0.4}
          style={styles.bgImg}
      >
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>

      <TextInput
        style={styles.input}
        onChangeText={number => this.setState({ number })}  
        value={this.state.number}
        placeholder="Enter name of food"
        //keyboardType="numeric"
      />

      <Button  
        title="Search"  
        onPress={() => this.props.navigation.navigate('SearchResultsScreen', {number: this.state.number})}  
      />
	  </ImageBackground>
    </View>
	)
   }
  }
}

export default withNavigation(DashboardScreen);

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
  },
  bgImg: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: 70
  },
  input: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    padding: 10,
  },
});