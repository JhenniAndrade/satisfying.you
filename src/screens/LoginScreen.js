import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../theme/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLogin = () => {
    // Lógica de login temporária
    if (!email.trim() || !email.includes('@')) {
      setError('E-mail inválido.');
      return;
    }
    if (password.length < 6 || !password) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setError('');
    navigation.replace('App');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Satisfying.you</Text>
          <Icon name="sentiment_satisfied" size={24} color={COLORS.primary} />
        </View>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="jurandir.pereira@hotmail.com"
          placeholderTextColor={COLORS.textLight}
          value={email}
          onChangeText={text => {
            setEmail(text);
            setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="••••••••"
          placeholderTextColor={COLORS.textLight}
          value={password}
          onChangeText={text => {
            setPassword(text);
            setError('');
          }}
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate('CriarConta')}>
          <Text style={styles.createAccountText}>Criar minha conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate('RecuperarSenha')}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.loginBackground,
  },
  container: {
    flexGrow: 1,
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginRight: 10,
  },
  emoji: {
    fontSize: 36,
  },
  label: {
    width: '100%',
    color: COLORS.white,
    fontSize: FONT_SIZES.body,
    fontWeight: FONT_WEIGHTS.medium,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    paddingHorizontal: 15,
    marginBottom: 5,
    fontSize: FONT_SIZES.body,
    color: COLORS.text,
  },
  inputError: {
    borderWidth: 2,
    borderColor: COLORS.error,
  },
  errorText: {
    width: '100%',
    color: COLORS.warning,
    fontSize: FONT_SIZES.small,
    marginBottom: 10,
    marginTop: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.success,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.subtitle,
    fontWeight: FONT_WEIGHTS.bold,
  },
  createAccountButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#419ED7',
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  createAccountText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.body,
    fontWeight: FONT_WEIGHTS.medium,
  },
  forgotPasswordButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#B0BEC5',
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.body,
    fontWeight: FONT_WEIGHTS.medium,
  },
});

export default LoginScreen;