import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Container } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigator, TabNavigator, NavigationActions, withNavigation } from 'react-navigation';
import nodejs from 'nodejs-mobile-react-native';
import firebase from "firebase/app";
import "firebase/functions";
import { useDebounce } from 'use-debounce';
//const usda = require('../usda')

function ResultScreen(props){
  const data2 = props.navigation.getParam("data", "NO-BARCODE");
  var serving = props.navigation.getParam("number2","1");
  if(!serving)
    serving = 1;
  //setTimeout(data2, 250);
  //const data2 = 815893000163;
  //var data3, data4, data5;
  const [data3, setData3] = useState('');
  const [data4, setData4] = useState('');
  const [data5, setData5] = useState('');
  var response2;
  //var debouncedSearchTerm = useDebounce(data2, 1000);

  if(data2){
  useEffect(() => {
      (async () => {
        const sayHello = firebase.functions().httpsCallable('sayHello')
        sayHello({barcode: data2}).then(response => {
              if(response)
              {
                response2 = response.data;
                setData3(response2[0].description);
                setData4(response2[0].ingredients); 
                setData5(response2[0].foodNutrients[3].value);
                console.log(response.data);
                console.log(data3); 
              }
        });
      })();
    }, []);
  }

  //console.log(response2);
  
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
  console.log(serving);

  return (
    <View style={styles.container}>
      <Text>{data2}</Text>
	  <Button  
          title="Go to Scan Again"  
          onPress={() => props.navigation.navigate('DashBoardScreen')}  
        />
    <Text>Food Description: {data3}</Text>
    <Text>Ingredients: {data4}</Text>
    <Text>Calories: {data5*serving} kCal</Text>
    <Button  
        title="Save Data"  
        onPress={() => props.navigation.navigate('SavedListScreen', {data3: data3, data4: data4, data5: data5})}  
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