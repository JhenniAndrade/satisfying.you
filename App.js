import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ColetaScreen from './src/screens/ColetaScreen';
import AgradecimentoScreen from './src/screens/AgradecimentoScreen';
import RelatorioScreen from './src/screens/RelatorioScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Relatorio" component={RelatorioScreen} />
        <Stack.Screen name="Coleta" component={ColetaScreen} />
        <Stack.Screen name="Agradecimento" component={AgradecimentoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;