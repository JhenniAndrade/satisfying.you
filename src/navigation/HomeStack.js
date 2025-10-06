import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import AcoesPesquisaScreen from '../screens/AcoesPesquisaScreen';
import RelatorioScreen from '../screens/RelatorioScreen';
import ColetaScreen from '../screens/ColetaScreen';
import AgradecimentoScreen from '../screens/AgradecimentoScreen';

const HomeStack = createStackNavigator();

export function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: COLORS.loginBackground},
        headerTintColor: '#fff',
      }}>
      {/* 1. Tela Inicial: Configura o botão Sanduíche */}
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          title: '',
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={30}
              color="#fff"
              style={{marginLeft: 15}}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
      {/* 4. Tela de Ações da Pesquisa */}
      <HomeStack.Screen
        name="AcoesPesquisa"
        component={AcoesPesquisaScreen}
        options={{title: 'Ações da Pesquisa', headerShown: false}}
      />
      {/* 5. Tela de Coleta de Dados */}
      <HomeStack.Screen
        name="ColetaDados"
        component={ColetaScreen}
        options={{title: 'Coletar Dados'}}
      />
      {/* 6. Tela de Relatório */}
      <HomeStack.Screen
        name="Relatorio"
        component={RelatorioScreen}
        options={{title: 'Relatório'}}
      />
      {}
      <HomeStack.Screen
        name="Agradecimento"
        component={AgradecimentoScreen}
        options={{title: 'Agradecimento', headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}
