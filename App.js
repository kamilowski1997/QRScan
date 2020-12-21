import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen/HomeScreen'
import Camera from './Camera/Camera';
import GeneratorScreen from './GeneratorScreen/GeneratorScreen';
import WebViewThatOpensLinksInNavigator from './webview/webview'
import History from './History/History';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="GeneratorScreen" component={GeneratorScreen} />
          <Stack.Screen name="Webview" component={WebViewThatOpensLinksInNavigator} />
          <Stack.Screen name="History" component={History}/>
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  )
}
export default App;