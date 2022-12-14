import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Home from '../screens/Home';
import CadastroPets from '../screens/CadastroPets';
import CadastroUsers from '../screens/CadastroUsers';
import FirstScreen from '../screens/FirstScreen';
import CadastroUsuarioLista from '../screens/CadastroUsuarioLista';
import CadastroPetsLista from '../screens/CadastroPetsLista';

import AuthProvider from '../contexts/auth';

const Stack = createNativeStackNavigator();

function StackAppNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CadastroPets" component={CadastroPets} />

      <Stack.Screen name="CadastroUsers" component={CadastroUsers} />
      <Stack.Screen
        name="CadastroUsuarioLista"
        component={CadastroUsuarioLista}
      />
      <Stack.Screen name="CadastroPetsLista" component={CadastroPetsLista} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackAppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
