import { Ionicons } from '@expo/vector-icons';
import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  useRef,
  useState,
} from 'react';

import {
  FlatList,
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
  SPACING,
} from '../../constants/theme';

import {
  chats,
  initialMessages,
  Message,
} from '../../data/messages';

import { useAuth } from '../../contexts/AuthContext';

// ==========================================
// CHAT
// ==========================================

export default function ChatScreen() {
  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const { user } = useAuth();

  const listRef =
    useRef<FlatList<Message>>(null);

  // ========================================
  // CHAT ATUAL
  // ========================================

  const chat = chats.find(
    (item) => item.id === id
  );

  // ========================================
  // MENSAGENS
  // ========================================

  const [messages, setMessages] =
    useState<Message[]>(
      initialMessages.filter(
        (message) =>
          message.chatId === id
      )
    );

  const [text, setText] =
    useState('');

  // ========================================
  // USUÁRIO
  // ========================================

  const currentUsername =
    user?.user_metadata?.username ||
    user?.user_metadata?.name ||
    'Você';

  // ========================================
  // ENVIAR MENSAGEM
  // ========================================

  function sendMessage() {
    const messageText =
      text.trim();

    if (!messageText) {
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),

      chatId: id,

      userId: 'current-user',

      username:
        currentUsername,

      text: messageText,

      time: new Date()
        .toLocaleTimeString(
          'pt-BR',
          {
            hour: '2-digit',
            minute: '2-digit',
          }
        ),
    };

    setMessages((current) => [
      ...current,
      newMessage,
    ]);

    setText('');

    setTimeout(() => {
      listRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  }

  // ========================================
  // CHAT NÃO ENCONTRADO
  // ========================================

  if (!chat) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <View
          style={styles.notFound}
        >
          <View
            style={
              styles.notFoundIcon
            }
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={34}
              color={
                COLORS.primaryLight
              }
            />
          </View>

          <Text
            style={
              styles.notFoundTitle
            }
          >
            Chat não encontrado
          </Text>

          <Text
            style={
              styles.notFoundText
            }
          >
            Essa conversa não está
            disponível no momento.
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
              size={17}
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
  // TELA
  // ========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        {/* ==================================
            HEADER
        ================================== */}

        <View
          style={styles.header}
        >
          <Pressable
            style={({ pressed }) => [
              styles.headerButton,

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

          {/* ==================================
              AVATAR
          ================================== */}

          <View
            style={
              styles.headerAvatar
            }
          >
            <Ionicons
              name={getGameIcon(
                chat.game
              )}
              size={21}
              color={
                COLORS.primaryLight
              }
            />

            {chat.online && (
              <View
                style={
                  styles.onlineDot
                }
              />
            )}
          </View>

          {/* ==================================
              INFO
          ================================== */}

          <View
            style={
              styles.headerInfo
            }
          >
            <Text
              style={
                styles.chatName
              }
              numberOfLines={1}
            >
              {chat.name}
            </Text>

            <View
              style={
                styles.headerStatus
              }
            >
              {chat.online && (
                <>
                  <View
                    style={
                      styles.statusDot
                    }
                  />

                  <Text
                    style={
                      styles.onlineText
                    }
                  >
                    Online
                  </Text>

                  <Text
                    style={
                      styles.separator
                    }
                  >
                    •
                  </Text>
                </>
              )}

              <Text
                style={styles.game}
                numberOfLines={1}
              >
                {chat.game}
              </Text>
            </View>
          </View>

          {/* ==================================
              MEMBERS
          ================================== */}

          <Pressable
            style={({ pressed }) => [
              styles.headerButton,

              pressed &&
                styles.pressed,
            ]}
          >
            <Ionicons
              name="people-outline"
              size={20}
              color={COLORS.text}
            />
          </Pressable>
        </View>

        {/* ==================================
            PARTY INFO
        ================================== */}

        <View
          style={
            styles.partyBanner
          }
        >
          <View
            style={
              styles.partyBannerIcon
            }
          >
            <Ionicons
              name="game-controller-outline"
              size={17}
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
                styles.partyBannerLabel
              }
            >
              PARTY ATIVA
            </Text>

            <Text
              style={
                styles.partyBannerText
              }
              numberOfLines={1}
            >
              {chat.game}
            </Text>
          </View>

          <View
            style={
              styles.activeBadge
            }
          >
            <View
              style={
                styles.activeDot
              }
            />

            <Text
              style={
                styles.activeText
              }
            >
              AO VIVO
            </Text>
          </View>
        </View>

        {/* ==================================
            MENSAGENS
        ================================== */}

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) =>
            item.id
          }
          contentContainerStyle={
            styles.messages
          }
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({
              animated: false,
            })
          }
          ListHeaderComponent={
            messages.length > 0 ? (
              <View
                style={
                  styles.todayContainer
                }
              >
                <View
                  style={
                    styles.todayLine
                  }
                />

                <View
                  style={
                    styles.todayBadge
                  }
                >
                  <Text
                    style={
                      styles.todayText
                    }
                  >
                    HOJE
                  </Text>
                </View>

                <View
                  style={
                    styles.todayLine
                  }
                />
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View
              style={
                styles.emptyMessages
              }
            >
              <View
                style={
                  styles.emptyIcon
                }
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={31}
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
                Comece a conversa
              </Text>

              <Text
                style={
                  styles.emptyText
                }
              >
                Envie a primeira
                mensagem para sua
                squad.
              </Text>
            </View>
          }
          renderItem={({
            item,
            index,
          }) => {
            const mine =
              item.userId ===
              'current-user';

            const previous =
              messages[
                index - 1
              ];

            const sameUser =
              previous?.userId ===
              item.userId;

            return (
              <View
                style={[
                  styles.messageRow,

                  mine
                    ? styles.messageRight
                    : styles.messageLeft,

                  sameUser &&
                    styles.sameUserMessage,
                ]}
              >
                {/* ==========================
                    AVATAR OUTRO USUÁRIO
                ========================== */}

                {!mine &&
                  !sameUser && (
                    <View
                      style={
                        styles.messageAvatar
                      }
                    >
                      <Text
                        style={
                          styles.messageAvatarText
                        }
                      >
                        {item.username
                          .charAt(0)
                          .toUpperCase()}
                      </Text>
                    </View>
                  )}

                {!mine &&
                  sameUser && (
                    <View
                      style={
                        styles.avatarSpacer
                      }
                    />
                  )}

                {/* ==========================
                    MENSAGEM
                ========================== */}

                <View
                  style={[
                    styles.bubbleArea,

                    mine &&
                      styles.myBubbleArea,
                  ]}
                >
                  {!mine &&
                    !sameUser && (
                      <Text
                        style={
                          styles.username
                        }
                      >
                        @{item.username}
                      </Text>
                    )}

                  <View
                    style={[
                      styles.bubble,

                      mine
                        ? styles.myBubble
                        : styles.otherBubble,
                    ]}
                  >
                    <Text
                      style={
                        styles.messageText
                      }
                    >
                      {item.text}
                    </Text>

                    <View
                      style={
                        styles.messageFooter
                      }
                    >
                      <Text
                        style={[
                          styles.messageTime,

                          mine &&
                            styles.myMessageTime,
                        ]}
                      >
                        {item.time}
                      </Text>

                      {mine && (
                        <Ionicons
                          name="checkmark-done"
                          size={13}
                          color="rgba(255,255,255,0.75)"
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />

        {/* ==================================
            INPUT
        ================================== */}

        <View
          style={styles.inputArea}
        >
          <Pressable
            style={({ pressed }) => [
              styles.smallButton,

              pressed &&
                styles.pressed,
            ]}
          >
            <Ionicons
              name="add"
              size={22}
              color={
                COLORS.textSecondary
              }
            />
          </Pressable>

          <View
            style={
              styles.inputContainer
            }
          >
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Mensagem..."
              placeholderTextColor={
                COLORS.textSecondary
              }
              style={styles.input}
              multiline
              maxLength={500}
              returnKeyType="default"
            />

            <Pressable
              style={
                styles.emojiButton
              }
            >
              <Ionicons
                name="happy-outline"
                size={20}
                color={
                  COLORS.textSecondary
                }
              />
            </Pressable>
          </View>

          <Pressable
            disabled={
              text.trim().length === 0
            }
            style={({ pressed }) => [
              styles.sendButton,

              text.trim().length ===
                0 &&
                styles.sendButtonDisabled,

              pressed &&
                text.trim().length >
                  0 &&
                styles.pressed,
            ]}
            onPress={sendMessage}
          >
            <Ionicons
              name="send"
              size={18}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
// STYLES
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

    // ======================================
    // HEADER
    // ======================================

    header: {
      minHeight: 72,

      paddingHorizontal:
        SPACING.md,

      borderBottomWidth: 1,

      borderBottomColor:
        COLORS.border,

      flexDirection: 'row',

      alignItems: 'center',

      backgroundColor:
        COLORS.background,
    },

    headerButton: {
      width: 42,

      height: 42,

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

    headerAvatar: {
      width: 42,

      height: 42,

      borderRadius: 13,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      alignItems: 'center',

      justifyContent:
        'center',

      marginLeft: 10,

      position: 'relative',
    },

    onlineDot: {
      position: 'absolute',

      width: 10,

      height: 10,

      borderRadius: 10,

      backgroundColor:
        COLORS.success,

      right: -2,

      bottom: -2,

      borderWidth: 2,

      borderColor:
        COLORS.background,
    },

    headerInfo: {
      flex: 1,

      marginHorizontal: 10,
    },

    chatName: {
      color: COLORS.text,

      fontSize: 14,

      fontWeight: '800',
    },

    headerStatus: {
      flexDirection: 'row',

      alignItems: 'center',

      marginTop: 3,

      maxWidth: 200,
    },

    statusDot: {
      width: 5,

      height: 5,

      borderRadius: 5,

      backgroundColor:
        COLORS.success,

      marginRight: 5,
    },

    onlineText: {
      color: COLORS.success,

      fontSize: 9,

      fontWeight: '700',
    },

    separator: {
      color:
        COLORS.textSecondary,

      fontSize: 9,

      marginHorizontal: 5,
    },

    game: {
      color:
        COLORS.primaryLight,

      fontSize: 9,

      fontWeight: '600',

      flexShrink: 1,
    },

    // ======================================
    // PARTY BANNER
    // ======================================

    partyBanner: {
      minHeight: 55,

      flexDirection: 'row',

      alignItems: 'center',

      paddingHorizontal:
        SPACING.md,

      backgroundColor:
        COLORS.surface,

      borderBottomWidth: 1,

      borderBottomColor:
        COLORS.border,
    },

    partyBannerIcon: {
      width: 34,

      height: 34,

      borderRadius: 10,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',

      marginRight: 9,
    },

    partyBannerLabel: {
      color:
        COLORS.textSecondary,

      fontSize: 7,

      fontWeight: '900',

      letterSpacing: 0.9,
    },

    partyBannerText: {
      color: COLORS.text,

      fontSize: 10,

      fontWeight: '700',

      marginTop: 2,
    },

    activeBadge: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 5,

      paddingHorizontal: 8,

      paddingVertical: 5,

      borderRadius: 8,

      backgroundColor:
        'rgba(34,197,94,0.08)',
    },

    activeDot: {
      width: 5,

      height: 5,

      borderRadius: 5,

      backgroundColor:
        COLORS.success,
    },

    activeText: {
      color: COLORS.success,

      fontSize: 7,

      fontWeight: '900',
    },

    // ======================================
    // MESSAGES
    // ======================================

    messages: {
      paddingHorizontal:
        SPACING.md,

      paddingTop: 13,

      paddingBottom: 18,

      flexGrow: 1,

      justifyContent:
        'flex-end',
    },

    todayContainer: {
      flexDirection: 'row',

      alignItems: 'center',

      marginVertical: 15,
    },

    todayLine: {
      flex: 1,

      height: 1,

      backgroundColor:
        COLORS.border,
    },

    todayBadge: {
      paddingHorizontal: 10,

      paddingVertical: 5,

      borderRadius: 8,

      backgroundColor:
        COLORS.surface,

      marginHorizontal: 10,
    },

    todayText: {
      color:
        COLORS.textSecondary,

      fontSize: 7,

      fontWeight: '900',

      letterSpacing: 1,
    },

    messageRow: {
      flexDirection: 'row',

      marginVertical: 6,

      alignItems: 'flex-end',
    },

    sameUserMessage: {
      marginTop: -2,
    },

    messageLeft: {
      justifyContent:
        'flex-start',
    },

    messageRight: {
      justifyContent:
        'flex-end',
    },

    messageAvatar: {
      width: 30,

      height: 30,

      borderRadius: 10,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      alignItems: 'center',

      justifyContent:
        'center',

      marginRight: 7,
    },

    messageAvatarText: {
      color:
        COLORS.primaryLight,

      fontSize: 10,

      fontWeight: '900',
    },

    avatarSpacer: {
      width: 37,
    },

    bubbleArea: {
      maxWidth: '79%',
    },

    myBubbleArea: {
      alignItems: 'flex-end',
    },

    username: {
      color:
        COLORS.primaryLight,

      fontSize: 9,

      fontWeight: '700',

      marginBottom: 4,

      marginLeft: 3,
    },

    bubble: {
      paddingHorizontal: 13,

      paddingTop: 10,

      paddingBottom: 7,

      borderRadius: 16,
    },

    myBubble: {
      backgroundColor:
        COLORS.primary,

      borderBottomRightRadius: 5,
    },

    otherBubble: {
      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      borderBottomLeftRadius: 5,
    },

    messageText: {
      color: COLORS.text,

      fontSize: 13,

      lineHeight: 18,
    },

    messageFooter: {
      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'flex-end',

      gap: 3,

      marginTop: 5,
    },

    messageTime: {
      color:
        COLORS.textSecondary,

      fontSize: 8,
    },

    myMessageTime: {
      color:
        'rgba(255,255,255,0.65)',
    },

    // ======================================
    // INPUT
    // ======================================

    inputArea: {
      borderTopWidth: 1,

      borderTopColor:
        COLORS.border,

      paddingHorizontal:
        SPACING.md,

      paddingTop: 10,

      paddingBottom:
        Platform.OS === 'ios'
          ? 10
          : 12,

      flexDirection: 'row',

      alignItems: 'flex-end',

      gap: 8,

      backgroundColor:
        COLORS.background,
    },

    smallButton: {
      width: 43,

      height: 43,

      borderRadius: 14,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      justifyContent:
        'center',

      alignItems: 'center',
    },

    inputContainer: {
      flex: 1,

      minHeight: 43,

      maxHeight: 105,

      flexDirection: 'row',

      alignItems: 'flex-end',

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      borderRadius: 15,

      paddingLeft: 13,

      paddingRight: 5,
    },

    input: {
      flex: 1,

      minHeight: 41,

      maxHeight: 100,

      color: COLORS.text,

      fontSize: 12,

      paddingTop: 11,

      paddingBottom: 10,

      paddingRight: 5,
    },

    emojiButton: {
      width: 34,

      height: 41,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    sendButton: {
      width: 43,

      height: 43,

      borderRadius: 14,

      backgroundColor:
        COLORS.primary,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    sendButtonDisabled: {
      opacity: 0.35,
    },

    // ======================================
    // EMPTY
    // ======================================

    emptyMessages: {
      flex: 1,

      alignItems: 'center',

      justifyContent:
        'center',

      paddingVertical: 60,
    },

    emptyIcon: {
      width: 65,

      height: 65,

      borderRadius: 20,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    emptyTitle: {
      color: COLORS.text,

      fontSize: 15,

      fontWeight: '800',

      marginTop: 14,
    },

    emptyText: {
      color:
        COLORS.textSecondary,

      fontSize: 10,

      marginTop: 5,

      textAlign: 'center',
    },

    // ======================================
    // NOT FOUND
    // ======================================

    notFound: {
      flex: 1,

      justifyContent:
        'center',

      alignItems: 'center',

      padding: 30,
    },

    notFoundIcon: {
      width: 70,

      height: 70,

      borderRadius: 22,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    notFoundTitle: {
      color: COLORS.text,

      fontSize: 18,

      fontWeight: '900',

      marginTop: 15,
    },

    notFoundText: {
      color:
        COLORS.textSecondary,

      fontSize: 10,

      marginTop: 6,

      textAlign: 'center',
    },

    backButton: {
      flexDirection: 'row',

      alignItems: 'center',

      gap: 6,

      backgroundColor:
        COLORS.primary,

      paddingHorizontal: 17,

      paddingVertical: 11,

      borderRadius: 12,

      marginTop: 17,
    },

    backButtonText: {
      color: '#FFFFFF',

      fontSize: 11,

      fontWeight: '800',
    },

    pressed: {
      opacity: 0.7,
    },
  });