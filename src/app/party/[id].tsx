import { Ionicons } from '@expo/vector-icons';
import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  COLORS,
  RADIUS,
  SPACING,
} from '../../constants/theme';

import { useParties } from '../../contexts/PartyContext';

// ==========================================
// PARTY DETAILS
// ==========================================

export default function PartyDetails() {
  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const {
    getPartyById,
    loading,
  } = useParties();

  // ========================================
  // BUSCA NO PARTY CONTEXT
  // ========================================

  const party =
    getPartyById(id);

  // ========================================
  // LOADING
  // ========================================

  if (loading && !party) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <View
          style={styles.center}
        >
          <View
            style={
              styles.loadingIcon
            }
          >
            <Ionicons
              name="game-controller-outline"
              size={34}
              color={
                COLORS.primaryLight
              }
            />
          </View>

          <Text
            style={
              styles.loadingTitle
            }
          >
            Carregando Party...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ========================================
  // NÃO ENCONTROU
  // ========================================

  if (!party) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <View
          style={styles.center}
        >
          <View
            style={
              styles.notFoundIcon
            }
          >
            <Ionicons
              name="alert-circle-outline"
              size={36}
              color={
                COLORS.danger
              }
            />
          </View>

          <Text
            style={
              styles.notFoundTitle
            }
          >
            Party não encontrada
          </Text>

          <Text
            style={
              styles.notFoundText
            }
          >
            Essa Party pode ter sido
            removida ou não está mais
            disponível.
          </Text>

          <Pressable
            style={
              styles.backButton
            }
            onPress={() =>
              router.back()
            }
          >
            <Ionicons
              name="arrow-back"
              size={18}
              color="#FFFFFF"
            />

            <Text
              style={
                styles.backButtonText
              }
            >
              Voltar
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // ========================================
  // DADOS
  // ========================================

  const availableSlots =
    Math.max(
      0,
      party.maxPlayers -
        party.currentPlayers
    );

  const isFull =
    availableSlots <= 0;

  const progress =
    party.maxPlayers > 0
      ? Math.min(
          100,
          (party.currentPlayers /
            party.maxPlayers) *
            100
        )
      : 0;

  const ownerInitial =
    party.owner.username
      ?.charAt(0)
      .toUpperCase() || '?';

  // ========================================
  // ENTRAR
  // ========================================

  function handleJoinParty() {
    if (isFull) {
      Alert.alert(
        'Party cheia',
        'Essa Party não possui mais vagas.'
      );

      return;
    }

    Alert.alert(
      'Entrar na Party',
      `Quer entrar em "${party.title}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Entrar',
          onPress: () => {
            Alert.alert(
              'Você entrou! 🎮',
              'Agora você faz parte dessa Party.'
            );
          },
        },
      ]
    );
  }

  // ========================================
  // CHAT
  // ========================================

  function handleOpenChat() {
    router.push({
      pathname: '/chat/[id]',
      params: {
        id: party.id,
      },
    });
  }

  // ========================================
  // TELA
  // ========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* ==================================
            TOP BAR
        ================================== */}

        <View
          style={styles.topBar}
        >
          <Pressable
            style={({ pressed }) => [
              styles.iconButton,
              pressed &&
                styles.pressed,
            ]}
            onPress={() =>
              router.back()
            }
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color={COLORS.text}
            />
          </Pressable>

          <View
            style={
              styles.topTitleArea
            }
          >
            <Text
              style={
                styles.topEyebrow
              }
            >
              PARTYUP
            </Text>

            <Text
              style={
                styles.topTitle
              }
            >
              Detalhes
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.iconButton,
              pressed &&
                styles.pressed,
            ]}
            onPress={() =>
              Alert.alert(
                'Compartilhar',
                'Compartilhamento da Party em breve.'
              )
            }
          >
            <Ionicons
              name="share-social-outline"
              size={20}
              color={COLORS.text}
            />
          </Pressable>
        </View>

        {/* ==================================
            HERO
        ================================== */}

        <View
          style={styles.hero}
        >
          <View
            style={
              styles.heroGlow
            }
          />

          <View
            style={
              styles.heroTop
            }
          >
            <View
              style={
                styles.gameIcon
              }
            >
              <Ionicons
                name={getGameIcon(
                  party.game
                )}
                size={31}
                color={
                  COLORS.primaryLight
                }
              />
            </View>

            <View
              style={[
                styles.status,

                isFull
                  ? styles.statusFull
                  : styles.statusOpen,
              ]}
            >
              <View
                style={[
                  styles.statusDot,

                  {
                    backgroundColor:
                      isFull
                        ? COLORS.danger
                        : COLORS.success,
                  },
                ]}
              />

              <Text
                style={[
                  styles.statusText,

                  {
                    color:
                      isFull
                        ? COLORS.danger
                        : COLORS.success,
                  },
                ]}
              >
                {isFull
                  ? 'PARTY CHEIA'
                  : 'RECRUTANDO'}
              </Text>
            </View>
          </View>

          <Text
            style={styles.game}
          >
            {party.game}
          </Text>

          <Text
            style={
              styles.partyTitle
            }
          >
            {party.title}
          </Text>

          <View
            style={
              styles.heroTags
            }
          >
            <HeroTag
              icon="trophy-outline"
              text={party.rank}
            />

            <HeroTag
              icon="game-controller-outline"
              text={party.mode}
            />

            <HeroTag
              icon="location-outline"
              text={party.region}
            />
          </View>
        </View>

        {/* ==================================
            SQUAD
        ================================== */}

        <View
          style={
            styles.sectionHeader
          }
        >
          <View>
            <Text
              style={
                styles.sectionEyebrow
              }
            >
              STATUS
            </Text>

            <Text
              style={
                styles.sectionTitle
              }
            >
              Squad
            </Text>
          </View>

          <Text
            style={
              styles.playersCount
            }
          >
            {party.currentPlayers}
            <Text
              style={
                styles.playersMax
              }
            >
              /{party.maxPlayers}
            </Text>
          </Text>
        </View>

        <View
          style={
            styles.squadCard
          }
        >
          <View
            style={
              styles.squadHeader
            }
          >
            <View
              style={
                styles.squadIcon
              }
            >
              <Ionicons
                name="people-outline"
                size={22}
                color={
                  COLORS.primaryLight
                }
              />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={
                  styles.squadTitle
                }
              >
                {isFull
                  ? 'Squad completa'
                  : `${availableSlots} ${
                      availableSlots ===
                      1
                        ? 'vaga disponível'
                        : 'vagas disponíveis'
                    }`}
              </Text>

              <Text
                style={
                  styles.squadDescription
                }
              >
                {isFull
                  ? 'Essa Party atingiu o limite de jogadores.'
                  : 'Entre agora e complete essa squad.'}
              </Text>
            </View>
          </View>

          <View
            style={
              styles.progressBackground
            }
          >
            <View
              style={[
                styles.progressFill,

                {
                  width:
                    `${progress}%`,
                },
              ]}
            />
          </View>

          <View
            style={
              styles.progressLabels
            }
          >
            <Text
              style={
                styles.progressText
              }
            >
              {party.currentPlayers}{' '}
              jogadores
            </Text>

            <Text
              style={
                styles.progressText
              }
            >
              {party.maxPlayers}{' '}
              máximo
            </Text>
          </View>
        </View>

        {/* ==================================
            INFORMAÇÕES
        ================================== */}

        <View
          style={
            styles.sectionHeader
          }
        >
          <View>
            <Text
              style={
                styles.sectionEyebrow
              }
            >
              PARTIDA
            </Text>

            <Text
              style={
                styles.sectionTitle
              }
            >
              Informações
            </Text>
          </View>
        </View>

        <View
          style={styles.infoGrid}
        >
          <InfoItem
            icon="trophy-outline"
            label="RANK"
            value={party.rank}
          />

          <InfoItem
            icon="layers-outline"
            label="MODO"
            value={party.mode}
          />

          <InfoItem
            icon="location-outline"
            label="REGIÃO"
            value={party.region}
          />

          <InfoItem
            icon="shield-checkmark-outline"
            label="ESTILO"
            value={party.style}
          />
        </View>

        {/* ==================================
            LÍDER
        ================================== */}

        <View
          style={
            styles.sectionHeader
          }
        >
          <View>
            <Text
              style={
                styles.sectionEyebrow
              }
            >
              ORGANIZADOR
            </Text>

            <Text
              style={
                styles.sectionTitle
              }
            >
              Líder da Party
            </Text>
          </View>
        </View>

        <View
          style={
            styles.ownerCard
          }
        >
          <View
            style={
              styles.avatar
            }
          >
            <Text
              style={
                styles.avatarText
              }
            >
              {ownerInitial}
            </Text>

            <View
              style={
                styles.onlineDot
              }
            />
          </View>

          <View
            style={
              styles.ownerInfo
            }
          >
            <Text
              style={styles.owner}
            >
              @{party.owner.username}
            </Text>

            <Text
              style={styles.level}
            >
              Nível{' '}
              {party.owner.level}
            </Text>
          </View>

          <View
            style={
              styles.leaderBadge
            }
          >
            <Ionicons
              name="star"
              size={13}
              color={
                COLORS.primaryLight
              }
            />

            <Text
              style={
                styles.leaderBadgeText
              }
            >
              LÍDER
            </Text>
          </View>
        </View>

        {/* ==================================
            REQUISITOS
        ================================== */}

        <View
          style={
            styles.sectionHeader
          }
        >
          <View>
            <Text
              style={
                styles.sectionEyebrow
              }
            >
              ANTES DE ENTRAR
            </Text>

            <Text
              style={
                styles.sectionTitle
              }
            >
              Requisitos
            </Text>
          </View>
        </View>

        <View
          style={
            styles.requirements
          }
        >
          <Requirement
            icon={
              party.microphone
                ? 'mic-outline'
                : 'mic-off-outline'
            }
            title="Microfone"
            text={
              party.microphone
                ? 'Obrigatório'
                : 'Opcional'
            }
          />

          <View
            style={
              styles.requirementDivider
            }
          />

          <Requirement
            icon="shield-checkmark-outline"
            title="Estilo"
            text={party.style}
          />

          <View
            style={
              styles.requirementDivider
            }
          />

          <Requirement
            icon="trophy-outline"
            title="Rank"
            text={party.rank}
          />
        </View>

        {/* ==================================
            AÇÕES
        ================================== */}

        <View
          style={
            styles.actions
          }
        >
          <Pressable
            style={({ pressed }) => [
              styles.chatButton,

              pressed &&
                styles.pressed,
            ]}
            onPress={
              handleOpenChat
            }
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color={
                COLORS.primaryLight
              }
            />

            <Text
              style={
                styles.chatButtonText
              }
            >
              Chat
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.joinButton,

              isFull &&
                styles.disabledButton,

              pressed &&
                !isFull &&
                styles.pressed,
            ]}
            onPress={
              handleJoinParty
            }
            disabled={isFull}
          >
            <Ionicons
              name={
                isFull
                  ? 'lock-closed-outline'
                  : 'enter-outline'
              }
              size={20}
              color="#FFFFFF"
            />

            <Text
              style={
                styles.joinButtonText
              }
            >
              {isFull
                ? 'Party cheia'
                : 'Entrar na Party'}
            </Text>

            {!isFull && (
              <Ionicons
                name="arrow-forward"
                size={18}
                color="#FFFFFF"
              />
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// HERO TAG
// ==========================================

function HeroTag({
  icon,
  text,
}: {
  icon:
    keyof typeof Ionicons.glyphMap;

  text: string;
}) {
  return (
    <View
      style={styles.heroTag}
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
          styles.heroTagText
        }
      >
        {text}
      </Text>
    </View>
  );
}

// ==========================================
// INFO
// ==========================================

function InfoItem({
  icon,
  label,
  value,
}: {
  icon:
    keyof typeof Ionicons.glyphMap;

  label: string;

  value: string;
}) {
  return (
    <View
      style={styles.infoItem}
    >
      <View
        style={
          styles.infoIcon
        }
      >
        <Ionicons
          name={icon}
          size={19}
          color={
            COLORS.primaryLight
          }
        />
      </View>

      <Text
        style={styles.infoLabel}
      >
        {label}
      </Text>

      <Text
        style={styles.infoValue}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

// ==========================================
// REQUISITO
// ==========================================

function Requirement({
  icon,
  title,
  text,
}: {
  icon:
    keyof typeof Ionicons.glyphMap;

  title: string;

  text: string;
}) {
  return (
    <View
      style={styles.requirement}
    >
      <View
        style={
          styles.requirementIcon
        }
      >
        <Ionicons
          name={icon}
          size={19}
          color={
            COLORS.primaryLight
          }
        />
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={
            styles.requirementTitle
          }
        >
          {title}
        </Text>

        <Text
          style={
            styles.requirementText
          }
        >
          {text}
        </Text>
      </View>

      <Ionicons
        name="checkmark-circle"
        size={19}
        color={COLORS.success}
      />
    </View>
  );
}

// ==========================================
// GAME ICON
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
    value.includes('league') ||
    value.includes('lol')
  ) {
    return 'shield';
  }

  if (
    value.includes('cs2') ||
    value.includes('counter')
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
        SPACING.md,

      paddingBottom: 55,
    },

    // ======================================
    // TOP BAR
    // ======================================

    topBar: {
      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'space-between',

      marginBottom: 20,
    },

    topTitleArea: {
      alignItems: 'center',
    },

    topEyebrow: {
      color:
        COLORS.primaryLight,

      fontSize: 8,

      fontWeight: '900',

      letterSpacing: 1.4,
    },

    topTitle: {
      color: COLORS.text,

      fontSize: 14,

      fontWeight: '800',

      marginTop: 2,
    },

    iconButton: {
      width: 43,

      height: 43,

      borderRadius: 14,

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

    hero: {
      position: 'relative',

      overflow: 'hidden',

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      borderRadius: 24,

      padding: 20,

      marginBottom: 29,
    },

    heroGlow: {
      position: 'absolute',

      width: 190,

      height: 190,

      borderRadius: 100,

      backgroundColor:
        COLORS.primary,

      opacity: 0.11,

      right: -70,

      top: -80,
    },

    heroTop: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      marginBottom: 17,
    },

    gameIcon: {
      width: 55,

      height: 55,

      borderRadius: 17,

      backgroundColor:
        COLORS.background,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    status: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 6,

      paddingHorizontal: 10,

      paddingVertical: 6,

      borderRadius:
        RADIUS.full,
    },

    statusOpen: {
      backgroundColor:
        'rgba(34,197,94,0.10)',
    },

    statusFull: {
      backgroundColor:
        'rgba(239,68,68,0.10)',
    },

    statusDot: {
      width: 6,

      height: 6,

      borderRadius: 6,
    },

    statusText: {
      fontSize: 9,

      fontWeight: '900',

      letterSpacing: 0.7,
    },

    game: {
      color:
        COLORS.primaryLight,

      fontSize: 11,

      fontWeight: '900',

      letterSpacing: 1,

      textTransform:
        'uppercase',
    },

    partyTitle: {
      color: COLORS.text,

      fontSize: 27,

      lineHeight: 32,

      fontWeight: '900',

      letterSpacing: -0.8,

      marginTop: 5,
    },

    heroTags: {
      flexDirection: 'row',

      flexWrap: 'wrap',

      gap: 7,

      marginTop: 17,
    },

    heroTag: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 5,

      paddingHorizontal: 9,

      paddingVertical: 7,

      borderRadius: 10,

      backgroundColor:
        COLORS.background,

      borderWidth: 1,

      borderColor:
        COLORS.border,
    },

    heroTagText: {
      color:
        COLORS.textSecondary,

      fontSize: 10,

      fontWeight: '600',
    },

    // ======================================
    // SECTION
    // ======================================

    sectionHeader: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'flex-end',

      marginBottom: 13,

      marginTop: 3,
    },

    sectionEyebrow: {
      color:
        COLORS.primaryLight,

      fontSize: 8,

      fontWeight: '900',

      letterSpacing: 1.2,

      marginBottom: 3,
    },

    sectionTitle: {
      color: COLORS.text,

      fontSize: 18,

      fontWeight: '800',
    },

    // ======================================
    // SQUAD
    // ======================================

    playersCount: {
      color: COLORS.text,

      fontSize: 16,

      fontWeight: '900',
    },

    playersMax: {
      color:
        COLORS.textSecondary,

      fontWeight: '500',
    },

    squadCard: {
      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      borderRadius: 18,

      padding: 15,

      marginBottom: 29,
    },

    squadHeader: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 11,
    },

    squadIcon: {
      width: 44,

      height: 44,

      borderRadius: 13,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    squadTitle: {
      color: COLORS.text,

      fontSize: 13,

      fontWeight: '800',
    },

    squadDescription: {
      color:
        COLORS.textSecondary,

      fontSize: 9,

      marginTop: 3,
    },

    progressBackground: {
      height: 6,

      backgroundColor:
        COLORS.background,

      borderRadius: 10,

      overflow: 'hidden',

      marginTop: 15,
    },

    progressFill: {
      height: '100%',

      borderRadius: 10,

      backgroundColor:
        COLORS.primaryLight,
    },

    progressLabels: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      marginTop: 7,
    },

    progressText: {
      color:
        COLORS.textSecondary,

      fontSize: 8,
    },

    // ======================================
    // INFO
    // ======================================

    infoGrid: {
      flexDirection: 'row',

      flexWrap: 'wrap',

      gap: 9,

      marginBottom: 29,
    },

    infoItem: {
      width: '48%',

      backgroundColor:
        COLORS.surface,

      borderRadius: 16,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      padding: 13,
    },

    infoIcon: {
      width: 35,

      height: 35,

      borderRadius: 11,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',

      marginBottom: 12,
    },

    infoLabel: {
      color:
        COLORS.textSecondary,

      fontSize: 8,

      fontWeight: '800',

      letterSpacing: 0.8,
    },

    infoValue: {
      color: COLORS.text,

      fontSize: 13,

      fontWeight: '800',

      marginTop: 4,
    },

    // ======================================
    // OWNER
    // ======================================

    ownerCard: {
      flexDirection: 'row',

      alignItems: 'center',

      backgroundColor:
        COLORS.surface,

      borderRadius: 17,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      padding: 13,

      marginBottom: 29,
    },

    avatar: {
      width: 46,

      height: 46,

      borderRadius: 14,

      backgroundColor:
        COLORS.primary,

      alignItems: 'center',

      justifyContent:
        'center',

      position: 'relative',
    },

    avatarText: {
      color: '#FFFFFF',

      fontSize: 16,

      fontWeight: '900',
    },

    onlineDot: {
      position: 'absolute',

      width: 10,

      height: 10,

      borderRadius: 10,

      backgroundColor:
        COLORS.success,

      borderWidth: 2,

      borderColor:
        COLORS.surface,

      right: -2,

      bottom: -2,
    },

    ownerInfo: {
      flex: 1,

      marginLeft: 11,
    },

    owner: {
      color: COLORS.text,

      fontSize: 13,

      fontWeight: '800',
    },

    level: {
      color:
        COLORS.textSecondary,

      fontSize: 10,

      marginTop: 3,
    },

    leaderBadge: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 5,

      paddingHorizontal: 8,

      paddingVertical: 6,

      borderRadius: 9,

      backgroundColor:
        'rgba(124,58,237,0.10)',

      borderWidth: 1,

      borderColor:
        COLORS.primary,
    },

    leaderBadgeText: {
      color:
        COLORS.primaryLight,

      fontSize: 8,

      fontWeight: '900',
    },

    // ======================================
    // REQUIREMENTS
    // ======================================

    requirements: {
      backgroundColor:
        COLORS.surface,

      borderRadius: 17,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      paddingHorizontal: 13,

      marginBottom: 29,
    },

    requirement: {
      minHeight: 65,

      flexDirection: 'row',

      alignItems: 'center',

      gap: 10,
    },

    requirementIcon: {
      width: 36,

      height: 36,

      borderRadius: 11,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    requirementTitle: {
      color: COLORS.text,

      fontSize: 11,

      fontWeight: '700',
    },

    requirementText: {
      color:
        COLORS.textSecondary,

      fontSize: 9,

      marginTop: 2,
    },

    requirementDivider: {
      height: 1,

      backgroundColor:
        COLORS.border,

      marginLeft: 46,
    },

    // ======================================
    // ACTIONS
    // ======================================

    actions: {
      flexDirection: 'row',

      gap: 9,
    },

    chatButton: {
      minWidth: 92,

      height: 55,

      borderRadius:
        RADIUS.md,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.primary,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'center',

      gap: 7,
    },

    chatButtonText: {
      color:
        COLORS.primaryLight,

      fontSize: 12,

      fontWeight: '800',
    },

    joinButton: {
      flex: 1,

      height: 55,

      borderRadius:
        RADIUS.md,

      backgroundColor:
        COLORS.primary,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'center',

      gap: 8,
    },

    joinButtonText: {
      color: '#FFFFFF',

      fontSize: 13,

      fontWeight: '900',
    },

    disabledButton: {
      opacity: 0.45,
    },

    // ======================================
    // STATES
    // ======================================

    center: {
      flex: 1,

      alignItems: 'center',

      justifyContent:
        'center',

      padding: 30,
    },

    loadingIcon: {
      width: 72,

      height: 72,

      borderRadius: 22,

      backgroundColor:
        COLORS.surface,

      alignItems: 'center',

      justifyContent:
        'center',

      borderWidth: 1,

      borderColor:
        COLORS.border,
    },

    loadingTitle: {
      color: COLORS.text,

      fontSize: 15,

      fontWeight: '800',

      marginTop: 15,
    },

    notFoundIcon: {
      width: 72,

      height: 72,

      borderRadius: 22,

      backgroundColor:
        COLORS.surface,

      alignItems: 'center',

      justifyContent:
        'center',

      borderWidth: 1,

      borderColor:
        COLORS.border,
    },

    notFoundTitle: {
      color: COLORS.text,

      fontSize: 19,

      fontWeight: '900',

      marginTop: 17,
    },

    notFoundText: {
      color:
        COLORS.textSecondary,

      fontSize: 11,

      lineHeight: 17,

      textAlign: 'center',

      maxWidth: 250,

      marginTop: 7,
    },

    backButton: {
      minHeight: 45,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'center',

      gap: 7,

      paddingHorizontal: 18,

      backgroundColor:
        COLORS.primary,

      borderRadius: 13,

      marginTop: 18,
    },

    backButtonText: {
      color: '#FFFFFF',

      fontSize: 12,

      fontWeight: '800',
    },

    pressed: {
      opacity: 0.72,
    },
  });