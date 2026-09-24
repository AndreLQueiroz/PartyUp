import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  COLORS,
  SPACING,
} from '../../constants/theme';

import { chats } from '../../data/messages';

// ==========================================
// CHATS
// ==========================================

export default function Chats() {
  const [search, setSearch] =
    useState('');

  // ========================================
  // FILTRO
  // ========================================

  const filteredChats =
    useMemo(() => {
      const term = search
        .trim()
        .toLowerCase();

      if (!term) {
        return chats;
      }

      return chats.filter(
        (chat) =>
          chat.name
            .toLowerCase()
            .includes(term) ||
          chat.game
            .toLowerCase()
            .includes(term) ||
          chat.lastMessage
            .toLowerCase()
            .includes(term)
      );
    }, [search]);

  const totalUnread =
    chats.reduce(
      (total, chat) =>
        total + chat.unread,
      0
    );

  // ========================================
  // HEADER
  // ========================================

  function renderHeader() {
    return (
      <>
        {/* ==================================
            CABEÇALHO
        ================================== */}

        <View style={styles.header}>
          <View>
            <Text
              style={styles.eyebrow}
            >
              COMUNICAÇÃO
            </Text>

            <Text
              style={styles.title}
            >
              Chats
            </Text>

            <Text
              style={styles.subtitle}
            >
              Converse com suas squads
              e organize as partidas.
            </Text>
          </View>

          <View
            style={
              styles.headerIcon
            }
          >
            <Ionicons
              name="chatbubbles-outline"
              size={25}
              color={
                COLORS.primaryLight
              }
            />

            {totalUnread > 0 && (
              <View
                style={
                  styles.headerBadge
                }
              >
                <Text
                  style={
                    styles.headerBadgeText
                  }
                >
                  {totalUnread > 9
                    ? '9+'
                    : totalUnread}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* ==================================
            SEARCH
        ================================== */}

        <View
          style={
            styles.searchContainer
          }
        >
          <View
            style={
              styles.searchIcon
            }
          >
            <Ionicons
              name="search"
              size={18}
              color={
                COLORS.primaryLight
              }
            />
          </View>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar conversa ou jogo..."
            placeholderTextColor={
              COLORS.textSecondary
            }
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {search.length > 0 && (
            <Pressable
              style={
                styles.clearButton
              }
              onPress={() =>
                setSearch('')
              }
            >
              <Ionicons
                name="close"
                size={17}
                color={
                  COLORS.textSecondary
                }
              />
            </Pressable>
          )}
        </View>

        {/* ==================================
            STATUS
        ================================== */}

        <View
          style={
            styles.statusCard
          }
        >
          <View
            style={
              styles.statusIcon
            }
          >
            <Ionicons
              name="radio-outline"
              size={19}
              color={
                COLORS.success
              }
            />
          </View>

          <View
            style={
              styles.statusInfo
            }
          >
            <Text
              style={
                styles.statusTitle
              }
            >
              PartyUp Online
            </Text>

            <Text
              style={
                styles.statusDescription
              }
            >
              Suas conversas estão
              prontas para a próxima
              partida.
            </Text>
          </View>

          <View
            style={
              styles.onlineIndicator
            }
          >
            <View
              style={
                styles.onlineDotSmall
              }
            />

            <Text
              style={
                styles.onlineText
              }
            >
              ONLINE
            </Text>
          </View>
        </View>

        {/* ==================================
            CONVERSAS
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
              MENSAGENS
            </Text>

            <Text
              style={
                styles.sectionTitle
              }
            >
              Conversas recentes
            </Text>
          </View>

          <View
            style={
              styles.chatCount
            }
          >
            <Text
              style={
                styles.chatCountText
              }
            >
              {filteredChats.length}
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
        data={filteredChats}
        keyExtractor={(item) =>
          item.id
        }
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          styles.content
        }
        ListHeaderComponent={
          renderHeader
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.chat,

              item.unread > 0 &&
                styles.chatUnread,

              pressed &&
                styles.pressed,
            ]}
            onPress={() =>
              router.push({
                pathname:
                  '/chat/[id]',

                params: {
                  id: item.id,
                },
              })
            }
          >
            {/* ==============================
                AVATAR
            ============================== */}

            <View
              style={
                styles.avatarArea
              }
            >
              <View
                style={
                  styles.avatar
                }
              >
                <Ionicons
                  name={getGameIcon(
                    item.game
                  )}
                  size={24}
                  color={
                    COLORS.primaryLight
                  }
                />
              </View>

              {item.online && (
                <View
                  style={
                    styles.online
                  }
                />
              )}
            </View>

            {/* ==============================
                INFORMAÇÕES
            ============================== */}

            <View
              style={styles.info}
            >
              <View
                style={styles.row}
              >
                <Text
                  style={
                    styles.name
                  }
                  numberOfLines={1}
                >
                  {item.name}
                </Text>

                <Text
                  style={[
                    styles.time,

                    item.unread > 0 &&
                      styles.timeUnread,
                  ]}
                >
                  {item.time}
                </Text>
              </View>

              <View
                style={
                  styles.gameRow
                }
              >
                <Ionicons
                  name="game-controller-outline"
                  size={11}
                  color={
                    COLORS.primaryLight
                  }
                />

                <Text
                  style={
                    styles.game
                  }
                  numberOfLines={1}
                >
                  {item.game}
                </Text>
              </View>

              <View
                style={
                  styles.messageRow
                }
              >
                <Text
                  style={[
                    styles.message,

                    item.unread > 0 &&
                      styles.messageUnread,
                  ]}
                  numberOfLines={1}
                >
                  {item.lastMessage}
                </Text>

                {item.unread > 0 ? (
                  <View
                    style={
                      styles.badge
                    }
                  >
                    <Text
                      style={
                        styles.badgeText
                      }
                    >
                      {item.unread > 9
                        ? '9+'
                        : item.unread}
                    </Text>
                  </View>
                ) : (
                  <Ionicons
                    name="checkmark-done"
                    size={16}
                    color={
                      COLORS.textSecondary
                    }
                  />
                )}
              </View>
            </View>

            {/* ==============================
                SETA
            ============================== */}

            <View
              style={
                styles.chevron
              }
            >
              <Ionicons
                name="chevron-forward"
                size={16}
                color={
                  COLORS.textSecondary
                }
              />
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View
            style={styles.empty}
          >
            <View
              style={
                styles.emptyIcon
              }
            >
              <Ionicons
                name="chatbubbles-outline"
                size={34}
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
              Nenhuma conversa
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              {search
                ? 'Nenhuma conversa corresponde à sua pesquisa.'
                : 'Entre em uma Party para começar a conversar com sua squad.'}
            </Text>

            {search.length > 0 && (
              <Pressable
                style={
                  styles.clearSearchButton
                }
                onPress={() =>
                  setSearch('')
                }
              >
                <Ionicons
                  name="refresh-outline"
                  size={17}
                  color="#FFFFFF"
                />

                <Text
                  style={
                    styles.clearSearchText
                  }
                >
                  Limpar pesquisa
                </Text>
              </Pressable>
            )}
          </View>
        }
      />
    </SafeAreaView>
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

  if (
    value.includes('fortnite')
  ) {
    return 'construct';
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

      paddingBottom: 125,
    },

    // ======================================
    // HEADER
    // ======================================

    header: {
      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'space-between',

      marginBottom: 21,
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

      lineHeight: 18,

      marginTop: 5,

      maxWidth: 250,
    },

    headerIcon: {
      width: 49,

      height: 49,

      borderRadius: 16,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      alignItems: 'center',

      justifyContent:
        'center',

      position: 'relative',
    },

    headerBadge: {
      position: 'absolute',

      minWidth: 18,

      height: 18,

      paddingHorizontal: 4,

      borderRadius: 9,

      backgroundColor:
        COLORS.primary,

      alignItems: 'center',

      justifyContent:
        'center',

      top: -5,

      right: -5,

      borderWidth: 2,

      borderColor:
        COLORS.background,
    },

    headerBadgeText: {
      color: '#FFFFFF',

      fontSize: 8,

      fontWeight: '900',
    },

    // ======================================
    // SEARCH
    // ======================================

    searchContainer: {
      minHeight: 55,

      backgroundColor:
        COLORS.surface,

      borderRadius: 17,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      flexDirection: 'row',

      alignItems: 'center',

      paddingHorizontal: 10,
    },

    searchIcon: {
      width: 36,

      height: 36,

      borderRadius: 11,

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

    clearButton: {
      width: 32,

      height: 32,

      borderRadius: 10,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    // ======================================
    // STATUS
    // ======================================

    statusCard: {
      minHeight: 71,

      flexDirection: 'row',

      alignItems: 'center',

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      borderRadius: 17,

      padding: 12,

      marginTop: 13,
    },

    statusIcon: {
      width: 42,

      height: 42,

      borderRadius: 13,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    statusInfo: {
      flex: 1,

      marginLeft: 10,
    },

    statusTitle: {
      color: COLORS.text,

      fontSize: 12,

      fontWeight: '800',
    },

    statusDescription: {
      color:
        COLORS.textSecondary,

      fontSize: 8,

      lineHeight: 12,

      maxWidth: 190,

      marginTop: 2,
    },

    onlineIndicator: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 5,

      paddingHorizontal: 8,

      paddingVertical: 6,

      borderRadius: 9,

      backgroundColor:
        'rgba(34,197,94,0.08)',
    },

    onlineDotSmall: {
      width: 6,

      height: 6,

      borderRadius: 6,

      backgroundColor:
        COLORS.success,
    },

    onlineText: {
      color: COLORS.success,

      fontSize: 7,

      fontWeight: '900',

      letterSpacing: 0.5,
    },

    // ======================================
    // SECTION
    // ======================================

    sectionHeader: {
      flexDirection: 'row',

      alignItems: 'flex-end',

      justifyContent:
        'space-between',

      marginTop: 28,

      marginBottom: 14,
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

      fontSize: 19,

      fontWeight: '800',
    },

    chatCount: {
      minWidth: 30,

      height: 30,

      borderRadius: 10,

      backgroundColor:
        'rgba(124,58,237,0.10)',

      borderWidth: 1,

      borderColor:
        COLORS.primary,

      alignItems: 'center',

      justifyContent:
        'center',

      paddingHorizontal: 8,
    },

    chatCountText: {
      color:
        COLORS.primaryLight,

      fontSize: 11,

      fontWeight: '900',
    },

    // ======================================
    // CHAT
    // ======================================

    chat: {
      minHeight: 88,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      borderRadius: 18,

      padding: 12,

      marginBottom: 10,

      flexDirection: 'row',

      alignItems: 'center',
    },

    chatUnread: {
      borderColor:
        'rgba(124,58,237,0.45)',

      backgroundColor:
        'rgba(124,58,237,0.04)',
    },

    pressed: {
      opacity: 0.7,

      transform: [
        {
          scale: 0.99,
        },
      ],
    },

    avatarArea: {
      position: 'relative',
    },

    avatar: {
      width: 54,

      height: 54,

      borderRadius: 17,

      backgroundColor:
        COLORS.background,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      justifyContent:
        'center',

      alignItems: 'center',
    },

    online: {
      position: 'absolute',

      width: 12,

      height: 12,

      borderRadius: 6,

      backgroundColor:
        COLORS.success,

      right: -2,

      bottom: -2,

      borderWidth: 2,

      borderColor:
        COLORS.surface,
    },

    info: {
      flex: 1,

      marginLeft: 12,
    },

    row: {
      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'space-between',
    },

    name: {
      color: COLORS.text,

      fontWeight: '800',

      fontSize: 14,

      flex: 1,
    },

    time: {
      color:
        COLORS.textSecondary,

      fontSize: 9,

      marginLeft: 10,
    },

    timeUnread: {
      color:
        COLORS.primaryLight,

      fontWeight: '700',
    },

    gameRow: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 4,

      marginTop: 3,
    },

    game: {
      color:
        COLORS.primaryLight,

      fontSize: 9,

      fontWeight: '700',
    },

    messageRow: {
      flexDirection: 'row',

      alignItems: 'center',

      marginTop: 6,
    },

    message: {
      color:
        COLORS.textSecondary,

      fontSize: 11,

      flex: 1,

      marginRight: 7,
    },

    messageUnread: {
      color: COLORS.text,

      fontWeight: '600',
    },

    badge: {
      minWidth: 21,

      height: 21,

      borderRadius: 11,

      backgroundColor:
        COLORS.primary,

      justifyContent:
        'center',

      alignItems: 'center',

      paddingHorizontal: 5,
    },

    badgeText: {
      color: '#FFFFFF',

      fontSize: 9,

      fontWeight: '900',
    },

    chevron: {
      width: 25,

      alignItems: 'flex-end',

      justifyContent:
        'center',

      marginLeft: 4,
    },

    // ======================================
    // EMPTY
    // ======================================

    empty: {
      alignItems: 'center',

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      borderRadius: 20,

      padding: 28,
    },

    emptyIcon: {
      width: 68,

      height: 68,

      borderRadius: 21,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',

      marginBottom: 15,
    },

    emptyTitle: {
      color: COLORS.text,

      fontSize: 17,

      fontWeight: '800',
    },

    emptyText: {
      color:
        COLORS.textSecondary,

      fontSize: 11,

      lineHeight: 17,

      textAlign: 'center',

      maxWidth: 250,

      marginTop: 6,
    },

    clearSearchButton: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 6,

      backgroundColor:
        COLORS.primary,

      paddingHorizontal: 15,

      paddingVertical: 11,

      borderRadius: 12,

      marginTop: 16,
    },

    clearSearchText: {
      color: '#FFFFFF',

      fontSize: 11,

      fontWeight: '800',
    },
  });