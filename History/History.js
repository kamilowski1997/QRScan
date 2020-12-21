import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';


export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {

    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
    }
    
  })