import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../theme/colors';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Recebemos 'route' para pegar os dados passados pela navegaÃ§Ã£o
const ModificarPesquisaScreen = ({ navigation, route }) => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [id, setId] = useState(null);

  // Carregar dados quando a tela abrir
  useEffect(() => {
    if (route.params) {
      const { id, nome, data } = route.params;
      setId(id);
      setNome(nome);
      setData(data);
    }
  }, [route.params]);

  const handleSalvar = async () => {
    if (!id) return;
    try {
      const ref = doc(db, 'pesquisas', id);
      await updateDoc(ref, {
        nome: nome,
        data: data,
      });
      Alert.alert('Sucesso', 'Pesquisa atualizada!');
      navigation.navigate('Home'); // Volta para a home ou tela anterior
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao atualizar pesquisa.');
    }
  };

  const deleteSearch = async () => {
    if (!id) return;
    try {
      const ref = doc(db, 'pesquisas', id);
      await deleteDoc(ref);
      Alert.alert('Sucesso', 'Pesquisa apagada.');
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao apagar pesquisa.');
    }
  };

  const popUpDelete = () => {
    Alert.alert(
      'Apagar Pesquisa',
      'Tem certeza de apagar essa pesquisa?',
      [
        {
          text: 'Sim',
          onPress: deleteSearch,
        },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: true },
    );
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

        <View style={styles.salvarDelete}>
          <TouchableOpacity style={styles.button} onPress={handleSalvar}>
            <Text style={styles.buttonText}>SALVAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={popUpDelete}>
            <Icon name="trash" size={48} color="#fff" style={styles.delete} />
          </TouchableOpacity>
        </View>
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
  salvarDelete: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    height: 50,
    marginTop: 40,
    marginLeft: 20,
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
    width: '90%',
    height: 50,
    backgroundColor: '#5cb85c',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ModificarPesquisaScreen;