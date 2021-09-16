import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Container } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigator, TabNavigator, NavigationActions, withNavigation } from 'react-navigation';
import nodejs from 'nodejs-mobile-react-native';
//import firebase from '@react-native-firebase/app';
//import functions from '@react-native-firebase/functions'
//import 'firebase/functions';
//import * as firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/functions";

function SearchResultsScreen(props){
  const data = props.navigation.getParam("number", "NO-RESULTS");
  const serving = props.navigation.getParam("number2","1");

  const [data2, setData] = useState('');

  useEffect(() => {
    (async () => {
        const response = await fetch(
            'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=cffckpuSMkEWEwGQMAabRBSNvc8tBaoNbBZVGmun&query=' + data + '&pageSize=1'
           );
           const dataGrabbed = await response.json();
          //  console.log(dataGrabbed);
           setData(dataGrabbed);
    })();
}, []);

  //const sayHello = await firebase.functions().httpsCallable('sayHello');
  //let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
  
  //var data3 = JSON.stringify(data2);
  //let correct = data3.replace(regex, ''); // remove all trailing commas
  //let data4 = JSON.parse(correct); // build a new JSON object based on correct string var data4 = data3;
  //data3 = data2[0];

  //var data4 = JSON.parse(data3);
  //var data5 = JSON.stringify(data4.foods);
  //var data6 = JSON.stringify(data5);
  if(data2){
    console.log(data2.foods[0]);
    var data3 = data2.foods[0].ingredients;
    var data4 = data2.foods[0].foodNutrients[3].value * serving;
  }
  
  return (
    <View style={styles.container}>
	  <Button  
          title="Go to Scan Again"  
          onPress={() => props.navigation.navigate('DashBoardScreen')}  
        />
    <Text>Food Name Input: {data}</Text>
    <Text>Ingredients: {data3}</Text>
    <Text>Calories: {data4} kCal</Text>
    </View>
  );
}

export default withNavigation(SearchResultsScreen);

SearchResultsScreen.navigationOptions = {
  title: 'SearchResults'
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
