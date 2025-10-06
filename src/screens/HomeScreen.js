import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput, // Adicionado para a barra de pesquisa
  ScrollView, // Adicionado para permitir scroll se houver muitas pesquisas
} from 'react-native';
import { COLORS } from '../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // Ícones para a barra de pesquisa

// Função para renderizar um card de pesquisa
const SearchCard = ({ title, date, iconName, iconColor, onPress }) => (
  <TouchableOpacity style={homeStyles.card} onPress={onPress}>
    <Icon name={iconName} size={40} color={iconColor} />
    <Text style={homeStyles.cardTitle}>{title}</Text>
    <Text style={homeStyles.cardDate}>{date}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation, setIsLoggedIn }) => {
    const handleLogout = () => {
        setIsLoggedIn(false)
    };
  const activeSearches = [
    { name: 'SECOMP 2023', date: '10/10/2023', icon: 'laptop-outline', color: '#B76E79' },
    { name: 'UBUNTU 2022', date: '05/06/2022', icon: 'people-circle-outline', color: '#000000' },
    { name: 'MENINAS CPU', date: '01/04/2022', icon: 'woman-outline', color: '#ff0000' },
  ];


  const [searchText, setSearchText] = React.useState(''); 

  return (
    <SafeAreaView style={homeStyles.safeArea}>
      <ScrollView contentContainerStyle={homeStyles.scrollContainer}>
        {/* Barra de Pesquisa */}
        <View style={homeStyles.searchBarContainer}>
          <Icon name="search-outline" size={20} color="#888" style={homeStyles.searchIcon} />
          <TextInput
            style={homeStyles.searchInput}
            placeholder="Insira o termo de busca..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Listagem de Cards */}
        <View style={homeStyles.cardListContainer}>
          {activeSearches.map((search, index) => (
            <SearchCard
              key={index}
              title={search.name}
              date={search.date}
              iconName={search.icon}
              iconColor={search.color}
              
              onPress={() => navigation.navigate('AcoesPesquisa')} 
            />
          ))}
        </View>

        {/* Botão Inferior de Ação */}
        <TouchableOpacity style={homeStyles.newSearchButton} onPress={()=> navigation.navigate('NovaPesquisa')}>
          <Text style={homeStyles.newSearchButtonText}>NOVA PESQUISA</Text>
            
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const homeStyles = StyleSheet.create({
  
  safeArea: { flex: 1, backgroundColor: COLORS.loginBackground }, 
  scrollContainer: {
    padding: 20,
    backgroundColor: COLORS.loginBackground,
  },
  
 
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    height: 45,
    width: '100%',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },

 
  cardListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%', 
    aspectRatio: 1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  newSearchButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#5cb85c', 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  newSearchButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default HomeScreen;