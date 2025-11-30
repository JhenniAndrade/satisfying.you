import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { COLORS } from '../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
// ImportaÃ§Ãµes do Firebase
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const SearchCard = ({ title, date, iconName, iconColor, onPress }) => (
  <TouchableOpacity style={homeStyles.card} onPress={onPress}>
    <Icon name={iconName} size={40} color={iconColor} />
    <Text style={homeStyles.cardTitle}>{title}</Text>
    <Text style={homeStyles.cardDate}>{date}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation, setIsLoggedIn }) => {
  // Estado para armazenar as pesquisas do banco
  const [listaPesquisas, setListaPesquisas] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Efeito para buscar dados em tempo real no Firestore
  useEffect(() => {
    const q = collection(db, 'pesquisas');
    // onSnapshot "escuta" o banco de dados e atualiza a lista sempre que algo mudar
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pesquisasData = [];
      snapshot.forEach((doc) => {
        pesquisasData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setListaPesquisas(pesquisasData);
    });

    return () => unsubscribe();
  }, []);

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
          {listaPesquisas.map((search) => (
            <SearchCard
              key={search.id}
              title={search.nome}
              date={search.data}
              // Usando Ã­cone padrÃ£o se nÃ£o houver um definido
              iconName={search.imagem ? 'laptop-outline' : 'document-text-outline'} 
              iconColor="#B76E79" 
              // Passamos o objeto 'search' inteiro para a prÃ³xima tela
              onPress={() => navigation.navigate('AcoesPesquisa', { searchItem: search })} 
            />
          ))}
        </View>

        {/* BotÃ£o Inferior de AÃ§Ã£o */}
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