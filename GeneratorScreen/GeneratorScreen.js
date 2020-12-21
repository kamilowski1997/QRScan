import React, {Component, useRef} from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, Text, Alert, TouchableOpacity, ToastAndroid, PermissionsAndroid } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import Share from 'react-native-share';


import QRCode from 'react-native-qrcode-svg';
import RNFS from "react-native-fs"

export default class GeneratorScreen extends Component {
  svg;
  hasWritePermissions;
  constructor(props) {
    super(props);
    this.state = {
      busy: false,
      imageSaved: false,
      QRdata : null,
      fileName : null,
    };
  }
  saveQrToDisk = async() =>{
    await this.requestWritePermission();
    if(this.state.fileName==null){
      ToastAndroid.show('Name your file.', ToastAndroid.SHORT)
    }else{
      if(this.svg!=undefined&&this.hasWritePermissions){
        this.svg.toDataURL((data) => {
          RNFS.writeFile(RNFS.CachesDirectoryPath+"/"+this.state.fileName+".png", data, 'base64')
            .then((success) => {
              return CameraRoll.save(RNFS.CachesDirectoryPath+"/"+this.state.fileName+".png", 'photo')
            })
            .then(() => {
              ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
            })
        })
      }
    }
  };
  shareQR = () =>{
    if(this.state.fileName==null){
      ToastAndroid.show('Name your file.', ToastAndroid.SHORT)
    }else{
      if(this.svg!=undefined){
        this.svg.toDataURL((dataURL)=>{
          let shareImageBase64 = {
            title: 'Share',
            url: `data:image/png;base64,${dataURL}`,
            subject: this.state.fileName,
          };
          Share.open(shareImageBase64).catch(error => console.log(error));
        });
      }
    }
  };

  requestWritePermission = async () =>{
    const writePermissionResult = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (typeof writePermissionResult === 'boolean') {
      this.hasWritePermissions = writePermissionResult;
    } else {
      this.hasWritePermissions = writePermissionResult === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  render() {
    const { navigation } = this.props;  
    
    if(this.state.QRdata!=null&&this.state.QRdata.length>0){
      area= (
      <View style={{alignItems: "center", margin: 5}}>
        <QRCode
        value={this.state.QRdata}
        size={250}
        getRef={(ref) => (this.svg = ref)}
        />
      </View>)
    
    }else{
        area =(<View></View>)
    }

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
            mode='outlined' label="qr data"
          
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
        <View >

          <Button mode='contained' onPress={this.shareQR} style={{margin: 15}}>
            Share
          </Button>
            
        </View>
        {area}
        
      </View>
  );
  }
  
}