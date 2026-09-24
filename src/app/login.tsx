import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  COLORS,
  RADIUS,
  SPACING,
} from '../constants/theme';

import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { signIn } = useAuth();

  // ==========================================
  // ESTADOS
  // ==========================================

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

  // ==========================================
  // LOGIN
  // ==========================================

  async function handleLogin() {
    console.log('🔐 Botão Entrar clicado');

    setErrorMessage('');

    const cleanEmail = email
      .trim()
      .toLowerCase();

    // ========================================
    // VALIDAÇÕES
    // ========================================

    if (!cleanEmail) {
      setErrorMessage(
        'Digite seu e-mail.'
      );

      return;
    }

    if (
      !cleanEmail.includes('@') ||
      !cleanEmail.includes('.')
    ) {
      setErrorMessage(
        'Digite um e-mail válido.'
      );

      return;
    }

    if (!password) {
      setErrorMessage(
        'Digite sua senha.'
      );

      return;
    }

    // ========================================
    // SUPABASE
    // ========================================

    try {
      setLoading(true);

      console.log(
        '🚀 Enviando login para Supabase...'
      );

      console.log(
        '📧 Email:',
        cleanEmail
      );

      const error = await signIn(
        cleanEmail,
        password
      );

      console.log(
        '📦 Resposta do signIn:',
        error
      );

      // ======================================
      // ERRO
      // ======================================

      if (error) {
        setErrorMessage(
          translateError(error)
        );

        return;
      }

      // ======================================
      // SUCESSO
      // ======================================

      console.log(
        '✅ Login realizado com sucesso'
      );

      setEmail('');
      setPassword('');
      setErrorMessage('');

      console.log(
        '➡️ Indo para Home...'
      );

      router.replace('/(tabs)/home');
    } catch (error) {
      console.error(
        '❌ Erro inesperado no login:',
        error
      );

      setErrorMessage(
        'Não foi possível entrar. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // TRADUZ ERROS DO SUPABASE
  // ==========================================

  function translateError(
    error: string
  ) {
    const message =
      error.toLowerCase();

    if (
      message.includes(
        'invalid login credentials'
      )
    ) {
      return 'E-mail ou senha incorretos.';
    }

    if (
      message.includes(
        'email not confirmed'
      )
    ) {
      return 'Seu e-mail ainda não foi confirmado.';
    }

    if (
      message.includes(
        'invalid email'
      )
    ) {
      return 'O e-mail informado é inválido.';
    }

    if (
      message.includes(
        'network'
      ) ||
      message.includes(
        'failed to fetch'
      )
    ) {
      return 'Não foi possível conectar ao servidor.';
    }

    if (
      message.includes(
        'rate limit'
      )
    ) {
      return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
    }

    return error;
  }

  // ==========================================
  // TELA
  // ==========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.content}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        {/* ==================================
            LOGO
        ================================== */}

        <View
          style={styles.logoContainer}
        >
          <View style={styles.logo}>
            <Ionicons
              name="game-controller"
              size={42}
              color={
                COLORS.primaryLight
              }
            />
          </View>

          <Text
            style={styles.logoText}
          >
            Party
            <Text
              style={styles.highlight}
            >
              Up
            </Text>
          </Text>

          <Text
            style={styles.slogan}
          >
            Never Play Alone.
          </Text>
        </View>

        {/* ==================================
            FORMULÁRIO
        ================================== */}

        <View style={styles.form}>
          <Text
            style={styles.title}
          >
            Bem-vindo de volta
          </Text>

          <Text
            style={styles.subtitle}
          >
            Entre na sua conta para continuar.
          </Text>

          {/* ==================================
              EMAIL
          ================================== */}

          <Text
            style={styles.label}
          >
            E-mail
          </Text>

          <View
            style={
              styles.inputContainer
            }
          >
            <Ionicons
              name="mail-outline"
              size={20}
              color={
                COLORS.textSecondary
              }
            />

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(
                value
              ) => {
                setEmail(value);
                setErrorMessage('');
              }}
              placeholder="seu@email.com"
              placeholderTextColor={
                COLORS.textSecondary
              }
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* ==================================
              SENHA
          ================================== */}

          <Text
            style={styles.label}
          >
            Senha
          </Text>

          <View
            style={
              styles.inputContainer
            }
          >
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={
                COLORS.textSecondary
              }
            />

            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(
                value
              ) => {
                setPassword(value);
                setErrorMessage('');
              }}
              placeholder="Sua senha"
              placeholderTextColor={
                COLORS.textSecondary
              }
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={
                handleLogin
              }
            />
          </View>

          {/* ==================================
              ERRO
          ================================== */}

          {errorMessage !== '' && (
            <View
              style={styles.errorBox}
            >
              <Ionicons
                name="alert-circle-outline"
                size={21}
                color={COLORS.danger}
              />

              <Text
                style={
                  styles.errorText
                }
              >
                {errorMessage}
              </Text>
            </View>
          )}

          {/* ==================================
              ENTRAR
          ================================== */}

          <Pressable
            style={({ pressed }) => [
              styles.button,

              pressed &&
                !loading &&
                styles.buttonPressed,

              loading &&
                styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <ActivityIndicator
                  color="#FFFFFF"
                  size="small"
                />

                <Text
                  style={
                    styles.buttonText
                  }
                >
                  Entrando...
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={
                    styles.buttonText
                  }
                >
                  Entrar
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color="#FFFFFF"
                />
              </>
            )}
          </Pressable>

          {/* ==================================
              CADASTRO
          ================================== */}

          <Pressable
            style={styles.register}
            onPress={() => {
              console.log(
                '➡️ Indo para Cadastro...'
              );

              router.push(
                '/cadastro'
              );
            }}
          >
            <Text
              style={
                styles.registerText
              }
            >
              Ainda não possui conta?{' '}

              <Text
                style={
                  styles.highlight
                }
              >
                Cadastre-se
              </Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ==========================================
