import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage_mod } from './config'; 

export const uploadImageToFirebase = async (uri, pesquisaId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    const date = new Date().getTime();
    const fileName = `${pesquisaId}_${date}.jpg`;
    
    const storageRef = ref(storage_mod, `images/${pesquisaId}/${fileName}`);

    try {
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        return downloadURL;

    } catch (error) {
        console.error("Erro ao fazer upload para o Firebase Storage:", error);
        return null;
    }
};