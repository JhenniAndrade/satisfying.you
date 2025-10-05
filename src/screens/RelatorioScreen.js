import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { relatorios, GLOBAL_COLORS } from '../data/relatorioData';
import { FONT_SIZES, FONT_WEIGHTS } from '../theme/fonts';

const RelatorioScreen = () => {
  const relatorio = relatorios[0];

  const data = relatorio.resultados.map(item => ({
    name: item.categoria,
    population: item.valor,
    color: item.color,
    legendFontColor: GLOBAL_COLORS.TEXT,
    legendFontSize: FONT_SIZES.body,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{relatorio.nome}</Text>
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          color: () => GLOBAL_COLORS.TEXT,
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GLOBAL_COLORS.BACKGROUND, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { color: GLOBAL_COLORS.TEXT, fontSize: FONT_SIZES.title, fontWeight: FONT_WEIGHTS.bold, marginBottom: 20, textAlign: 'center' },
});

export default RelatorioScreen;
