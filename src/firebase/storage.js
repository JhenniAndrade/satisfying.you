import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage_mod } from './config'; 

export const uploadImageToFirebase = async (uri, pesquisaId) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const fileName = `${pesquisaId}_${Date.now()}.jpg`;
    const storageRef = ref(storage_mod, `images/${pesquisaId}/${fileName}`);

    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);

  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    return null;
  }
};
