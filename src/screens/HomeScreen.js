import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { COLORS } from '../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
// ImportaÃ§Ãµes do Firebase
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

import CardPesquisa from '../components/CardPesquisa';

const HomeScreen = ({ navigation, setIsLoggedIn }) => {
  // Estado para armazenar as pesquisas do banco
  const [listaPesquisas, setListaPesquisas] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const pesquisasFiltradas = listaPesquisas.filter(pesquisa =>

    pesquisa.nome?.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <CardPesquisa
      pesquisa={item}

      onPress={() => navigation.navigate('AcoesPesquisa', { pesquisa: item })}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Insira o termo de busca..."
            placeholderTextColor="#888"
            value={termoBusca}
            onChangeText={setTermoBusca}
          />
        </View>
      </View>

      {/* Listagem de Cards */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.white} />
          <Text style={styles.loadingText}>Carregando pesquisas...</Text>
        </View>
      ) : (
        <FlatList
          data={pesquisasFiltradas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.cardRow}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Nenhuma pesquisa encontrada.</Text>
          )}
        />
      )}

        <TouchableOpacity style={styles.newButton} onPress={()=> navigation.navigate('NovaPesquisa')}>
          <Text style={styles.newButtonText}>NOVA PESQUISA</Text>
        </TouchableOpacity>
        
     

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.loginBackground },
  header: {
    backgroundColor: COLORS.headerColor,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    width: '100%',
  },
  searchIcon: {
    marginRight: 10,
    color: '#888',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.white,
    marginTop: 10,
  },
  listContent: {
    padding: 10,
    paddingBottom: 20,
  },
  cardRow: {
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  emptyText: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  newButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  newButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default HomeScreen;