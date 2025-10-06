import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../theme/colors';

const HomeScreen = ({navigation, setIsLoggedIn}) => {
    const handleLogout = () => {
        setIsLoggedIn(false)
    };

    const handleQuickLinkPress = (screenName) => {
      navigation.navigate(screenName); 
    };

  const quickLinks = [
    {name: 'Relatórios', icon: '📊', screen: 'Relatorio'},
    {name: 'Coleta de satisfação', icon: '⭐', screen: 'ColetaDados'},
    {name: 'Modificar', icon: '🖋', screen: 'Agradecimento'},
  ];


  return (
    <SafeAreaView style={homeStyles.safeArea}>
      <View style={homeStyles.container}>
        <Text style={homeStyles.title}>Dashboard Principal</Text>
        <Text style={homeStyles.info}>
          Acesse rapidamente o que você precisa!
        </Text>

        <View style={homeStyles.dashboard}>
          {quickLinks.map(link => (
            <TouchableOpacity
              key={link.name}
              style={homeStyles.linkCard}
              onPress={() => handleQuickLinkPress(link.screen)}>
              <Text style={homeStyles.linkEmoji}>{link.icon}</Text>
              <Text style={homeStyles.linkText}>{link.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </SafeAreaView>
  );
}

const homeStyles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: COLORS.loginBackground},
  container: {flex: 1, alignItems: 'center', padding: 20},
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
    color: COLORS.white,
    marginTop: 20,
  },
  info: {fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#4682B4'},

  dashboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  linkCard: {
    width: '45%',
    aspectRatio: 1,
    margin: 5,
    backgroundColor: '#E6F3FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  linkEmoji: {
    fontSize: 40,
    marginBottom: 5,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});

export default HomeScreen;
