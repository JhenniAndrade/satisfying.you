// src/components/CardPesquisa.js

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../theme/fonts';

const CardPesquisa = ({ nomePesquisa, dataPesquisa, imagemURL }) => {
  return (
    <View style={styles.card}>
      <Image
        source={imagemURL ? { uri: imagemURL } : require('../assets/default-image.png')} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {nomePesquisa || "Pesquisa Sem Nome"}
        </Text>
        <Text style={styles.date}>
          {dataPesquisa || "Data Desconhecida"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 3, // Sombra para Android
    shadowColor: COLORS.text, // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.background,
  },
  infoContainer: {
    padding: 12,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.subtitle,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginBottom: 4,
  },
  date: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
  },
});

export default CardPesquisa;