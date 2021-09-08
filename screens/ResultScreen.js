import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Container } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigator, TabNavigator, NavigationActions, withNavigation } from 'react-navigation';
import nodejs from 'nodejs-mobile-react-native';
//const usda = require('../usda')

function ResultScreen(props){
  const data = props.navigation.getParam("data", "NO-BARCODE");
  
  /*this.state = {
    result: data
  }

  componentDidMount = () => {
    this.fetch();
  }

  fetch = () => {
    var context = this;

    $.ajax({
      url: 'http://localhost:3000',
      method: 'GET',
      success: function(response) {
        context.setState({
          result: response.result
        });
      }
    });
  }*/

    /*nodejs.start('.//index.js');
    nodejs.channel.addListener(
      'message',
      (msg) => {
        alert('From node: ' + msg);
      },
      this 
    );*/
  //const results = usda("815893000163");

  
  /*const [data2, setData] = useState([]);

  useEffect(async () => {
    const response = await fetch(
     'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=cffckpuSMkEWEwGQMAabRBSNvc8tBaoNbBZVGmun&query=Cheddar%20Cheese&pageSize=1'
    );
    const dataGrabbed = await response.json();
    setData(dataGrabbed);
  }, [])    

  console.log(data2.foods);*/

  /*const [data2, setData] = useState([]);

  useEffect(async () => {
    const response = usda("815893000163");
    const dataGrabbed = await response.json();
    setData(dataGrabbed);
  }, [])    

  console.log(data2);*/
  
  return (
    <View style={styles.container}>
      <Text>{data}</Text>
	  <Button  
          title="Go to Scan Again"  
          onPress={() => props.navigation.navigate('DashBoardScreen')}  
        />
    </View>
  );
}

export default withNavigation(ResultScreen);

ResultScreen.navigationOptions = {
  title: 'Decoded'
};

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