// ESTILOS
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      COLORS.background,
  },

  content: {
    flex: 1,

    justifyContent:
      'center',

    padding:
      SPACING.xl,
  },

  logoContainer: {
    alignItems:
      'center',

    marginBottom: 40,
  },

  logo: {
    width: 80,
    height: 80,

    borderRadius: 25,

    backgroundColor:
      COLORS.surface,

    alignItems:
      'center',

    justifyContent:
      'center',

    borderWidth: 1,

    borderColor:
      COLORS.border,
  },

  logoText: {
    color:
      COLORS.text,

    fontSize: 32,

    fontWeight:
      '800',

    marginTop: 12,
  },

  highlight: {
    color:
      COLORS.primaryLight,

    fontWeight:
      '700',
  },

  slogan: {
    color:
      COLORS.textSecondary,

    marginTop: 3,
  },

  form: {
    width: '100%',
  },

  title: {
    color:
      COLORS.text,

    fontSize: 24,

    fontWeight:
      '800',
  },

  subtitle: {
    color:
      COLORS.textSecondary,

    marginTop: 5,

    marginBottom: 25,
  },

  label: {
    color:
      COLORS.text,

    fontSize: 13,

    fontWeight:
      '600',

    marginBottom: 7,

    marginTop: 12,
  },

  inputContainer: {
    height: 52,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius:
      RADIUS.md,

    flexDirection:
      'row',

    alignItems:
      'center',

    paddingHorizontal:
      SPACING.md,

    gap:
      SPACING.sm,
  },

  input: {
    flex: 1,

    color:
      COLORS.text,

    fontSize: 14,
  },

  // ========================================
  // ERRO
  // ========================================

  errorBox: {
    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.danger,

    borderRadius:
      RADIUS.md,

    padding:
      SPACING.md,

    marginTop: 18,

    flexDirection:
      'row',

    alignItems:
      'center',

    gap:
      SPACING.sm,
  },

  errorText: {
    flex: 1,

    color:
      COLORS.danger,

    fontSize: 13,

    lineHeight: 18,
  },

  // ========================================
  // BOTÃO
  // ========================================

  button: {
    height: 55,

    borderRadius:
      RADIUS.md,

    backgroundColor:
      COLORS.primary,

    alignItems:
      'center',

    justifyContent:
      'center',

    flexDirection:
      'row',

    gap: 8,

    marginTop: 25,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  buttonText: {
    color: '#FFFFFF',

    fontWeight:
      '700',

    fontSize: 15,
  },

  register: {
    alignItems:
      'center',

    marginTop: 20,

    paddingVertical: 8,
  },

  registerText: {
    color:
      COLORS.textSecondary,

    fontSize: 13,
  },
});