import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {COLORS} from '../theme/colors';
import {FONT_SIZES, FONT_WEIGHTS} from '../theme/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const simulateNavigate = screenName =>
  console.log(`Navegando para: ${screenName}`);


const AcoesPesquisaScreen = ({navigation}) => {
  const handleModificar = () => {
    navigation.navigate('Modificar');
  };

  const handleColetarDados = () => {
    navigation.navigate('ColetarDados');
  };

  const handleRelatorio = () => {
    navigation.navigate('Relatorio');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack('Home')}>
            <Icon name="arrow-left" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carnaval</Text>
          <View style={{width: 28}} />
        </View>

        <View style={styles.content}>
          <View style={styles.menuGrid}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleModificar}
              activeOpacity={0.7}>
              <Icon
                name="file-document-edit-outline"
                size={48}
                color={COLORS.white}
              />
              <Text style={styles.menuLabel}>Modificar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleColetarDados}
              activeOpacity={0.7}>
              <Icon
                name="checkbox-multiple-marked-outline"
                size={48}
                color={COLORS.white}
              />
              <Text style={styles.menuLabel}>Coletar dados</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleRelatorio}
              activeOpacity={0.7}>
              <Icon name="chart-donut" size={48} color={COLORS.white} />
              <Text style={styles.menuLabel}>Relatório</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.acoesbackgroundColor,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.acoesHeaderColor,
  },
  headerTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  menuGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuItem: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.itemMenuColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
  },
  menuLabel: {
    color: COLORS.white,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: FONT_WEIGHTS.medium,
    marginTop: 8,
  },
});

export default AcoesPesquisaScreen;
