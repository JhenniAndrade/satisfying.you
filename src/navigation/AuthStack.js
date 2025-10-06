import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import CriarContaScreen from '../screens/CriarContaScreen';
import RecuperarSenhaScreen from '../screens/RecuperarSenhaScreen';

const AuthStack = createStackNavigator();

export function AuthStackNavigator({setIsLoggedIn}) {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, 
      }}
    >
      <AuthStack.Screen name="Login" component={(props)=><LoginScreen{...props} setIsLoggedIn = {setIsLoggedIn}/>}/>
      <AuthStack.Screen name="CriarConta" component={CriarContaScreen} />
      <AuthStack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} />
    </AuthStack.Navigator>
  );
}