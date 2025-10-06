import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AcoesPesquisaScreen from '../screens/AcoesPesquisaScreen';
import RelatorioScreen from '../screens/RelatorioScreen';
import ColetaScreen from '../screens/ColetaScreen';
import AgradecimentoScreen from '../screens/AgradecimentoScreen';
import HomeScreen from '../screens/HomeScreen'; 
import NovaPesquisa from '../screens/NovaPesquisaScreen'
import ModificarPesquisa from '../screens/ModificarPesquisaScreen'



const HomeStack = createStackNavigator();

export function HomeStackNavigator({setIsLoggedIn}) {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: COLORS.acoesHeaderColor},
        headerTintColor: '#fff',
      }}>
      {/* 1. Tela Inicial: Configura o botão Sanduíche */}
      <HomeStack.Screen
        name="Home"
        component={(props) => <HomeScreen {...props} setIsLoggedIn = {setIsLoggedIn}/>}
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


      <HomeStack.Screen
        name="ModificarPesquisa"
        component={ModificarPesquisa}
        options={{title:'Modificar Pesquisa'}}
        />

      <HomeStack.Screen
        name="NovaPesquisa"
        component={NovaPesquisa}
        options={{title:'Nova Pesquisa'}}
        />

      <HomeStack.Screen
        name="AcoesPesquisa"
        component={AcoesPesquisaScreen}
        options={{title: 'Ações da Pesquisa', headerShown: false}}
      />

      <HomeStack.Screen
        name="ColetaDados"
        component={ColetaScreen}
        options={{title: 'Coletar Dados'}}
      />

      <HomeStack.Screen
        name="Relatorio"
        component={RelatorioScreen}
        options={{title: 'Relatório'}}
      />
      
      <HomeStack.Screen
        name="Agradecimento"
        component={AgradecimentoScreen}
        options={{title: 'Agradecimento', headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}
