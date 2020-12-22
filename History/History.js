import AsyncStorage from '@react-native-community/async-storage';
import React, { Component, useState} from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';
import HistoryItem from './../HistoryItem/HistoryItem'
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';



const History = ({navigation, route}) => {
  const [keys, setKeys] = useState([]);

  let mounted;



  _removeData =async() =>{
    try {
        await AsyncStorage.clear()
        if(mounted){
          setKeys([]);
        }
        alert('Storage successfully cleared!')
      } catch (e) {
        alert('Failed to clear the async storage.')
      }
  }

  _retrieveKeys = async () => {
    if(mounted){
    try {
        let keys = await AsyncStorage.getAllKeys()
        keys = keys.reverse();
        
        setKeys(keys);
        
        
        //console.log('Keys are here!')
        //console.log(keys)
      } catch (e) {
        alert('Failed to get keys.')
      }
    }
   
    
  };

  useEffect(()=> {
    mounted= true;
    _retrieveKeys();
  
    return () => {
      mounted=false}

  
  }, []);



  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      mounted=true;
      _retrieveKeys();
      
      return () => {
        mouted = false;
        
      };
    }, [])
  );

  const renderItem = ({ item }) => (
    <HistoryItem cow= {mounted?null : JSON.stringify(item)} key ={mounted?null:JSON.stringify(item)} />
  );
   

  return (
    <View>
      <Button onPress={_removeData}  mode="outlined" style={styles.button}>
        Delete all!
      </Button>
      <SafeAreaView>

      <FlatList 
        data={keys}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

    </SafeAreaView>
    </View>
    
    
  );
   //{keys.map((buf)=><HistoryItem cow= {JSON.stringify(buf)} }
  

}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
    }
    
  })

  export default History;

  