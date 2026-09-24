import { Ionicons } from '@expo/vector-icons';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  COLORS,
  RADIUS,
  SPACING,
} from '../constants/theme';

import { Party } from '../types/party';

interface PartyCardProps {
  party: Party;
  onPress?: () => void;
}

export default function PartyCard({
  party,
  onPress,
}: PartyCardProps) {
  // ========================================
  // DADOS
  // ========================================

  const availableSlots =
    party.maxPlayers -
    party.currentPlayers;

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

  // ========================================
  // ÍCONE DO JOGO
  // ========================================

  function getGameIcon():
    keyof typeof Ionicons.glyphMap {
    const game =
      party.game.toLowerCase();

    if (
      game.includes('valorant')
    ) {
      return 'flash';
    }

    if (
      game.includes('league') ||
      game.includes('lol')
    ) {
      return 'shield';
    }

    if (
      game.includes('counter') ||
      game.includes('cs2')
    ) {
      return 'locate';
    }

    if (
      game.includes('minecraft')
    ) {
      return 'cube';
    }

    if (
      game.includes('fortnite')
    ) {
      return 'construct';
    }

    return 'game-controller';
  }

  // ========================================
  // INICIAL DO DONO
  // ========================================

  const ownerInitial =
    party.owner.username
      ?.charAt(0)
      .toUpperCase() || '?';

  // ========================================
  // CARD
  // ========================================

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed &&
          styles.cardPressed,
      ]}
    >
      {/* DECORAÇÃO */}

      <View
        style={styles.glow}
      />

      {/* ==================================
          TOPO
      ================================== */}

      <View style={styles.top}>
        <View
          style={
            styles.gameIconContainer
          }
        >
          <Ionicons
            name={getGameIcon()}
            size={25}
            color={
              COLORS.primaryLight
            }
          />
        </View>

        <View
          style={styles.titleArea}
        >
          <View
            style={styles.gameRow}
          >
            <Text
              style={styles.game}
              numberOfLines={1}
            >
              {party.game}
            </Text>

            <View
              style={
                styles.styleBadge
              }
            >
              <Text
                style={
                  styles.styleText
                }
              >
                {party.style}
              </Text>
            </View>
          </View>

          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {party.title}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={
            COLORS.textSecondary
          }
        />
      </View>

      {/* ==================================
          STATUS
      ================================== */}

      <View
        style={
          styles.statusRow
        }
      >
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

        {!isFull && (
          <Text
            style={
              styles.vacanciesText
            }
          >
            {availableSlots}{' '}
            {availableSlots === 1
              ? 'vaga disponível'
              : 'vagas disponíveis'}
          </Text>
        )}
      </View>

      {/* ==================================
          INFORMAÇÕES
      ================================== */}

      <View style={styles.tags}>
        <InfoTag
          icon="trophy-outline"
          text={party.rank}
        />

        <InfoTag
          icon="game-controller-outline"
          text={party.mode}
        />

        <InfoTag
          icon="location-outline"
          text={party.region}
        />

        {party.microphone && (
          <InfoTag
            icon="mic-outline"
            text="Mic obrigatório"
            highlighted
          />
        )}
      </View>

      {/* ==================================
          JOGADORES
      ================================== */}

      <View
        style={
          styles.playersSection
        }
      >
        <View
          style={
            styles.playersHeader
          }
        >
          <View
            style={
              styles.playersLabel
            }
          >
            <Ionicons
              name="people-outline"
              size={15}
              color={
                COLORS.textSecondary
              }
            />

            <Text
              style={
                styles.playersLabelText
              }
            >
              Squad
            </Text>
          </View>

          <Text
            style={
              styles.playerCount
            }
          >
            {party.currentPlayers}
            <Text
              style={
                styles.playerMax
              }
            >
              /{party.maxPlayers}
            </Text>
          </Text>
        </View>

        {/* BARRA DE PROGRESSO */}

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
      </View>

      {/* ==================================
          FOOTER
      ================================== */}

      <View style={styles.footer}>
        <View
          style={
            styles.ownerContainer
          }
        >
          <View
            style={
              styles.ownerAvatar
            }
          >
            <Text
              style={
                styles.ownerAvatarText
              }
            >
              {ownerInitial}
            </Text>

            <View
              style={
                styles.ownerOnline
              }
            />
          </View>

          <View>
            <Text
              style={
                styles.ownerLabel
              }
            >
              LÍDER
            </Text>

            <Text
              style={styles.owner}
            >
              @{party.owner.username}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.joinIndicator,

            isFull &&
              styles.joinIndicatorDisabled,
          ]}
        >
          <Text
            style={[
              styles.joinText,

              isFull &&
                styles.joinTextDisabled,
            ]}
          >
            {isFull
              ? 'Lotada'
              : 'Ver Party'}
          </Text>

          <Ionicons
            name={
              isFull
                ? 'lock-closed-outline'
                : 'arrow-forward'
            }
            size={15}
            color={
              isFull
                ? COLORS.textSecondary
                : '#FFFFFF'
            }
          />
        </View>
      </View>
    </Pressable>
  );
}

// ==========================================
// TAG
// ==========================================

