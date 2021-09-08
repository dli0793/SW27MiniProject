//import React, { Component, useState, useEffect } from 'react';
//import { Text, View, StyleSheet, Button, Container } from 'react-native';
//import $ from 'jquery';

/*class FetchingBarcode extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          firstName: "",
          lastName: ""
        }
      }
    
      componentDidMount() {
        this.fetch();
      }
    
      fetch() {
        var context = this;
    
        $.ajax({
          url: 'http://localhost:3000',
          method: 'GET',
          success: function(response) {
            context.setState({
              firstName: response.firstName,
              lastName: response.lastName
            });
          }
        });
      }

  render() {
    return (
        <View style={styles.container}>
        <Text>{this.state.firstName}</Text>
        </View>
    );
  }
}

export default FetchingBarcode;



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
  });*/

import React, { Component } from "react";
import {Modal, StyleSheet, View, StatusBar,Text, ActivityIndicator,  FlatList} from 'react-native'


export default class FetchingBarcode extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: ''
    };
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
  this.callBackendAPI()
    .then(res => this.setState({ data: res.express }))
    .catch(err => console.log(err));
    }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
callBackendAPI = async () => {
  const response = await fetch('http://localhost:5000');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};



  render(){
    return(
      <View style={{flex: 1, paddingTop:20}}>
        <Text>{this.state.data}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});