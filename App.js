import {View} from 'react-native'
import React from 'react';
import Home from './src/screens/home'
import Register from './src/screens/register';
import Login from './src/screens/login';
import Menu from './src/components/Menu';
import { NavigationContainer } from '@react-navigation/native'
 
export default function App() {
  return (
    <NavigationContainer>
      <Menu/>
    </NavigationContainer>
   
  );
}
