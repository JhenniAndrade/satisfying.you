import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import EmojiButton from '../components/EmojiButton';
import {RATING_COLORS, GLOBAL_COLORS} from '../data/relatorioData';
import {FONT_SIZES, FONT_WEIGHTS} from '../theme/fonts';

const ColetaScreen = () => {
  const handleSelect = label => {
    console.log('Selecionado:', label);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.tela}>
        <Text style={styles.questionText}>
          O que você achou da Feira de Profissões da UTFPR 2025?
        </Text>

        <View style={styles.buttonContainer}>
          {['Péssimo', 'Ruim', 'Neutro', 'Bom', 'Excelente'].map(label => (
            <EmojiButton
              key={label}
              label={label}
              color={RATING_COLORS[label]}
              onSelect={handleSelect}
            />
          ))}
        </View>
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
  tela: {width: '100%', alignItems: 'center', paddingVertical: 50},
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
});

export default ColetaScreen;
