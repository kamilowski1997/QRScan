import React, {Component, PermissionsAndroid, useRef} from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, Text, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";



import QRCode from 'react-native-qrcode-svg';
import RNFS from "react-native-fs"

export default class GeneratorScreen extends Component {
  svg;
  constructor(props) {
    super(props);
    this.state = {
      busy: false,
      imageSaved: false,
      QRdata : null,
      fileName : null,
    };
    //this.saveQrToDisk = this.saveQrToDisk.bind(this);
  }

  

  saveQrToDisk (){
    
    this.svg.toDataURL((data) => {
      RNFS.writeFile(RNFS.CachesDirectoryPath+"/some-name.png", data, 'base64')
        .then((success) => {
          return CameraRoll.save(RNFS.CachesDirectoryPath+"/some-name.png", 'photo')
        })
        .then(() => {
          ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
        })
    })
  }


  render() {
    const { navigation } = this.props;  
    let svg={};
    
    if(this.state.QRdata!=null&&this.state.QRdata.length>0){
      return (
        <View
        style={{
          flex: 1,
          //justifyContent: "space-between",
          //alignItems: "center",
          margin: 5
        }}>
          <TextInput 
            onChangeText={(QRdata) => {
              this.setState({QRdata})}}
              mode='outlined' label="qr"
            
          />
          <TextInput 
            onChangeText={(fileName) => {
              this.setState({fileName})} }
              mode='outlined' label="file name"
            
          />

          <View >

            <Button mode='contained' onPress={this.saveQrToDisk} style={{margin: 15}}>
              Save to Gallery
            </Button>
              
          </View>
      
          <View style={{alignItems: "center", margin: 5}}>
            <QRCode
            value={this.state.QRdata}
            size={250}
            getRef={(ref) => (this.svg = ref)}
            />
          </View>
        </View>
    );
    
    }else{
        return(
        <View style={{
          flex: 1,
          //justifyContent: "space-between",
          //alignItems: "center",
        }}>
          <TextInput 
          onChangeText={(QRdata) => {
            this.setState({QRdata})}}
            mode='outlined' label="qr"
            style={{margin: 5}}
          
        />
        <TextInput 
          onChangeText={(fileName) => {
            this.setState({fileName})} }
            mode='outlined' label="file name"
            style={{margin: 5}}
          
        />

        <View >

          <Button mode='contained' onPress={this.saveQrToDisk} style={{margin: 7}}>
            Save to Gallery
          </Button>
            
        </View>
     
        </View>
        )
      
    }
    
  }
  

  
}