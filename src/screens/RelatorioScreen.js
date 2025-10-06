import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {relatorios, GLOBAL_COLORS} from '../data/relatorioData';
import {FONT_SIZES, FONT_WEIGHTS} from '../theme/fonts';

const RelatorioScreen = () => {
  const relatorio = relatorios[0];

  const data = relatorio.resultados.map(item => ({
    value: item.valor,
    color: item.color,
    text: item.categoria,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{relatorio.nome}</Text>
      <PieChart
        data={data}
        radius={100}
        innerRadius={60}
        textColor={GLOBAL_COLORS.TEXT}
        textSize={FONT_SIZES.body}
        showText
        focusOnPress
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: GLOBAL_COLORS.TEXT,
    fontSize: FONT_SIZES.title,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default RelatorioScreen;
