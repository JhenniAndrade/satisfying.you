import { Platform, Alert } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; 


const options = {
    mediaType: 'photo', 
    includeBase64: false,
    quality: 0.8,
};

/**
 * Abre a galeria para selecionar uma imagem (API nativa).
 */
export const pickImage = async () => {
    let result;
    
    try {
       
        result = await launchImageLibrary(options);
    } catch (e) {
        console.error("Erro ao abrir galeria:", e);
        Alert.alert("Erro", "Falha ao acessar a galeria.");
        return null;
    }

    
    if (result && result.didCancel) {
        console.log('Seleção de galeria cancelada');
        return null;
    }

    if (result && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
    }
    return null;
};

/**
 * Abre a câmera para tirar uma foto (API nativa).
 */
export const takePhoto = async () => {
    let result;
    
    try {
      
        result = await launchCamera(options);
    } catch (e) {
        console.error("Erro ao abrir câmera:", e);
        Alert.alert("Erro", "Falha ao acessar a câmera.");
        return null;
    }
    
    if (result && result.didCancel) {
        console.log('Captura de câmera cancelada');
        return null;
    }

    if (result && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
    }
    return null;
};