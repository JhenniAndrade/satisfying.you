import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Ionicons} from 'react-native-vector-icons/Ionicons';
import {DrawerContent} from './DrawerContent';
import {HomeStackNavigator} from './HomeStack';
import {AuthStackNavigator} from './AuthStack';
import {COLORS} from '../theme/colors';

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

function AppDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="PesquisasStack"
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
      }}>
      <Drawer.Screen
        name="PesquisasStack"
        component={HomeStackNavigator}
        options={{
          drawerLabel: 'Pesquisas',
          drawerIcon: ({color, size}) => (
            <Ionicons name="document-text-outline" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export function AppNavigator() {
  const isLoggedIn = false;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {/* Usamos o AuthStack como rota inicial */}
        {isLoggedIn ? (
          <RootStack.Screen name="App" component={AppDrawerNavigator} />
        ) : (
          <RootStack.Screen
            name="Auth"
            component={AuthStackNavigator}
            options={{animationEnabled: false}}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
