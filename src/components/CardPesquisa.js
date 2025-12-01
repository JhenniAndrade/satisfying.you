import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../theme/colors';
import {FONT_SIZES, FONT_WEIGHTS} from '../theme/fonts';


const CardPesquisa = ({pesquisa, onPress}) => {

  const {
    nome: nomePesquisa,
    data: dataPesquisa,
    imageUrl: imagemURL
  } = pesquisa;

 
  return (

    <TouchableOpacity
        style={styles.cardContainer}
        onPress={onPress}
    >
      <View style={styles.card}>
        <Image
          source={
            imagemURL ? {uri: imagemURL} : {uri: 'https:placehold.co/80x80/CCCCCC/666666?text=ICON'}
          }
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {nomePesquisa || 'Pesquisa Sem Nome'}
          </Text>
          <Text style={styles.date}>{dataPesquisa || 'Data Desconhecida'}</Text>
        </View>
      </View>
  </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
 cardContainer: {
    width: '48%',
    marginBottom: 15,
    elevation: 3,
    shadowColor: COLORS.text,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
    backgroundColor: COLORS.background,
  },
  infoContainer: {
    padding: 12,
    alignItems: 'center'
  },
  name: {
    fontSize: 14,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  date: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
  },
});

export default CardPesquisa;