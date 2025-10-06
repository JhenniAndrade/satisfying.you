import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerContent } from './DrawerContent'; 
import { HomeStackNavigator } from './HomeStack';
import { AuthStackNavigator } from './AuthStack'; 
import { COLORS } from '../theme/colors';

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

function AppDrawerNavigator({setIsLoggedIn}) {
  return (
    <Drawer.Navigator
      initialRouteName="PesquisasStack"
      drawerContent={props => <DrawerContent {...props} setIsLoggedIn = {setIsLoggedIn}/>}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
      }}>
      <Drawer.Screen
        name="PesquisasStack"
        component={props => <HomeStackNavigator {...props} setIsLoggedIn = {setIsLoggedIn} />}
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

function AuthStackWrapper({ setIsLoggedIn }) {
    
    return <AuthStackNavigator setIsLoggedIn={setIsLoggedIn} />;
}


export function AppNavigator() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        
        {isLoggedIn ? (
          <RootStack.Screen name="App" component={() => <AppDrawerNavigator setIsLoggedIn = {setIsLoggedIn}/>}/>
        ) : (
          <RootStack.Screen 
            name="Auth" 
            component={() => <AuthStackWrapper setIsLoggedIn={setIsLoggedIn}/>} 
            options={{ animationEnabled: false }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
