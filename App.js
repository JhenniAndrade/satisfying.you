// App.js
import React from 'react';
import { AppNavigator } from './src/navigation/AppNavigator.js';
import LoginScreen from './src/screens/LoginScreen.js'; // Importa a sua nova tela
import AcoesPesquisaScreen from './src/screens/AcoesPesquisaScreen.js';

export default function App(){
    return <AppNavigator/>;
}

