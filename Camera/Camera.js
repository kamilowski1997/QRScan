import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
import { Text, View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import AsyncStorage from '@react-native-community/async-storage';

export default class Camera extends Component {
  state = {
    flash: RNCamera.Constants.FlashMode.off,
    cameraType: RNCamera.Constants.Type.back,
    scanned: false
    
  }
  constructor(props) {
    super(props);
   }
   flashOnTap = ()=> {
     if(this.state.flash===RNCamera.Constants.FlashMode.off){
      this.setState({flash:RNCamera.Constants.FlashMode.torch});
     }else{
      if(this.state.flash===RNCamera.Constants.FlashMode.torch){
        this.setState({flash:RNCamera.Constants.FlashMode.off});
      }
     } 
   };
   changeCameraType = ()=> {
    if(this.state.cameraType===RNCamera.Constants.Type.back){
     this.setState({cameraType:RNCamera.Constants.Type.front});
    }else{
     if(this.state.cameraType===RNCamera.Constants.Type.front){
       this.setState({cameraType:RNCamera.Constants.Type.back});
     }
    } 
  };
   render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'black',}}>
        <RNCamera
          onTap={this.changeCameraType}
          ref={ref => {
            this.camera = ref;
          }}
          style={{flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center'}}
          type={this.state.cameraType}
          flashMode={this.state.flash}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            barcodes.forEach(barcode =>{
              if(barcode.type=="QR_CODE" && !this.state.scanned){
                this.saveToHistory(barcode.data);
                this.codeDetected(barcode.data, navigation);

              }
            })
          }}
        />
        
      </View>
    );
  }
  codeDetected = async (qrData, navigation) => {
    this.setState({scanned:true});
    Alert.alert(
      "Alert",
      `QR code data: ${qrData}`,
     
      [
        {
          text: "Save to Clipboard",
          onPress: async () => {
            await Clipboard.setString(qrData);
    
            this.setState({scanned:false});
          }
        },
        {
          text: "Open in browser",
          onPress: () => {
            
            {navigation.navigate('Webview', {qrData})}
            this.setState({scanned:false});
          }
        },
        {
          text: "Ok",
          onPress: () => { 
            this.setState({scanned:false});
          }
        },  
      ],

      { cancelable: false }
    );
  };

  saveToHistory = async(qrData) => {
    let key = new Date().toLocaleString();
    try{
        await AsyncStorage.setItem(key, JSON.stringify(qrData))
        //alert('Card added')

    }catch (e){
        console.log(e)
    }
 
  }
}