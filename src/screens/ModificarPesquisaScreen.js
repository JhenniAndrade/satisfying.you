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
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../theme/colors';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

import { pickImage, takePhoto } from '../utils/imageUtils'; 
import { uploadImageToFirebase } from '../firebase/storage'; 

// Recebemos 'route' para pegar os dados passados pela navegaÃ§Ã£o
const ModificarPesquisaScreen = ({ navigation, route }) => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // Carregar dados quando a tela abrir
  useEffect(() => {
    const fetchPesquisa = async () => {
        if (!route.params || !route.params.id) return;
        
        const { id: routeId } = route.params;
        setId(routeId);

            setNome(route.params.nome || '');
            setData(route.params.data || '');
            setImageUrl(route.params.imageUrl || null);

    };
    fetchPesquisa();
  }, [route.params]);

  const handleImagePicker = (source) => {
    if (loading) return;
    
    Alert.alert(
      "Escolher Imagem",
      "De onde você gostaria de selecionar a imagem?",
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

      
      
      const newDownloadURL = await uploadImageToFirebase(localUri, id);

      if (newDownloadURL) {
        
        setImageUrl(newDownloadURL);
        Alert.alert('Sucesso', 'Nova imagem carregada! Clique em SALVAR para finalizar.');
      }

    } catch (e) {
      console.error("Erro no fluxo de upload:", e);
      Alert.alert('Erro', 'Falha ao fazer upload da imagem.');
    } finally {
      setLoading(false);
    }
  };

  const handleSalvar = async () => {
    if (!id || loading  ) return;
    if(!nome || !data) return;{
      Alert.alert('Erro', 'Preencha os campos obrigatórios.');
      return;
    }
    try {
      setLoading(true);
      const ref = doc(db, 'pesquisas', id);
      await updateDoc(ref, {
        nome: nome,
        data: data,
        imageUrl: imageUrl, 
      });
      Alert.alert('Sucesso', 'Pesquisa atualizada!');
      navigation.navigate('Home'); 
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao atualizar pesquisa.');
    } finally{
      setLoading(false);
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
    } finally{
      setLoading(false);
    }
  };

  const popUpDelete = () => {
    Alert.alert(
      'Apagar Pesquisa',
      'Tem certeza de apagar essa pesquisa?',
      [
        {
          text: 'Sim',
          onPress: () => {
            deleteSearch();
          },
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