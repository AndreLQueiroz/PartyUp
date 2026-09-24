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
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  COLORS,
  RADIUS,
  SPACING,
} from '../../constants/theme';

import { useParties } from '../../contexts/PartyContext';

// ==========================================
// OPÇÕES
// ==========================================

const games = [
  'Valorant',
  'League of Legends',
  'CS2',
  'Minecraft',
];

const stylesParty = [
  'Casual',
  'Competitivo',
] as const;

const maxPlayersOptions = [
  2,
  3,
  4,
  5,
  6,
  8,
  10,
];

// ==========================================
// CRIAR PARTY
// ==========================================

export default function Criar() {
  const { addParty } =
    useParties();

  // ========================================
  // ESTADOS
  // ========================================

  const [game, setGame] =
    useState('Valorant');

  const [title, setTitle] =
    useState('');

  const [mode, setMode] =
    useState('');

  const [rank, setRank] =
    useState('');

  const [region, setRegion] =
    useState('BR');

  const [
    maxPlayers,
    setMaxPlayers,
  ] = useState(5);

  const [
    microphone,
    setMicrophone,
  ] = useState(true);

  const [
    partyStyle,
    setPartyStyle,
  ] = useState<
    'Casual' | 'Competitivo'
  >('Competitivo');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  // ========================================
  // CRIAR
  // ========================================

  async function handleCreate() {
    setError('');

    // ======================================
    // VALIDAÇÃO
    // ======================================

    if (!title.trim()) {
      setError(
        'Digite um nome para sua Party.'
      );

      return;
    }

    if (!mode.trim()) {
      setError(
        'Informe o modo de jogo.'
      );

      return;
    }

    if (!rank.trim()) {
      setError(
        'Informe o rank desejado.'
      );

      return;
    }

    if (!region.trim()) {
      setError(
        'Informe a região.'
      );

      return;
    }

    try {
      setLoading(true);

      console.log(
        '🎮 Criando Party...'
      );

      const party =
        await addParty({
          game,

          title:
            title.trim(),

          mode:
            mode.trim(),

          rank:
            rank.trim(),

          region:
            region
              .trim()
              .toUpperCase(),

          maxPlayers,

          microphone,

          style:
            partyStyle,
        });

      if (!party) {
        setError(
          'Não foi possível criar a Party.'
        );

        return;
      }

      console.log(
        '✅ Party criada:',
        party
      );

      // ======================================
      // ABRE A PARTY CRIADA
      // ======================================

      router.push({
        pathname:
          '/party/[id]',

        params: {
          id: party.id,
        },
      });

      // ======================================
      // LIMPA FORMULÁRIO
      // ======================================

      setTitle('');

      setMode('');

      setRank('');

      setRegion('BR');

      setMaxPlayers(5);

      setMicrophone(true);

      setPartyStyle(
        'Competitivo'
      );
    } catch (err) {
      console.error(
        '❌ Erro criando Party:',
        err
      );

      setError(
        'Ocorreu um erro ao criar a Party.'
      );
    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // TELA
  // ========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.content
          }
        >
          {/* ==================================
              HEADER
          ================================== */}

          <View
            style={styles.header}
          >
            <View>
              <Text
                style={
                  styles.eyebrow
                }
              >
                NOVA SQUAD
              </Text>

              <Text
                style={
                  styles.title
                }
              >
                Criar Party
              </Text>

              <Text
                style={
                  styles.subtitle
                }
              >
                Configure sua Party e
                encontre jogadores.
              </Text>
            </View>

            <View
              style={
                styles.headerIcon
              }
            >
              <Ionicons
                name="add"
                size={27}
                color={
                  COLORS.primaryLight
                }
              />
            </View>
          </View>

          {/* ==================================
              CARD DE INTRODUÇÃO
          ================================== */}

          <View
            style={
              styles.heroCard
            }
          >
            <View
              style={
                styles.heroGlow
              }
            />

            <View
              style={
                styles.heroIcon
              }
            >
              <Ionicons
                name="people"
                size={25}
                color="#FFFFFF"
              />
            </View>

            <View
              style={
                styles.heroContent
              }
            >
              <Text
                style={
                  styles.heroTitle
                }
              >
                Monte sua squad
              </Text>

              <Text
                style={
                  styles.heroText
                }
              >
                Defina o jogo, nível
                dos jogadores e as
                regras da sua Party.
              </Text>
            </View>
          </View>

          {/* ==================================
              JOGO
          ================================== */}

          <SectionTitle
            icon="game-controller-outline"
            title="Jogo"
            description="Qual jogo vocês vão jogar?"
          />

          <View
            style={
              styles.gameGrid
            }
          >
            {games.map(
              (item) => {
                const selected =
                  game === item;

                return (
                  <Pressable
                    key={item}
                    style={({
                      pressed,
                    }) => [
                      styles.gameOption,

                      selected &&
                        styles.gameOptionSelected,

                      pressed &&
                        styles.pressed,
                    ]}
                    onPress={() =>
                      setGame(item)
                    }
                  >
                    <View
                      style={[
                        styles.gameOptionIcon,

                        selected &&
                          styles.gameOptionIconSelected,
                      ]}
                    >
                      <Ionicons
                        name={
                          getGameIcon(
                            item
                          )
                        }
                        size={21}
                        color={
                          selected
                            ? '#FFFFFF'
                            : COLORS.textSecondary
                        }
                      />
                    </View>

                    <Text
                      style={[
                        styles.gameOptionText,

                        selected &&
                          styles.gameOptionTextSelected,
                      ]}
                      numberOfLines={1}
                    >
                      {item}
                    </Text>

                    {selected && (
                      <View
                        style={
                          styles.selectedCheck
                        }
                      >
                        <Ionicons
                          name="checkmark"
                          size={11}
                          color="#FFFFFF"
                        />
                      </View>
                    )}
                  </Pressable>
                );
              }
            )}
          </View>

          {/* ==================================
              INFORMAÇÕES
          ================================== */}

          <SectionTitle
            icon="create-outline"
            title="Informações"
            description="Conte o que você está procurando."
          />

          <InputField
            label="NOME DA PARTY"
            icon="flash-outline"
            value={title}
            onChangeText={
              setTitle
            }
            placeholder="Ex: Ranked pra subir elo"
            maxLength={50}
          />

          <InputField
            label="MODO"
            icon="layers-outline"
            value={mode}
            onChangeText={
              setMode
            }
            placeholder="Ex: Competitivo, Ranked, Flex..."
            maxLength={30}
          />

          <InputField
            label="RANK"
            icon="trophy-outline"
            value={rank}
            onChangeText={
              setRank
            }
            placeholder="Ex: Diamante"
            maxLength={30}
          />

          <InputField
            label="REGIÃO"
            icon="location-outline"
            value={region}
            onChangeText={
              setRegion
            }
            placeholder="Ex: BR"
            maxLength={20}
          />

          {/* ==================================
              ESTILO
          ================================== */}

          <SectionTitle
            icon="options-outline"
            title="Estilo da Party"
            description="Escolha o clima da partida."
          />

          <View
            style={
              styles.styleOptions
            }
          >
            {stylesParty.map(
              (item) => {
                const selected =
                  partyStyle === item;

                const icon =
                  item ===
                  'Competitivo'
                    ? 'trophy-outline'
                    : 'happy-outline';

                return (
                  <Pressable
                    key={item}
                    style={({
                      pressed,
                    }) => [
                      styles.styleOption,

                      selected &&
                        styles.styleOptionSelected,

                      pressed &&
                        styles.pressed,
                    ]}
                    onPress={() =>
                      setPartyStyle(
                        item
                      )
                    }
                  >
                    <View
                      style={[
                        styles.styleIcon,

                        selected &&
                          styles.styleIconSelected,
                      ]}
                    >
                      <Ionicons
                        name={icon}
                        size={22}
                        color={
                          selected
                            ? '#FFFFFF'
                            : COLORS.textSecondary
                        }
                      />
                    </View>

                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text
                        style={[
                          styles.styleTitle,

                          selected &&
                            styles.styleTitleSelected,
                        ]}
                      >
                        {item}
                      </Text>

                      <Text
                        style={
                          styles.styleDescription
                        }
                      >
                        {item ===
                        'Competitivo'
                          ? 'Foco em desempenho e vitória.'
                          : 'Jogar tranquilo e se divertir.'}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.radio,

                        selected &&
                          styles.radioSelected,
                      ]}
                    >
                      {selected && (
                        <View
                          style={
                            styles.radioDot
                          }
                        />
                      )}
                    </View>
                  </Pressable>
                );
              }
            )}
          </View>

          {/* ==================================
              TAMANHO
          ================================== */}

          <SectionTitle
            icon="people-outline"
            title="Tamanho da Squad"
            description="Quantos jogadores podem entrar?"
          />

          <View
            style={
              styles.playerOptions
            }
          >
            {maxPlayersOptions.map(
              (amount) => {
                const selected =
                  maxPlayers ===
                  amount;

                return (
                  <Pressable
                    key={amount}
                    style={({
                      pressed,
                    }) => [
                      styles.playerOption,

                      selected &&
                        styles.playerOptionSelected,

                      pressed &&
                        styles.pressed,
                    ]}
                    onPress={() =>
                      setMaxPlayers(
                        amount
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.playerOptionNumber,

                        selected &&
                          styles.playerOptionNumberSelected,
                      ]}
                    >
                      {amount}
                    </Text>
                  </Pressable>
                );
              }
            )}
          </View>

          <Text
            style={
              styles.playerHint
            }
          >
            Você já ocupa 1 vaga da
            Party.
          </Text>

          {/* ==================================
              MICROFONE
          ================================== */}

          <SectionTitle
            icon="settings-outline"
            title="Preferências"
            description="Defina os requisitos da Party."
          />

          <View
            style={
              styles.preferenceCard
            }
          >
            <View
              style={
                styles.preferenceIcon
              }
            >
              <Ionicons
                name="mic-outline"
                size={22}
                color={
                  microphone
                    ? COLORS.primaryLight
                    : COLORS.textSecondary
                }
              />
            </View>

            <View
              style={
                styles.preferenceInfo
              }
            >
              <Text
                style={
                  styles.preferenceTitle
                }
              >
                Microfone
              </Text>

              <Text
                style={
                  styles.preferenceDescription
                }
              >
                Exigir microfone dos
                jogadores
              </Text>
            </View>

            <Switch
              value={microphone}
              onValueChange={
                setMicrophone
              }
              trackColor={{
                false:
                  COLORS.surfaceLight,

                true:
                  COLORS.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* ==================================
              PREVIEW
          ================================== */}

          <View
            style={
              styles.previewCard
            }
          >
            <View
              style={
                styles.previewHeader
              }
            >
              <Text
                style={
                  styles.previewLabel
                }
              >
                RESUMO
              </Text>

              <View
                style={
                  styles.previewStatus
                }
              >
                <View
                  style={
                    styles.previewStatusDot
                  }
                />

                <Text
                  style={
                    styles.previewStatusText
                  }
                >
                  PRONTA PARA CRIAR
                </Text>
              </View>
            </View>

            <Text
              style={
                styles.previewGame
              }
            >
              {game}
            </Text>

            <Text
              style={
                styles.previewTitle
              }
            >
              {title.trim() ||
                'Sua nova Party'}
            </Text>

            <View
              style={
                styles.previewTags
              }
            >
              <PreviewTag
                icon="trophy-outline"
                text={
                  rank.trim() ||
                  'Rank'
                }
              />

              <PreviewTag
                icon="people-outline"
                text={`1/${maxPlayers}`}
              />

              <PreviewTag
                icon="location-outline"
                text={
                  region.trim() ||
                  'BR'
                }
              />

              {microphone && (
                <PreviewTag
                  icon="mic-outline"
                  text="Mic"
                />
              )}
            </View>
          </View>

          {/* ==================================
              ERRO
          ================================== */}

          {error.length > 0 && (
            <View
              style={
                styles.errorContainer
              }
            >
              <Ionicons
                name="alert-circle-outline"
                size={19}
                color={
                  COLORS.danger
                }
              />

              <Text
                style={
                  styles.errorText
                }
              >
                {error}
              </Text>
            </View>
          )}

          {/* ==================================
              CRIAR
          ================================== */}

          <Pressable
            disabled={loading}
            style={({
              pressed,
            }) => [
              styles.createButton,

              pressed &&
                styles.pressed,

              loading &&
                styles.createButtonDisabled,
            ]}
            onPress={
              handleCreate
            }
          >
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />
            ) : (
              <>
                <View
                  style={
                    styles.createIcon
                  }
                >
                  <Ionicons
                    name="add"
                    size={21}
                    color="#FFFFFF"
                  />
                </View>

                <Text
                  style={
                    styles.createText
                  }
                >
                  Criar Party
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color="#FFFFFF"
                />
              </>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ==========================================
// SECTION TITLE
// ==========================================

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon:
    keyof typeof Ionicons.glyphMap;

  title: string;

  description: string;
}) {
  return (
    <View
      style={
        styles.sectionHeader
      }
    >
      <View
        style={
          styles.sectionIcon
        }
      >
        <Ionicons
          name={icon}
          size={18}
          color={
            COLORS.primaryLight
          }
        />
      </View>

      <View>
        <Text
          style={
            styles.sectionTitle
          }
        >
          {title}
        </Text>

        <Text
          style={
            styles.sectionDescription
          }
        >
          {description}
        </Text>
      </View>
    </View>
  );
}

