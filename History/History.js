import AsyncStorage from '@react-native-community/async-storage';
import React, { Component, useState} from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';
import HistoryItem from './../HistoryItem/HistoryItem'
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';



const History = ({navigation, route}) => {
  const [keys, setKeys] = useState([]);

  _removeData =async() =>{
    try {
        await AsyncStorage.clear()
        alert('Storage successfully cleared!')
      } catch (e) {
        alert('Failed to clear the async storage.')
      }
  }

  _retrieveKeys = async () => {
    try {
        let keys = await AsyncStorage.getAllKeys()
        keys = keys.reverse();
        setKeys(keys);
        console.log('Keys are here!')
        //console.log(keys)
      } catch (e) {
        alert('Failed to get keys.')
      }
   
    
  };

  useEffect(
   ()=> {_retrieveKeys()}, []
  );

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      _retrieveKeys();
      
      return () => {
        
      };
    }, [])
  );

  const renderItem = ({ item }) => (
    <HistoryItem cow= {JSON.stringify(item)} key ={JSON.stringify(item)} />
  );
   

  return (
    <SafeAreaView>
       <Button onPress={_removeData}  mode="outlined" style={styles.button}>
              Delete all!
            </Button>
      <FlatList 
        data={keys}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />

    </SafeAreaView>
    
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

  