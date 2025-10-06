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

const CriarContaScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleRegister = () => {
    // A validação (Critério 2) será implementada aqui.
    if (!email.trim() || !email.includes('@')) {
      setError('E-mail inválido.');
      return;
    }
    if (password.length < 6 || !password) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas devem ser iguais.');
      return;
    }
    setError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar Sua Conta</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={COLORS.textLight}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={COLORS.textLight}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirme a Senha"
          placeholderTextColor={COLORS.textLight}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
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

// ... (Use os mesmos estilos de LoginScreen, adaptando o container)
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
    marginBottom: 40,
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

export default CriarContaScreen;
