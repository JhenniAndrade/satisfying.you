import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { GLOBAL_COLORS } from '../data/relatorioData';
import { FONT_SIZES, FONT_WEIGHTS } from '../theme/fonts';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

// Cores fixas usadas no gráfico
const COLORS = {
  Péssimo: '#E74C3C',
  Ruim: '#E67E22',
  Neutro: '#F1C40F',
  Bom: '#2ECC71',
  Excelente: '#3498DB',
};

const RelatorioScreen = () => {
  const [loading, setLoading] = useState(true);
  const [contagem, setContagem] = useState({
    Péssimo: 0,
    Ruim: 0,
    Neutro: 0,
    Bom: 0,
    Excelente: 0,
  });

  // 🔹 Buscar dados em tempo real do Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'avaliacoes'), snapshot => {
      const counts = {
        Péssimo: 0,
        Ruim: 0,
        Neutro: 0,
        Bom: 0,
        Excelente: 0,
      };

      snapshot.forEach(doc => {
        const rating = doc.data().rating;
        if (counts[rating] !== undefined) {
          counts[rating]++;
        }
      });

      setContagem(counts);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Transformar dados para o gráfico
  const chartData = Object.keys(contagem).map(key => ({
    value: contagem[key],
    color: COLORS[key],
    text: key,
  }));

  const totalVotos = Object.values(contagem).reduce((a, b) => a + b, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Avaliações</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : totalVotos === 0 ? (
        <Text style={styles.emptyText}>
          Nenhuma avaliação enviada ainda.
        </Text>
      ) : (
        <>
          <PieChart
            data={chartData}
            radius={110}
            innerRadius={60}
            textColor={GLOBAL_COLORS.TEXT}
            textSize={FONT_SIZES.body}
            showText={false}
            focusOnPress
          />

          <View style={styles.legendContainer}>
            {Object.keys(contagem).map((key, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.colorBox, { backgroundColor: COLORS[key] }]}
                />
                <Text style={styles.legendLabel}>
                  {key} — {contagem[key]}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
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
  emptyText: {
    color: GLOBAL_COLORS.TEXT,
    fontSize: FONT_SIZES.subtitle,
    marginTop: 30,
  },
  legendContainer: {
    marginTop: 25,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
  },
  legendLabel: {
    color: GLOBAL_COLORS.TEXT,
    fontSize: FONT_SIZES.body,
  },
});

export default RelatorioScreen;