// ==========================================
// INPUT
// ==========================================

function InputField({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  maxLength,
}: {
  label: string;

  icon:
    keyof typeof Ionicons.glyphMap;

  value: string;

  onChangeText:
    (text: string) => void;

  placeholder: string;

  maxLength?: number;
}) {
  return (
    <View
      style={
        styles.inputGroup
      }
    >
      <Text
        style={
          styles.inputLabel
        }
      >
        {label}
      </Text>

      <View
        style={
          styles.inputContainer
        }
      >
        <View
          style={
            styles.inputIcon
          }
        >
          <Ionicons
            name={icon}
            size={18}
            color={
              COLORS.textSecondary
            }
          />
        </View>

        <TextInput
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
          style={
            styles.input
          }
          maxLength={
            maxLength
          }
        />

        {value.length > 0 && (
          <Pressable
            onPress={() =>
              onChangeText('')
            }
          >
            <Ionicons
              name="close-circle"
              size={18}
              color={
                COLORS.textSecondary
              }
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

// ==========================================
// PREVIEW TAG
// ==========================================

function PreviewTag({
  icon,
  text,
}: {
  icon:
    keyof typeof Ionicons.glyphMap;

  text: string;
}) {
  return (
    <View
      style={
        styles.previewTag
      }
    >
      <Ionicons
        name={icon}
        size={13}
        color={
          COLORS.textSecondary
        }
      />

      <Text
        style={
          styles.previewTagText
        }
      >
        {text}
      </Text>
    </View>
  );
}

// ==========================================
// ÍCONE DO JOGO
// ==========================================

function getGameIcon(
  game: string
): keyof typeof Ionicons.glyphMap {
  const value =
    game.toLowerCase();

  if (
    value.includes('valorant')
  ) {
    return 'flash';
  }

  if (
    value.includes('league')
  ) {
    return 'shield';
  }

  if (
    value.includes('cs2')
  ) {
    return 'locate';
  }

  if (
    value.includes('minecraft')
  ) {
    return 'cube';
  }

  return 'game-controller';
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

    content: {
      paddingHorizontal:
        SPACING.lg,

      paddingTop:
        SPACING.lg,

      paddingBottom: 135,
    },

    // ======================================
    // HEADER
    // ======================================

    header: {
      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'space-between',

      marginBottom: 22,
    },

    eyebrow: {
      color:
        COLORS.primaryLight,

      fontSize: 10,

      fontWeight: '900',

      letterSpacing: 1.5,

      marginBottom: 5,
    },

    title: {
      color: COLORS.text,

      fontSize: 30,

      fontWeight: '900',

      letterSpacing: -1,
    },

    subtitle: {
      color:
        COLORS.textSecondary,

      fontSize: 12,

      marginTop: 5,
    },

    headerIcon: {
      width: 48,

      height: 48,

      borderRadius: 16,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    // ======================================
    // HERO
    // ======================================

    heroCard: {
      position: 'relative',

      overflow: 'hidden',

      flexDirection: 'row',

      alignItems: 'center',

      backgroundColor:
        COLORS.surface,

      borderRadius: 20,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      padding: 17,

      marginBottom: 30,
    },

    heroGlow: {
      position: 'absolute',

      width: 130,

      height: 130,

      borderRadius: 100,

      backgroundColor:
        COLORS.primary,

      opacity: 0.1,

      right: -40,

      top: -60,
    },

    heroIcon: {
      width: 48,

      height: 48,

      borderRadius: 15,

      backgroundColor:
        COLORS.primary,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    heroContent: {
      flex: 1,

      marginLeft: 13,
    },

    heroTitle: {
      color: COLORS.text,

      fontSize: 15,

      fontWeight: '800',
    },

    heroText: {
      color:
        COLORS.textSecondary,

      fontSize: 11,

      lineHeight: 16,

      marginTop: 4,

      maxWidth: 250,
    },

    // ======================================
    // SEÇÕES
    // ======================================

    sectionHeader: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 10,

      marginTop: 5,

      marginBottom: 14,
    },

    sectionIcon: {
      width: 36,

      height: 36,

      borderRadius: 11,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    sectionTitle: {
      color: COLORS.text,

      fontSize: 15,

      fontWeight: '800',
    },

    sectionDescription: {
      color:
        COLORS.textSecondary,

      fontSize: 10,

      marginTop: 2,
    },

    // ======================================
    // JOGOS
    // ======================================

    gameGrid: {
      flexDirection: 'row',

      flexWrap: 'wrap',

      gap: 9,

      marginBottom: 29,
    },

    gameOption: {
      width: '48%',

      minHeight: 65,

      borderRadius: 16,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      flexDirection: 'row',

      alignItems: 'center',

      paddingHorizontal: 11,

      position: 'relative',
    },

    gameOptionSelected: {
      borderColor:
        COLORS.primary,

      backgroundColor:
        'rgba(124,58,237,0.09)',
    },

    gameOptionIcon: {
      width: 37,

      height: 37,

      borderRadius: 11,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    gameOptionIconSelected: {
      backgroundColor:
        COLORS.primary,
    },

    gameOptionText: {
      flex: 1,

      color:
        COLORS.textSecondary,

      fontSize: 11,

      fontWeight: '700',

      marginLeft: 8,
    },

    gameOptionTextSelected: {
      color: COLORS.text,
    },

    selectedCheck: {
      position: 'absolute',

      top: 5,

      right: 5,

      width: 18,

      height: 18,

      borderRadius: 9,

      backgroundColor:
        COLORS.primary,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    // ======================================
    // INPUTS
    // ======================================

    inputGroup: {
      marginBottom: 13,
    },

    inputLabel: {
      color:
        COLORS.textSecondary,

      fontSize: 9,

      fontWeight: '800',

      letterSpacing: 0.9,

      marginBottom: 7,
    },

    inputContainer: {
      minHeight: 54,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      borderRadius: 15,

      flexDirection: 'row',

      alignItems: 'center',

      paddingHorizontal: 10,
    },

    inputIcon: {
      width: 34,

      height: 34,

      borderRadius: 10,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    input: {
      flex: 1,

      color: COLORS.text,

      fontSize: 13,

      marginLeft: 10,

      paddingVertical: 0,
    },

    // ======================================
    // ESTILO
    // ======================================

    styleOptions: {
      gap: 9,

      marginBottom: 29,
    },

    styleOption: {
      minHeight: 72,

      borderRadius: 17,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      flexDirection: 'row',

      alignItems: 'center',

      padding: 12,
    },

    styleOptionSelected: {
      borderColor:
        COLORS.primary,

      backgroundColor:
        'rgba(124,58,237,0.08)',
    },

    styleIcon: {
      width: 43,

      height: 43,

      borderRadius: 13,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',

      marginRight: 11,
    },

    styleIconSelected: {
      backgroundColor:
        COLORS.primary,
    },

    styleTitle: {
      color:
        COLORS.textSecondary,

      fontSize: 13,

      fontWeight: '800',
    },

    styleTitleSelected: {
      color: COLORS.text,
    },

    styleDescription: {
      color:
        COLORS.textSecondary,

      fontSize: 9,

      marginTop: 3,
    },

    radio: {
      width: 20,

      height: 20,

      borderRadius: 10,

      borderWidth: 2,

      borderColor:
        COLORS.border,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    radioSelected: {
      borderColor:
        COLORS.primary,
    },

    radioDot: {
      width: 10,

      height: 10,

      borderRadius: 5,

      backgroundColor:
        COLORS.primary,
    },

    // ======================================
    // JOGADORES
    // ======================================

    playerOptions: {
      flexDirection: 'row',

      flexWrap: 'wrap',

      gap: 8,
    },

    playerOption: {
      width: 43,

      height: 43,

      borderRadius: 12,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    playerOptionSelected: {
      backgroundColor:
        COLORS.primary,

      borderColor:
        COLORS.primary,
    },

    playerOptionNumber: {
      color:
        COLORS.textSecondary,

      fontSize: 13,

      fontWeight: '800',
    },

    playerOptionNumberSelected: {
      color: '#FFFFFF',
    },

    playerHint: {
      color:
        COLORS.textSecondary,

      fontSize: 9,

      marginTop: 8,

      marginBottom: 29,
    },

    // ======================================
    // PREFERÊNCIAS
    // ======================================

    preferenceCard: {
      minHeight: 70,

      backgroundColor:
        COLORS.surface,

      borderRadius: 17,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      flexDirection: 'row',

      alignItems: 'center',

      padding: 12,

      marginBottom: 29,
    },

    preferenceIcon: {
      width: 43,

      height: 43,

      borderRadius: 13,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    preferenceInfo: {
      flex: 1,

      marginLeft: 11,
    },

    preferenceTitle: {
      color: COLORS.text,

      fontSize: 13,

      fontWeight: '800',
    },

    preferenceDescription: {
      color:
        COLORS.textSecondary,

      fontSize: 9,

      marginTop: 3,
    },

    // ======================================
    // PREVIEW
    // ======================================

    previewCard: {
      backgroundColor:
        COLORS.surface,

      borderRadius: 20,

      borderWidth: 1,

      borderColor:
        COLORS.primary,

      padding: 17,

      marginBottom: 15,
    },

    previewHeader: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      marginBottom: 12,
    },

    previewLabel: {
      color:
        COLORS.primaryLight,

      fontSize: 9,

      fontWeight: '900',

      letterSpacing: 1.2,
    },

    previewStatus: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 5,
    },

    previewStatusDot: {
      width: 6,

      height: 6,

      borderRadius: 6,

      backgroundColor:
        COLORS.success,
    },

    previewStatusText: {
      color:
        COLORS.success,

      fontSize: 8,

      fontWeight: '800',
    },

    previewGame: {
      color:
        COLORS.primaryLight,

      fontSize: 10,

      fontWeight: '800',

      textTransform:
        'uppercase',

      letterSpacing: 0.8,
    },

    previewTitle: {
      color: COLORS.text,

      fontSize: 18,

      fontWeight: '900',

      marginTop: 3,
    },

    previewTags: {
      flexDirection: 'row',

      flexWrap: 'wrap',

      gap: 6,

      marginTop: 13,
    },

    previewTag: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 4,

      paddingHorizontal: 8,

      paddingVertical: 6,

      borderRadius: 9,

      backgroundColor:
        COLORS.background,

      borderWidth: 1,

      borderColor:
        COLORS.border,
    },

    previewTagText: {
      color:
        COLORS.textSecondary,

      fontSize: 9,

      fontWeight: '600',
    },

    // ======================================
    // ERRO
    // ======================================

    errorContainer: {
      minHeight: 48,

      flexDirection: 'row',

      alignItems: 'center',

      gap: 8,

      backgroundColor:
        'rgba(239,68,68,0.08)',

      borderWidth: 1,

      borderColor:
        'rgba(239,68,68,0.25)',

      borderRadius: 13,

      paddingHorizontal: 13,

      marginBottom: 13,
    },

    errorText: {
      flex: 1,

      color: COLORS.danger,

      fontSize: 11,

      fontWeight: '600',
    },

    // ======================================
    // BOTÃO CRIAR
    // ======================================

    createButton: {
      minHeight: 57,

      borderRadius:
        RADIUS.md,

      backgroundColor:
        COLORS.primary,

      flexDirection: 'row',

      alignItems: 'center',

      paddingHorizontal: 12,
    },

    createIcon: {
      width: 34,

      height: 34,

      borderRadius: 10,

      backgroundColor:
        'rgba(255,255,255,0.15)',

      alignItems: 'center',

      justifyContent:
        'center',
    },

    createText: {
      flex: 1,

      color: '#FFFFFF',

      fontSize: 14,

      fontWeight: '900',

      marginLeft: 10,
    },

    createButtonDisabled: {
      opacity: 0.6,
    },

    pressed: {
      opacity: 0.75,
    },
  });