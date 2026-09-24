import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PartyCard from '../../components/PartyCard';

import {
  COLORS,
  RADIUS,
  SPACING,
} from '../../constants/theme';

import { useParties } from '../../contexts/PartyContext';
import { useAuth } from '../../contexts/AuthContext';

// ==========================================
// HOME
// ==========================================

export default function Home() {
  const {
    parties,
    loading,
    refreshParties,
  } = useParties();

  const { user } = useAuth();

  // ========================================
  // DADOS DO USUÁRIO
  // ========================================

  const username =
    user?.user_metadata?.username ||
    user?.user_metadata?.name ||
    'Jogador';

  const firstLetter =
    username
      .charAt(0)
      .toUpperCase();

  // ========================================
  // JOGOS
  // ========================================

  const games = [
    {
      id: 'valorant',
      name: 'Valorant',
      icon: 'flash-outline',
    },
    {
      id: 'lol',
      name: 'LoL',
      icon: 'shield-outline',
    },
    {
      id: 'cs2',
      name: 'CS2',
      icon: 'locate-outline',
    },
    {
      id: 'minecraft',
      name: 'Minecraft',
      icon: 'cube-outline',
    },
  ] as const;

  // ========================================
  // HEADER DA LISTA
  // ========================================

  function renderHeader() {
    return (
      <>
        {/* ==================================
            HEADER
        ================================== */}

        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>
              Party
              <Text
                style={styles.logoHighlight}
              >
                Up
              </Text>
            </Text>

            <Text style={styles.slogan}>
              Never Play Alone.
            </Text>
          </View>

          <View style={styles.headerActions}>
            {/* NOTIFICAÇÃO */}

            <Pressable
              style={({ pressed }) => [
                styles.iconButton,

                pressed &&
                  styles.buttonPressed,
              ]}
            >
              <Ionicons
                name="notifications-outline"
                size={21}
                color={COLORS.text}
              />

              <View
                style={
                  styles.notificationDot
                }
              />
            </Pressable>

            {/* PERFIL */}

            <Pressable
              style={({ pressed }) => [
                styles.avatar,

                pressed &&
                  styles.buttonPressed,
              ]}
              onPress={() =>
                router.push(
                  '/(tabs)/perfil'
                )
              }
            >
              <Text
                style={
                  styles.avatarText
                }
              >
                {firstLetter}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ==================================
            BEM-VINDO
        ================================== */}

        <View style={styles.hero}>
          <View style={styles.heroGlow} />

          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <View
                style={
                  styles.heroBadgeDot
                }
              />

              <Text
                style={
                  styles.heroBadgeText
                }
              >
                PARTYUP ONLINE
              </Text>
            </View>

            <Text style={styles.heroTitle}>
              Bora jogar,{'\n'}
              <Text
                style={
                  styles.heroUsername
                }
              >
                {username}
              </Text>
              ?
            </Text>

            <Text
              style={
                styles.heroDescription
              }
            >
              Monte sua squad ou encontre
              jogadores prontos para entrar
              na partida.
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.createButton,

                pressed &&
                  styles.buttonPressed,
              ]}
              onPress={() =>
                router.push(
                  '/(tabs)/criar'
                )
              }
            >
              <View
                style={
                  styles.createButtonIcon
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
                  styles.createButtonText
                }
              >
                Criar uma Party
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color="#FFFFFF"
              />
            </Pressable>
          </View>
        </View>

        {/* ==================================
            ATALHOS
        ================================== */}

        <View
          style={
            styles.quickActions
          }
        >
          <Pressable
            style={({ pressed }) => [
              styles.quickAction,

              pressed &&
                styles.buttonPressed,
            ]}
            onPress={() =>
              router.push(
                '/(tabs)/explorar'
              )
            }
          >
            <View
              style={
                styles.quickActionIcon
              }
            >
              <Ionicons
                name="search-outline"
                size={22}
                color={
                  COLORS.primaryLight
                }
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={
                  styles.quickActionTitle
                }
              >
                Explorar
              </Text>

              <Text
                style={
                  styles.quickActionText
                }
              >
                Encontre squads
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={
                COLORS.textSecondary
              }
            />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.quickAction,

              pressed &&
                styles.buttonPressed,
            ]}
            onPress={() =>
              router.push(
                '/(tabs)/chats'
              )
            }
          >
            <View
              style={
                styles.quickActionIcon
              }
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={21}
                color={
                  COLORS.primaryLight
                }
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={
                  styles.quickActionTitle
                }
              >
                Chats
              </Text>

              <Text
                style={
                  styles.quickActionText
                }
              >
                Fale com a squad
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={
                COLORS.textSecondary
              }
            />
          </Pressable>
        </View>

        {/* ==================================
            JOGOS POPULARES
        ================================== */}

        <View style={styles.section}>
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
                ENCONTRE SUA SQUAD
              </Text>

              <Text
                style={
                  styles.sectionTitle
                }
              >
                Jogos populares
              </Text>
            </View>

            <Ionicons
              name="game-controller-outline"
              size={22}
              color={
                COLORS.primaryLight
              }
            />
          </View>

          <View style={styles.games}>
            {games.map(
              (game) => (
                <Pressable
                  key={game.id}
                  style={({
                    pressed,
                  }) => [
                    styles.gameCard,

                    pressed &&
                      styles.buttonPressed,
                  ]}
                  onPress={() =>
                    router.push(
                      '/(tabs)/explorar'
                    )
                  }
                >
                  <View
                    style={
                      styles.gameIcon
                    }
                  >
                    <Ionicons
                      name={
                        game.icon
                      }
                      size={22}
                      color={
                        COLORS.primaryLight
                      }
                    />
                  </View>

                  <Text
                    style={
                      styles.gameName
                    }
                    numberOfLines={1}
                  >
                    {game.name}
                  </Text>
                </Pressable>
              )
            )}
          </View>
        </View>

        {/* ==================================
            PARTIES
        ================================== */}

        <View
          style={
            styles.partiesHeader
          }
        >
          <View>
            <Text
              style={
                styles.sectionEyebrow
              }
            >
              JOGUE AGORA
            </Text>

            <Text
              style={
                styles.sectionTitle
              }
            >
              Parties abertas
            </Text>
          </View>

          <View
            style={
              styles.availableBadge
            }
          >
            <View
              style={
                styles.onlineDot
              }
            />

            <Text
              style={
                styles.availableText
              }
            >
              {parties.length}{' '}
              {parties.length === 1
                ? 'party'
                : 'parties'}
            </Text>
          </View>
        </View>
      </>
    );
  }

  // ========================================
  // TELA
  // ========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <FlatList
        data={parties}
        keyExtractor={(item) =>
          item.id
        }
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
        refreshing={loading}
        onRefresh={
          refreshParties
        }
        ListHeaderComponent={
          renderHeader
        }
        renderItem={({
          item,
        }) => (
          <View
            style={
              styles.cardContainer
            }
          >
            <PartyCard
              party={item}
              onPress={() =>
                router.push({
                  pathname:
                    '/party/[id]',

                  params: {
                    id: item.id,
                  },
                })
              }
            />
          </View>
        )}
        ListEmptyComponent={
          loading ? (
            <View
              style={
                styles.loadingContainer
              }
            >
              <ActivityIndicator
                size="large"
                color={
                  COLORS.primary
                }
              />

              <Text
                style={
                  styles.loadingText
                }
              >
                Procurando parties...
              </Text>
            </View>
          ) : (
            <View
              style={
                styles.emptyContainer
              }
            >
              <View
                style={
                  styles.emptyIcon
                }
              >
                <Ionicons
                  name="game-controller-outline"
                  size={36}
                  color={
                    COLORS.primaryLight
                  }
                />
              </View>

              <Text
                style={
                  styles.emptyTitle
                }
              >
                Nenhuma Party aberta
              </Text>

              <Text
                style={
                  styles.emptyDescription
                }
              >
                Seja o primeiro a montar
                uma squad e chamar a
                galera.
              </Text>

              <Pressable
                style={({ pressed }) => [
                  styles.emptyButton,

                  pressed &&
                    styles.buttonPressed,
                ]}
                onPress={() =>
                  router.push(
                    '/(tabs)/criar'
                  )
                }
              >
                <Ionicons
                  name="add"
                  size={20}
                  color="#FFFFFF"
                />

                <Text
                  style={
                    styles.emptyButtonText
                  }
                >
                  Criar primeira Party
                </Text>
              </Pressable>
            </View>
          )
        }
      />
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
    paddingHorizontal:
      SPACING.lg,

    paddingTop:
      SPACING.md,

    paddingBottom: 130,
  },

  // ========================================
  // HEADER
  // ========================================

  header: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    marginBottom:
      SPACING.xl,
  },

  logo: {
    color: COLORS.text,

    fontSize: 29,

    fontWeight: '900',

    letterSpacing: -1,
  },

  logoHighlight: {
    color:
      COLORS.primaryLight,
  },

  slogan: {
    color:
      COLORS.textSecondary,

    fontSize: 11,

    fontWeight: '500',

    letterSpacing: 1.1,

    marginTop: 1,
  },

  headerActions: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 10,
  },

  iconButton: {
    width: 44,
    height: 44,

    borderRadius: 15,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: 'center',

    justifyContent:
      'center',
  },

  notificationDot: {
    position: 'absolute',

    top: 9,

    right: 10,

    width: 7,

    height: 7,

    borderRadius: 10,

    backgroundColor:
      COLORS.success,

    borderWidth: 1.5,

    borderColor:
      COLORS.surface,
  },

  avatar: {
    width: 44,

    height: 44,

    borderRadius: 15,

    backgroundColor:
      COLORS.primary,

    alignItems: 'center',

    justifyContent:
      'center',
  },

  avatarText: {
    color: '#FFFFFF',

    fontSize: 17,

    fontWeight: '800',
  },

  // ========================================
  // HERO
  // ========================================

  hero: {
    position: 'relative',

    overflow: 'hidden',

    backgroundColor:
      COLORS.surface,

    borderRadius: 24,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    marginBottom:
      SPACING.md,
  },

  heroGlow: {
    position: 'absolute',

    width: 180,

    height: 180,

    borderRadius: 90,

    backgroundColor:
      COLORS.primary,

    opacity: 0.14,

    right: -60,

    top: -60,
  },

  heroContent: {
    padding: 22,
  },

  heroBadge: {
    alignSelf:
      'flex-start',

    flexDirection: 'row',

    alignItems: 'center',

    gap: 7,

    paddingHorizontal: 10,

    paddingVertical: 6,

    borderRadius: 50,

    backgroundColor:
      COLORS.background,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    marginBottom: 17,
  },

  heroBadgeDot: {
    width: 7,

    height: 7,

    borderRadius: 7,

    backgroundColor:
      COLORS.success,
  },

  heroBadgeText: {
    color:
      COLORS.textSecondary,

    fontSize: 10,

    fontWeight: '800',

    letterSpacing: 0.8,
  },

  heroTitle: {
    color: COLORS.text,

    fontSize: 30,

    lineHeight: 34,

    fontWeight: '800',

    letterSpacing: -0.8,
  },

  heroUsername: {
    color:
      COLORS.primaryLight,
  },

  heroDescription: {
    color:
      COLORS.textSecondary,

    fontSize: 13,

    lineHeight: 20,

    marginTop: 12,

    maxWidth: 310,
  },

  createButton: {
    height: 54,

    borderRadius:
      RADIUS.md,

    backgroundColor:
      COLORS.primary,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 12,

    marginTop: 21,
  },

  createButtonIcon: {
    width: 32,

    height: 32,

    borderRadius: 10,

    backgroundColor:
      'rgba(255,255,255,0.15)',

    alignItems: 'center',

    justifyContent:
      'center',
  },

  createButtonText: {
    flex: 1,

    color: '#FFFFFF',

    fontSize: 14,

    fontWeight: '800',

    marginLeft: 10,
  },

  // ========================================
  // QUICK ACTIONS
  // ========================================

  quickActions: {
    flexDirection: 'row',

    gap: 10,

    marginBottom: 30,
  },

  quickAction: {
    flex: 1,

    minHeight: 78,

    backgroundColor:
      COLORS.surface,

    borderRadius: 18,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    padding: 12,

    flexDirection: 'row',

    alignItems: 'center',

    gap: 9,
  },

  quickActionIcon: {
    width: 38,

    height: 38,

    borderRadius: 12,

    backgroundColor:
      COLORS.background,

    alignItems: 'center',

    justifyContent:
      'center',
  },

  quickActionTitle: {
    color: COLORS.text,

    fontSize: 13,

    fontWeight: '700',
  },

  quickActionText: {
    color:
      COLORS.textSecondary,

    fontSize: 10,

    marginTop: 3,
  },

  // ========================================
  // SEÇÕES
  // ========================================

  section: {
    marginBottom: 30,
  },

  sectionHeader: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems:
      'flex-end',

    marginBottom: 15,
  },

  sectionEyebrow: {
    color:
      COLORS.primaryLight,

    fontSize: 9,

    fontWeight: '800',

    letterSpacing: 1.2,

    marginBottom: 4,
  },

  sectionTitle: {
    color: COLORS.text,

    fontSize: 20,

    fontWeight: '800',

    letterSpacing: -0.4,
  },

  // ========================================
  // JOGOS
  // ========================================

  games: {
    flexDirection: 'row',

    gap: 9,
  },

  gameCard: {
    flex: 1,

    minWidth: 0,

    backgroundColor:
      COLORS.surface,

    borderRadius: 16,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingVertical: 13,

    paddingHorizontal: 6,

    alignItems: 'center',

    justifyContent:
      'center',
  },

  gameIcon: {
    width: 38,

    height: 38,

    borderRadius: 12,

    backgroundColor:
      COLORS.background,

    alignItems: 'center',

    justifyContent:
      'center',

    marginBottom: 8,
  },

  gameName: {
    color: COLORS.text,

    fontSize: 11,

    fontWeight: '700',

    maxWidth: '100%',
  },

  // ========================================
  // PARTIES
  // ========================================

  partiesHeader: {
    flexDirection: 'row',

    alignItems: 'flex-end',

    justifyContent:
      'space-between',

    marginBottom: 15,
  },

  availableBadge: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 6,

    paddingHorizontal: 10,

    paddingVertical: 6,

    borderRadius: 50,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,
  },

  onlineDot: {
    width: 7,

    height: 7,

    borderRadius: 7,

    backgroundColor:
      COLORS.success,
  },

  availableText: {
    color:
      COLORS.textSecondary,

    fontSize: 10,

    fontWeight: '600',
  },

  cardContainer: {
    marginBottom:
      SPACING.md,
  },

  // ========================================
  // LOADING
  // ========================================

  loadingContainer: {
    paddingVertical: 55,

    alignItems: 'center',

    justifyContent:
      'center',
  },

  loadingText: {
    color:
      COLORS.textSecondary,

    fontSize: 13,

    marginTop: 12,
  },

  // ========================================
  // EMPTY
  // ========================================

  emptyContainer: {
    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    borderRadius: 22,

    padding: 28,

    alignItems: 'center',
  },

  emptyIcon: {
    width: 70,

    height: 70,

    borderRadius: 22,

    backgroundColor:
      COLORS.background,

    alignItems: 'center',

    justifyContent:
      'center',

    marginBottom: 17,
  },

  emptyTitle: {
    color: COLORS.text,

    fontSize: 17,

    fontWeight: '800',
  },

  emptyDescription: {
    color:
      COLORS.textSecondary,

    fontSize: 12,

    textAlign: 'center',

    lineHeight: 18,

    maxWidth: 240,

    marginTop: 7,
  },

  emptyButton: {
    minHeight: 47,

    paddingHorizontal: 18,

    borderRadius:
      RADIUS.md,

    backgroundColor:
      COLORS.primary,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'center',

    gap: 7,

    marginTop: 19,
  },

  emptyButtonText: {
    color: '#FFFFFF',

    fontSize: 13,

    fontWeight: '700',
  },

  buttonPressed: {
    opacity: 0.75,
  },
});