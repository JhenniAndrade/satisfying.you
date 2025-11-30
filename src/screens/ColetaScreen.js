import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import EmojiButton from '../components/EmojiButton';
import { RATING_COLORS, GLOBAL_COLORS } from '../data/relatorioData';
import { FONT_SIZES, FONT_WEIGHTS } from '../theme/fonts';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const ColetaScreen = ({ navigation }) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [location, setLocation] = useState(null);

  // 🔹 Solicita permissão no Android
  const requestLocationPermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // 🔹 Pega localização
  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permissão negada',
        'Ative a localização para registrar sua resposta.'
      );
      return;
    }

    Geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível obter sua localização.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
  (async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Ative a localização para registrar sua resposta."
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    } catch (error) {
      console.log("Erro ao obter localização:", error);
    }
  })();
}, []);

  const handleSubmit = async () => {
    if (!selectedRating) {
      Alert.alert('Aviso', 'Por favor, selecione uma avaliação.');
      return;
    }

    try {
      await addDoc(collection(db, 'avaliacoes'), {
        rating: selectedRating,
        latitude: location?.latitude || null,
        longitude: location?.longitude || null,
        timestamp: new Date(),
      });

      navigation.replace('Agradecimento');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível enviar sua resposta.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.tela}>
        <Text style={styles.questionText}>
          O que você achou do Carnaval 2024?
        </Text>

        <View style={styles.buttonContainer}>
          {['Péssimo', 'Ruim', 'Neutro', 'Bom', 'Excelente'].map(label => (
            <EmojiButton
              key={label}
              label={label}
              color={RATING_COLORS[label]}
              isSelected={selectedRating === label}
              onSelect={() => setSelectedRating(label)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Resposta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: GLOBAL_COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tela: { width: '100%', alignItems: 'center', paddingVertical: 50 },
  questionText: {
    fontSize: FONT_SIZES.title,
    color: GLOBAL_COLORS.TEXT,
    fontWeight: FONT_WEIGHTS.bold,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
  },
  submitButton: {
    marginTop: 60,
    backgroundColor: '#37BD6D',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  submitButtonText: {
    color: GLOBAL_COLORS.TEXT,
    fontSize: FONT_SIZES.subtitle,
    fontWeight: FONT_WEIGHTS.bold,
  },
});

export default ColetaScreen;
