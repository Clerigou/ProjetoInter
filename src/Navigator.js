import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './screens/Login';
import Home from './screens/Home';
import CadastroPets from './screens/CadastroPets';

const Stack = createNativeStackNavigator();

function StackAppNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CadastroPets" component={CadastroPets} />
    </Stack.Navigator>
  );
}

export default function Navegacao() {
  return (
    <NavigationContainer>
      <StackAppNavigator />
    </NavigationContainer>
  );
}
