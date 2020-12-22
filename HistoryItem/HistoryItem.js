import React from 'react'
import {StyleSheet, View, ToastAndroid, Dimensions} from 'react-native'
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {  Divider, Caption, Subheading, IconButton } from 'react-native-paper';
import Clipboard from '@react-native-community/clipboard';



export default class HistoryItem extends React.Component {
    mounted;
    state = {
        uri:""   
    }
    constructor(props){
        super(props)
        this._retrieveData = this._retrieveData.bind(this);
      
    }
    componentDidMount(){
        this.mounted=true;
        this._retrieveData();
    }

    componentWillUnmount(){
        this.mounted=false;
    }
    _retrieveData = async () => {
        
            try {
                const value = await AsyncStorage.getItem(JSON.parse(this.props.cow));
                if (value !== null) {
                  // We have data!!                  
                  let parsed = JSON.parse(value)
                  if(this.mounted){
                    this.setState({uri: parsed})
                  }
      
                  
                }
              } catch (error) {
                // Error retrieving data
                console.log(error)
      
            }        
    };  

    
    render(){
       

        //console.log(this.props.cow)
        //console.log(this.state.answer)
        tmp = this.state.uri;
        return(
            

            <View style= {styles.container}>
                <View style={{flexDirection: 'column'}}>
                    <Subheading style={{maxWidth:Dimensions.get('window').width*8/10}}>
                        {tmp}
                    </Subheading>
                    <Caption>
                        {this.props.cow}
                    </Caption>     
                </View>
                <View>
                    <IconButton
                        icon="content-copy"                        
                        size={30}
                        style={{maxWidth:Dimensions.get('window').width*2/10}}
                        onPress={async () => {
                            await Clipboard.setString(this.state.uri);
                            ToastAndroid.show(`Copied "${this.state.uri}" to clipboard`, ToastAndroid.SHORT);
                        }}
                    />   
                </View>
                                      
            </View>
        ) 
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'space-between',
        alignItems: 'center', 
        backgroundColor: '#DCDCDC',
        margin: 5,
        flexDirection: 'row',

    }
})



/*                  <IconButton
icon="camera"
                        
size={20}
onPress={() => console.log('Pressed')}
/> 
*/