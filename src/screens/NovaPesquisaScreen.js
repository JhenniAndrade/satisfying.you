import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert, // Import para alertas
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'; 
import { COLORS } from '../theme/colors';

// ImportaÃ§Ãµes do Firebase
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

import { pickImage, takePhoto } from '../utils/imageUtils'; 
import { uploadImageToFirebase } from '../firebase/storage'; 

const NovaPesquisaScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  
  const [imageUrl, setImageUrl] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const handleImagePicker = () => {
    if (loading) return;
    
    Alert.alert(
      "Escolher Imagem",
      "Selecione uma das opções",
      [
        { text: "Câmera", onPress: () => processImageUpload('camera') },
        { text: "Galeria", onPress: () => processImageUpload('gallery') },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  const processImageUpload = async (source) => {
    setLoading(true);
    let localUri = null;

    try {
      
      localUri = source === 'camera' ? await takePhoto() : await pickImage();

      if (!localUri) {
        setLoading(false);
        return;
      }
      
      
      
      const tempId = `new_${Date.now()}`;
      const newDownloadURL = await uploadImageToFirebase(localUri, tempId);

      if (newDownloadURL) {
        
        setImageUrl(newDownloadURL);
        Alert.alert('Sucesso', 'Imagem carregada! Clique em SALVAR para criar a pesquisa.');
      }

    } catch (e) {
      console.error("Erro no fluxo de upload:", e);
      Alert.alert('Erro', 'Falha ao fazer upload da imagem.');
    } finally {
      setLoading(false);
    }
  };


  const handleCadastro = async () => {
    if (!nome || !data) {
      Alert.alert('Erro', 'Preencha Nome e Data.');
      return;
    }
    if (loading) return;
    setLoading(true);

    try {
      
      await addDoc(collection(db, 'pesquisas'), {
        nome: nome,
        data: data,
        imageUrl: imageUrl, 
      });

      Alert.alert('Sucesso', 'Pesquisa criada com sucesso!');
      navigation.goBack(); 
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao criar pesquisa.');
    } finally {
      setLoading(false);
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
        {loading && <ActivityIndicator size="small" color={COLORS.white} />}
        {imageUrl && (
            <Image 
                source={{ uri: imageUrl }} 
                style={styles.currentImage} 
                resizeMode="cover"
            />
        )}
        <TouchableOpacity 
            style={styles.imagePickerButton}
            onPress={handleImagePicker} 
            disabled={loading}
        >
          <Text style={styles.imagePickerText}>
            {imageUrl ? 'Trocar Imagem' : 'Adicionar Imagem'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCadastro} >
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
    marginTop: 10,
    marginBottom: 30,
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