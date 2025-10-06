import React, {useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {GLOBAL_COLORS} from '../data/relatorioData';
import {FONT_SIZES, FONT_WEIGHTS} from '../theme/fonts';

const AgradecimentoScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.fullScreen}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={GLOBAL_COLORS.BACKGROUND}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.thankYouText}>
          Obrigado por participar da pesquisa!
        </Text>
        <Text style={styles.thankYouSubText}>
          Aguardamos você no próximo ano!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {flex: 1, backgroundColor: GLOBAL_COLORS.BACKGROUND},
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  thankYouText: {
    color: GLOBAL_COLORS.TEXT,
    fontSize: FONT_SIZES.largeTitle,
    fontWeight: FONT_WEIGHTS.bold,
    textAlign: 'center',
    marginBottom: 20,
  },
  thankYouSubText: {
    color: GLOBAL_COLORS.TEXT,
    fontSize: FONT_SIZES.title,
    fontWeight: FONT_WEIGHTS.medium,
    textAlign: 'center',
  },
});

export default AgradecimentoScreen;
