import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {COLORS} from '../theme/colors';
import {FONT_SIZES, FONT_WEIGHTS} from '../theme/fonts';

const RecuperarSenhaScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const handleRecovery = () => {
    // A validação de email válido (Critério 2) será adicionada aqui.
    if (!email.trim() || !email.includes('@')) {
      setError('E-mail inválido.');
      return;
    }
    setError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar Senha</Text>
        <Text style={styles.instruction}>
          Digite seu e-mail para receber o link de redefinição.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={COLORS.textLight}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRecovery}>
          <Text style={styles.buttonText}>ENVIAR CÓDIGO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backText}>Voltar para o Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ... (Use os mesmos estilos de LoginScreen e CriarContaScreen)
const styles = StyleSheet.create({
  ...StyleSheet.create({
    /* ... Estilos do LoginScreen aqui */
  }), // Reaproveite estilos
  safeArea: {flex: 1, backgroundColor: COLORS.background},
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginBottom: 20,
  },
  instruction: {
    fontSize: FONT_SIZES.body,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.textLight,
    fontSize: FONT_SIZES.body,
    color: COLORS.text,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.subtitle,
    fontWeight: FONT_WEIGHTS.bold,
  },
  backButton: {marginTop: 20},
  backText: {color: COLORS.textLight, fontSize: FONT_SIZES.small},
});

export default RecuperarSenhaScreen;
