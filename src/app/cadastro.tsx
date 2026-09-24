import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
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

export default function Cadastro() {
  const {
    signUp,
  } = useAuth();

  // ==========================================
  // ESTADOS
  // ==========================================

  const [
    name,
    setName,
  ] = useState('');

  const [
    username,
    setUsername,
  ] = useState('');

  const [
    email,
    setEmail,
  ] = useState('');

  const [
    password,
    setPassword,
  ] = useState('');

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');

  // ==========================================
  // CADASTRO
  // ==========================================

  async function handleRegister() {
    console.log(
      '🔥 Botão Criar Conta clicado'
    );

    setErrorMessage('');

    // ========================================
    // LIMPEZA DOS CAMPOS
    // ========================================

    const cleanName =
      name.trim();

    const cleanUsername =
      username
        .trim()
        .toLowerCase();

    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    // ========================================
    // DEBUG
    // ========================================

    console.log(
      '📋 Dados preenchidos:',
      {
        name:
          cleanName,

        username:
          cleanUsername,

        email:
          cleanEmail,

        passwordLength:
          password.length,

        confirmPasswordLength:
          confirmPassword.length,
      }
    );

    // ========================================
    // VALIDAÇÕES
    // ========================================

    if (!cleanName) {
      setErrorMessage(
        'Digite seu nome.'
      );

      return;
    }

    if (!cleanUsername) {
      setErrorMessage(
        'Digite um username.'
      );

      return;
    }

    if (
      cleanUsername.length < 3
    ) {
      setErrorMessage(
        'O username precisa ter pelo menos 3 caracteres.'
      );

      return;
    }

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
        'Digite um endereço de e-mail válido.'
      );

      return;
    }

    if (!password) {
      setErrorMessage(
        'Digite uma senha.'
      );

      return;
    }

    if (
      password.length < 6
    ) {
      setErrorMessage(
        'A senha precisa ter pelo menos 6 caracteres.'
      );

      return;
    }

    if (!confirmPassword) {
      setErrorMessage(
        'Confirme sua senha.'
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setErrorMessage(
        'As senhas não são iguais.'
      );

      return;
    }

    // ========================================
    // SUPABASE
    // ========================================

    try {
      setLoading(true);

      console.log(
        '🚀 Enviando cadastro para Supabase...'
      );

      const error =
        await signUp(
          cleanName,
          cleanUsername,
          cleanEmail,
          password
        );

      console.log(
        '📦 Resposta do signUp:',
        error
      );

      // ======================================
      // ERRO
      // ======================================

      if (error) {
        setErrorMessage(
          translateError(
            error
          )
        );

        return;
      }

      // ======================================
      // SUCESSO
      // ======================================

      console.log(
        '✅ Cadastro finalizado com sucesso'
      );

      setName('');

      setUsername('');

      setEmail('');

      setPassword('');

      setConfirmPassword('');

      setErrorMessage('');

      // ======================================
      // VAI PARA LOGIN
      // ======================================

      console.log(
        '➡️ Indo para Login...'
      );

      router.replace(
        '/login'
      );
    } catch (error) {
      console.error(
        '❌ Erro inesperado:',
        error
      );

      setErrorMessage(
        'Não foi possível criar sua conta.'
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // TRADUÇÃO DOS ERROS
  // ==========================================

  function translateError(
    error: string
  ) {
    const message =
      error.toLowerCase();

    if (
      message.includes(
        'already registered'
      ) ||
      message.includes(
        'already been registered'
      )
    ) {
      return 'Esse e-mail já possui uma conta.';
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
        'password'
      )
    ) {
      return 'A senha não atende aos requisitos.';
    }

    if (
      message.includes(
        'network'
      )
    ) {
      return 'Não foi possível conectar ao servidor.';
    }

    return error;
  }

  // ==========================================
  // TELA
  // ==========================================

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <KeyboardAvoidingView
        style={
          styles.keyboard
        }
        behavior={
          Platform.OS ===
          'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={
            styles.content
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={
            false
          }
        >
          {/* ==================================
              VOLTAR
          ================================== */}

          <Pressable
            style={
              styles.back
            }
            onPress={() =>
              router.back()
            }
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color={
                COLORS.text
              }
            />
          </Pressable>

          {/* ==================================
              LOGO
          ================================== */}

          <View
            style={
              styles.logo
            }
          >
            <Ionicons
              name="game-controller"
              size={38}
              color={
                COLORS.primaryLight
              }
            />
          </View>

          {/* ==================================
              CABEÇALHO
          ================================== */}

          <Text
            style={
              styles.title
            }
          >
            Crie sua conta
          </Text>

          <Text
            style={
              styles.subtitle
            }
          >
            Entre para a comunidade PartyUp.
          </Text>

          {/* ==================================
              NOME
          ================================== */}

          <Field
            label="Nome"
            icon="person-outline"
            placeholder="Seu nome"
            value={name}
            onChangeText={(
              value
            ) => {
              setName(
                value
              );

              setErrorMessage(
                ''
              );
            }}
          />

          {/* ==================================
              USERNAME
          ================================== */}

          <Field
            label="Username"
            icon="at-outline"
            placeholder="Ex: andre"
            value={
              username
            }
            onChangeText={(
              value
            ) => {
              setUsername(
                value
              );

              setErrorMessage(
                ''
              );
            }}
            autoCapitalize="none"
          />

          {/* ==================================
              EMAIL
          ================================== */}

          <Field
            label="E-mail"
            icon="mail-outline"
            placeholder="seu@email.com"
            value={email}
            onChangeText={(
              value
            ) => {
              setEmail(
                value
              );

              setErrorMessage(
                ''
              );
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* ==================================
              SENHA
          ================================== */}

          <Field
            label="Senha"
            icon="lock-closed-outline"
            placeholder="Mínimo 6 caracteres"
            value={
              password
            }
            onChangeText={(
              value
            ) => {
              setPassword(
                value
              );

              setErrorMessage(
                ''
              );
            }}
            secure
            autoCapitalize="none"
          />

          {/* ==================================
              CONFIRMAR SENHA
          ================================== */}

          <Field
            label="Confirmar senha"
            icon="lock-closed-outline"
            placeholder="Digite novamente"
            value={
              confirmPassword
            }
            onChangeText={(
              value
            ) => {
              setConfirmPassword(
                value
              );

              setErrorMessage(
                ''
              );
            }}
            secure
            autoCapitalize="none"
          />

          {/* ==================================
              ERRO
          ================================== */}

          {errorMessage !==
            '' && (
            <View
              style={
                styles.errorBox
              }
            >
              <Ionicons
                name="alert-circle-outline"
                size={21}
                color={
                  COLORS.danger
                }
              />

              <Text
                style={
                  styles.errorText
                }
              >
                {
                  errorMessage
                }
              </Text>
            </View>
          )}

          {/* ==================================
              CRIAR CONTA
          ================================== */}

          <Pressable
            style={({
              pressed,
            }) => [
              styles.button,

              pressed &&
                !loading &&
                styles.buttonPressed,

              loading &&
                styles.buttonDisabled,
            ]}
            onPress={
              handleRegister
            }
            disabled={
              loading
            }
          >
            {loading ? (
              <>
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />

                <Text
                  style={
                    styles.buttonText
                  }
                >
                  Criando conta...
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={
                    styles.buttonText
                  }
                >
                  Criar conta
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
              LOGIN
          ================================== */}

          <Pressable
            style={
              styles.loginContainer
            }
            onPress={() => {
              console.log(
                '➡️ Abrindo Login...'
              );

              router.replace(
                '/login'
              );
            }}
          >
            <Text
              style={
                styles.loginText
              }
            >
              Já possui uma conta?{' '}

              <Text
                style={
                  styles.loginHighlight
                }
              >
                Entrar
              </Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ==========================================
// INPUT
// ==========================================

interface FieldProps {
  label: string;

  icon:
    keyof typeof Ionicons.glyphMap;

  placeholder: string;

  value: string;

  onChangeText:
    (text: string) => void;

  secure?: boolean;

  keyboardType?:
    | 'default'
    | 'email-address';

  autoCapitalize?:
    | 'none'
    | 'sentences'
    | 'words'
    | 'characters';
}

function Field({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  secure = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}: FieldProps) {
  return (
    <View
      style={
        styles.field
      }
    >
      <Text
        style={
          styles.label
        }
      >
        {label}
      </Text>

      <View
        style={
          styles.inputContainer
        }
      >
        <Ionicons
          name={icon}
          size={20}
          color={
            COLORS.textSecondary
          }
        />

        <TextInput
          style={
            styles.input
          }
          value={value}
          onChangeText={
            onChangeText
          }
          placeholder={
            placeholder
          }
          placeholderTextColor={
            COLORS.textSecondary
          }
          secureTextEntry={
            secure
          }
          keyboardType={
            keyboardType
          }
          autoCapitalize={
            autoCapitalize
          }
          autoCorrect={
            false
          }
        />
      </View>
    </View>
  );
}

// ==========================================
// ESTILOS
// ==========================================

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor:
        COLORS.background,
    },

    keyboard: {
      flex: 1,
    },

    content: {
      flexGrow: 1,

      padding:
        SPACING.xl,

      paddingBottom: 50,
    },

    back: {
      width: 42,
      height: 42,

      borderRadius: 21,

      backgroundColor:
        COLORS.surface,

      alignItems:
        'center',

      justifyContent:
        'center',

      borderWidth: 1,

      borderColor:
        COLORS.border,

      marginBottom: 25,
    },

    logo: {
      width: 70,
      height: 70,

      borderRadius: 22,

      backgroundColor:
        COLORS.surface,

      alignItems:
        'center',

      justifyContent:
        'center',

      borderWidth: 1,

      borderColor:
        COLORS.border,

      marginBottom: 25,
    },

    title: {
      color:
        COLORS.text,

      fontSize: 28,

      fontWeight:
        '800',
    },

    subtitle: {
      color:
        COLORS.textSecondary,

      fontSize: 14,

      marginTop: 6,

      marginBottom: 30,
    },

    field: {
      marginBottom:
        SPACING.md,
    },

    label: {
      color:
        COLORS.text,

      fontSize: 13,

      fontWeight:
        '600',

      marginBottom: 7,
    },

    inputContainer: {
      minHeight: 52,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      borderRadius:
        RADIUS.md,

      paddingHorizontal:
        SPACING.md,

      flexDirection:
        'row',

      alignItems:
        'center',

      gap:
        SPACING.sm,
    },

    input: {
      flex: 1,

      color:
        COLORS.text,

      fontSize: 14,

      paddingVertical: 14,
    },

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

      marginTop: 5,

      marginBottom:
        SPACING.sm,

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

    button: {
      height: 56,

      backgroundColor:
        COLORS.primary,

      borderRadius:
        RADIUS.md,

      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'center',

      gap: 8,

      marginTop:
        SPACING.md,
    },

    buttonPressed: {
      opacity: 0.8,
    },

    buttonDisabled: {
      opacity: 0.65,
    },

    buttonText: {
      color:
        '#FFFFFF',

      fontWeight:
        '700',

      fontSize: 15,
    },

    loginContainer: {
      alignItems:
        'center',

      justifyContent:
        'center',

      paddingVertical: 24,
    },

    loginText: {
      color:
        COLORS.textSecondary,

      fontSize: 13,
    },

    loginHighlight: {
      color:
        COLORS.primaryLight,

      fontWeight:
        '700',
    },
  });