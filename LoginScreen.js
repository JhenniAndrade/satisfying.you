import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth_mod } from '../firebase/config';
import { COLORS } from '../theme/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../theme/fonts';

// 1. IMPORTAR O REDUX
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 2. INICIALIZAR O DISPATCH
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    signInWithEmailAndPassword(auth_mod, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // 3. A CORREÇÃO IMPORTANTE:
        // EXTRAIR APENAS O EMAIL E UID.
        // Se você mandar "dispatch(login(user))" direto, O APP VAI TRAVAR.
        dispatch(login({
            email: user.email,
            uid: user.uid
        }));

        // O redirecionamento será automático pelo AppNavigator
      })
      .catch((error) => {
        console.log("Erro login:", error);
        setError('E-mail ou senha incorretos.');
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Satisfying.you</Text>
        
        <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
            style={styles.input}
            placeholder="email@provedor.com"
            placeholderTextColor={COLORS.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            />
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor={COLORS.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CriarConta')} style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Criar minha conta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.loginBackground },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.success, // Ajuste para a cor do seu logo
    marginBottom: 40,
    fontFamily: 'AveriaLibre-Regular' // Se estiver usando a fonte customizada
  },
  inputContainer: {
      width: '100%',
      marginBottom: 15
  },
  label: {
      color: COLORS.white,
      marginBottom: 5,
      fontSize: FONT_SIZES.body
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: FONT_SIZES.body,
    color: COLORS.text,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.success, // Verde do botão
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.subtitle,
    fontWeight: 'bold',
  },
  createAccountButton: {
    marginTop: 30,
    backgroundColor: '#4E4B59', // Cor cinza/azulada do botão inferior
    width: '100%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.small
  },
  errorText: {
    color: '#FF4444',
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  forgotPasswordButton: {
      marginTop: 10,
      alignSelf: 'flex-end' // Se quiser alinhar à direita como costuma ser
  },
  forgotPasswordText: {
      color: COLORS.white,
      fontSize: FONT_SIZES.small
  }
});

export default LoginScreen;