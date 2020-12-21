import React, {Component} from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';




export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>

        <View>

          <Button onPress={() => {navigation.navigate('Camera')}} mode='contained' icon="qrcode-scan"  contentStyle={{height: 150, width: 300}} labelStyle={{fontSize:25}} >
            Scan
          </Button>
        </View>

        <View>

          <Button onPress={() => {navigation.navigate('GeneratorScreen')}} mode='contained' icon="qrcode-plus" contentStyle={{height: 150, width: 300}} labelStyle={{fontSize:25}}>
            Generate QR CODE
          </Button>
        </View>

        
      </View>
    )
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