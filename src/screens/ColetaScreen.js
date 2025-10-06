import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import EmojiButton from '../components/EmojiButton';
import { RATING_COLORS, GLOBAL_COLORS } from '../data/relatorioData';
import { FONT_SIZES, FONT_WEIGHTS } from '../theme/fonts';

const ColetaScreen = ({navigation}) => {
  const [selectedRating, setSelectedRating] = React.useState(null);

  const handleSelect = (label) => {
    setSelectedRating(label)
    console.log('Selecionado:', label);
  };

  const handleSubmit = () =>{
    navigation.replace('Agradecimento');
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.tela}>
        <Text style={styles.questionText}>O que você achou da Feira de Profissões da UTFPR 2025?</Text>

        <View style={styles.buttonContainer}>
          {['Péssimo','Ruim','Neutro','Bom','Excelente'].map((label) => (
            <EmojiButton 
              key={label} 
              label={label} 
              color={RATING_COLORS[label]} 
              isSelected={selectedRating === label}
              onSelect={() => handleSelect(label)} 
            />
          ))}
        </View>
          <TouchableOpacity style={styles.submitButton}onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Enviar Resposta</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: GLOBAL_COLORS.BACKGROUND, alignItems: 'center', justifyContent: 'center' },
  tela: { width: '100%', alignItems: 'center', paddingVertical: 50 },
  questionText: { 
    fontSize: FONT_SIZES.title, 
    color: GLOBAL_COLORS.TEXT, 
    fontWeight: FONT_WEIGHTS.bold, 
    textAlign: 'center', 
    marginBottom: 40 
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingHorizontal: 10 },
  submitButton: {
    marginTop: 60,
    backgroundColor: RATING_COLORS['Excelente'],
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  submitButtonText: {
    color: GLOBAL_COLORS.BACKGROUND,
    fontSize: FONT_SIZES.subtitle,
    fontWeight: FONT_WEIGHTS.bold,
  }
});

export default ColetaScreen;
