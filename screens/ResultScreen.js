import React from "react";

import { Text, View, StyleSheet, Button, Container } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigator, TabNavigator, NavigationActions, withNavigation } from 'react-navigation';

function ResultScreen(props){
  const data = props.navigation.getParam("data", "NO-QR");
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