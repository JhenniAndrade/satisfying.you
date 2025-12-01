import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store'; // Importe a store criada
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}