function InfoTag({
  icon,
  text,
  highlighted = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  highlighted?: boolean;
}) {
  return (
    <View
      style={[
        styles.tag,

        highlighted &&
          styles.tagHighlighted,
      ]}
    >
      <Ionicons
        name={icon}
        size={14}
        color={
          highlighted
            ? COLORS.primaryLight
            : COLORS.textSecondary
        }
      />

      <Text
        style={[
          styles.tagText,

          highlighted &&
            styles.tagTextHighlighted,
        ]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </View>
  );
}

// ==========================================
// ESTILOS
// ==========================================

const styles =
  StyleSheet.create({
    card: {
      position: 'relative',

      overflow: 'hidden',

      backgroundColor:
        COLORS.surface,

      borderRadius: 22,

      padding: 17,

      borderWidth: 1,

      borderColor:
        COLORS.border,
    },

    cardPressed: {
      opacity: 0.76,

      transform: [
        {
          scale: 0.99,
        },
      ],
    },

    // ======================================
    // GLOW
    // ======================================

    glow: {
      position: 'absolute',

      width: 120,

      height: 120,

      borderRadius: 60,

      backgroundColor:
        COLORS.primary,

      opacity: 0.07,

      top: -55,

      left: -45,
    },

    // ======================================
    // TOPO
    // ======================================

    top: {
      flexDirection: 'row',

      alignItems: 'center',
    },

    gameIconContainer: {
      width: 52,

      height: 52,

      borderRadius: 16,

      backgroundColor:
        COLORS.background,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    titleArea: {
      flex: 1,

      marginLeft: 12,

      marginRight: 8,
    },

    gameRow: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 7,

      marginBottom: 4,
    },

    game: {
      color:
        COLORS.primaryLight,

      fontSize: 11,

      fontWeight: '800',

      textTransform:
        'uppercase',

      letterSpacing: 0.8,

      maxWidth: 125,
    },

    styleBadge: {
      paddingHorizontal: 7,

      paddingVertical: 3,

      borderRadius: 20,

      backgroundColor:
        COLORS.background,

      borderWidth: 1,

      borderColor:
        COLORS.border,
    },

    styleText: {
      color:
        COLORS.textSecondary,

      fontSize: 8,

      fontWeight: '700',

      textTransform:
        'uppercase',
    },

    title: {
      color: COLORS.text,

      fontSize: 17,

      fontWeight: '800',

      letterSpacing: -0.2,
    },

    // ======================================
    // STATUS
    // ======================================

    statusRow: {
      flexDirection: 'row',

      alignItems: 'center',

      marginTop: 16,

      gap: 9,
    },

    status: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 6,

      paddingHorizontal: 9,

      paddingVertical: 5,

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

    vacanciesText: {
      color:
        COLORS.textSecondary,

      fontSize: 10,

      fontWeight: '500',
    },

    // ======================================
    // TAGS
    // ======================================

    tags: {
      flexDirection: 'row',

      flexWrap: 'wrap',

      gap: 7,

      marginTop: 14,
    },

    tag: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 5,

      backgroundColor:
        COLORS.background,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      paddingHorizontal: 9,

      paddingVertical: 7,

      borderRadius: 10,
    },

    tagHighlighted: {
      borderColor:
        COLORS.primary,

      backgroundColor:
        'rgba(124,58,237,0.08)',
    },

    tagText: {
      color:
        COLORS.textSecondary,

      fontSize: 10,

      fontWeight: '600',

      maxWidth: 110,
    },

    tagTextHighlighted: {
      color:
        COLORS.primaryLight,
    },

    // ======================================
    // JOGADORES
    // ======================================

    playersSection: {
      marginTop: 17,

      paddingTop: 14,

      borderTopWidth: 1,

      borderTopColor:
        COLORS.border,
    },

    playersHeader: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      marginBottom: 8,
    },

    playersLabel: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 6,
    },

    playersLabelText: {
      color:
        COLORS.textSecondary,

      fontSize: 10,

      fontWeight: '600',
    },

    playerCount: {
      color: COLORS.text,

      fontSize: 11,

      fontWeight: '800',
    },

    playerMax: {
      color:
        COLORS.textSecondary,

      fontWeight: '500',
    },

    progressBackground: {
      width: '100%',

      height: 5,

      backgroundColor:
        COLORS.background,

      borderRadius: 10,

      overflow: 'hidden',
    },

    progressFill: {
      height: '100%',

      backgroundColor:
        COLORS.primaryLight,

      borderRadius: 10,
    },

    // ======================================
    // FOOTER
    // ======================================

    footer: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      marginTop: 17,
    },

    ownerContainer: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 9,

      flex: 1,
    },

    ownerAvatar: {
      width: 37,

      height: 37,

      borderRadius: 12,

      backgroundColor:
        COLORS.primary,

      alignItems: 'center',

      justifyContent:
        'center',

      position: 'relative',
    },

    ownerAvatarText: {
      color: '#FFFFFF',

      fontSize: 13,

      fontWeight: '900',
    },

    ownerOnline: {
      position: 'absolute',

      width: 9,

      height: 9,

      borderRadius: 9,

      backgroundColor:
        COLORS.success,

      right: -2,

      bottom: -2,

      borderWidth: 2,

      borderColor:
        COLORS.surface,
    },

    ownerLabel: {
      color:
        COLORS.textSecondary,

      fontSize: 8,

      fontWeight: '800',

      letterSpacing: 0.7,
    },

    owner: {
      color: COLORS.text,

      fontSize: 12,

      fontWeight: '700',

      marginTop: 2,
    },

    // ======================================
    // BOTÃO
    // ======================================

    joinIndicator: {
      minHeight: 38,

      paddingHorizontal: 12,

      borderRadius: 12,

      backgroundColor:
        COLORS.primary,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'center',

      gap: 6,
    },

    joinIndicatorDisabled: {
      backgroundColor:
        COLORS.background,

      borderWidth: 1,

      borderColor:
        COLORS.border,
    },

    joinText: {
      color: '#FFFFFF',

      fontSize: 10,

      fontWeight: '800',
    },

    joinTextDisabled: {
      color:
        COLORS.textSecondary,
    },
  });