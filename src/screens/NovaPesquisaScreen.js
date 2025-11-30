import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert, // Import para alertas
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'; 
import { COLORS } from '../theme/colors';

// ImportaÃ§Ãµes do Firebase
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const NovaPesquisaScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [imageSource, setImageSource] = useState(null);

  const handleCadastro = async () => {
    // ValidaÃ§Ã£o simples
    if (!nome || !data) {
      Alert.alert('Erro', 'Por favor, preencha o nome e a data.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'pesquisas'), {
        nome: nome,
        data: data,
        imagem: 'default', // Placeholder para imagem por enquanto
      });
      console.log("Pesquisa cadastrada com ID: ", docRef.id);
      navigation.goBack(); // Volta para a Home
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      Alert.alert('Erro', 'NÃ£o foi possÃ­vel salvar a pesquisa.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />
        <Text style={styles.hintText}>Preencha no nome da pesquisa</Text>

        <Text style={styles.label}>Data</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            value={data}
            onChangeText={setData}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
          />
          <Icon name="calendar" size={24} color="#fff" style={styles.calendarIcon} />
        </View>
        <Text style={styles.hintText}>Preencha a data</Text>

        <Text style={styles.label}>Imagem</Text>
        <TouchableOpacity style={styles.imagePickerButton}>
          <Text style={styles.imagePickerText}>CÃ¢mera/Galeria de imagens</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.loginBackground, 
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.loginBackground,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.white,
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    height: 45,
    backgroundColor: COLORS.white,
    borderRadius: 0,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  hintText: {
    color: COLORS.warning, 
    fontSize: 12,
    marginTop: 3,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: 45,
    borderRadius: 0,
  },
  dateInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: COLORS.white,
    height: '100%',
  },
  calendarIcon: {
    marginRight: 10, 
    color: '#000', 
  },
  imagePickerButton: {
    height: 45,
    backgroundColor: COLORS.white,
    borderRadius: 0,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  imagePickerText: {
    color: '#666',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#5cb85c', 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NovaPesquisaScreen;