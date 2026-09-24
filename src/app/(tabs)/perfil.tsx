import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Modal,
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
  SPACING,
} from '../../constants/theme';

import { useParties } from '../../contexts/PartyContext';
import { useAuth } from '../../contexts/AuthContext';

// ==========================================
// PERFIL
// ==========================================

export default function Perfil() {
  const { parties } = useParties();

  const {
    user,
    signOut,
    updateProfile,
  } = useAuth();

  // ========================================
  // MODAL
  // ========================================

  const [
    editVisible,
    setEditVisible,
  ] = useState(false);

  const [
    editName,
    setEditName,
  ] = useState('');

  const [
    editUsername,
    setEditUsername,
  ] = useState('');

  const [
    editBio,
    setEditBio,
  ] = useState('');

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    loggingOut,
    setLoggingOut,
  ] = useState(false);

  // ========================================
  // DADOS DO USUÁRIO
  // ========================================

  const name =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    'Jogador';

  const username =
    user?.user_metadata?.username ||
    user?.email?.split('@')[0] ||
    'player';

  const email =
    user?.email ||
    'E-mail não disponível';

  const bio =
    user?.user_metadata?.bio ||
    'Procurando squad, boas partidas e aquela subida de elo. 🎮';

  const initial =
    name
      .charAt(0)
      .toUpperCase();

  // ========================================
  // MINHAS PARTIES
  // ========================================

  const myParties =
    parties.filter(
      (party) =>
        party.owner.id === user?.id
    );

  // ========================================
  // ABRIR EDIÇÃO
  // ========================================

  function handleEditProfile() {
    setEditName(name);

    setEditUsername(username);

    setEditBio(bio);

    setEditVisible(true);
  }

  // ========================================
  // SALVAR PERFIL
  // ========================================

  async function handleSaveProfile() {
    if (!editName.trim()) {
      Alert.alert(
        'Nome obrigatório',
        'Digite seu nome.'
      );

      return;
    }

    if (!editUsername.trim()) {
      Alert.alert(
        'Username obrigatório',
        'Digite seu username.'
      );

      return;
    }

    try {
      setSaving(true);

      const error =
        await updateProfile({
          name:
            editName.trim(),

          username:
            editUsername
              .trim()
              .toLowerCase(),

          bio:
            editBio.trim(),
        });

      if (error) {
        Alert.alert(
          'Erro ao atualizar',
          error
        );

        return;
      }

      setEditVisible(false);

      Alert.alert(
        'Perfil atualizado',
        'Suas informações foram salvas.'
      );
    } catch (error) {
      console.error(
        'Erro salvando perfil:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível atualizar o perfil.'
      );
    } finally {
      setSaving(false);
    }
  }

  // ========================================
  // LOGOUT
  // ========================================

  function handleLogout() {
    Alert.alert(
      'Sair da conta',
      'Deseja realmente sair do PartyUp?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Sair',
          style: 'destructive',

          onPress: async () => {
            try {
              setLoggingOut(true);

              const error =
                await signOut();

              if (error) {
                Alert.alert(
                  'Erro ao sair',
                  error
                );

                return;
              }

              router.replace(
                '/login'
              );
            } catch (error) {
              console.error(
                'Erro logout:',
                error
              );

              Alert.alert(
                'Erro',
                'Não foi possível sair da conta.'
              );
            } finally {
              setLoggingOut(false);
            }
          },
        },
      ]
    );
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
            HEADER
        ================================== */}

        <View style={styles.header}>
          <View>
            <Text
              style={styles.eyebrow}
            >
              SUA CONTA
            </Text>

            <Text
              style={styles.pageTitle}
            >
              Perfil
            </Text>

            <Text
              style={
                styles.pageSubtitle
              }
            >
              Sua identidade no PartyUp.
            </Text>
          </View>

          <View
            style={
              styles.headerIcon
            }
          >
            <Ionicons
              name="person-outline"
              size={22}
              color={
                COLORS.primaryLight
              }
            />
          </View>
        </View>

        {/* ==================================
            PROFILE CARD
        ================================== */}

        <View
          style={styles.profileCard}
        >
          <View
            style={styles.profileGlow}
          />

          <View
            style={styles.profileTop}
          >
            {/* AVATAR */}

            <View
              style={
                styles.avatarWrapper
              }
            >
              <View
                style={styles.avatar}
              >
                <Text
                  style={
                    styles.avatarText
                  }
                >
                  {initial}
                </Text>
              </View>

              <View
                style={styles.online}
              />
            </View>

            {/* DADOS */}

            <View
              style={
                styles.profileInfo
              }
            >
              <Text
                style={styles.name}
                numberOfLines={1}
              >
                {name}
              </Text>

              <Text
                style={
                  styles.username
                }
              >
                @{username}
              </Text>

              <View
                style={styles.level}
              >
                <Ionicons
                  name="flash"
                  size={12}
                  color={
                    COLORS.primaryLight
                  }
                />

                <Text
                  style={
                    styles.levelText
                  }
                >
                  NÍVEL 1
                </Text>
              </View>
            </View>

            {/* ==============================
                BOTÃO EDITAR PERFIL
            ============================== */}

            <Pressable
              style={({ pressed }) => [
                styles.editButton,

                pressed &&
                  styles.pressed,
              ]}
              onPress={
                handleEditProfile
              }
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={
                  COLORS.primaryLight
                }
              />
            </Pressable>
          </View>

          {/* BIO */}

          <Text style={styles.bio}>
            {bio}
          </Text>

          {/* EMAIL */}

          <View
            style={
              styles.emailContainer
            }
          >
            <Ionicons
              name="mail-outline"
              size={15}
              color={
                COLORS.textSecondary
              }
            />

            <Text
              style={
                styles.emailText
              }
              numberOfLines={1}
            >
              {email}
            </Text>
          </View>
        </View>

        {/* ==================================
            STATS
        ================================== */}

        <View style={styles.stats}>
          <Stat
            icon="people-outline"
            value={String(
              myParties.length
            )}
            label="Parties"
          />

          <View
            style={styles.separator}
          />

          <Stat
            icon="game-controller-outline"
            value="12"
            label="Partidas"
          />

          <View
            style={styles.separator}
          />

          <Stat
            icon="people-circle-outline"
            value="8"
            label="Amigos"
          />
        </View>

        {/* ==================================
            JOGOS
        ================================== */}

        <SectionHeader
          eyebrow="SEUS FAVORITOS"
          title="Meus jogos"
        />

        <View style={styles.games}>
          <Game
            name="Valorant"
            rank="Diamante"
            icon="flash"
          />

          <Game
            name="League of Legends"
            rank="Platina"
            icon="shield"
          />

          <Game
            name="Counter-Strike 2"
            rank="15.000"
            icon="locate"
          />
        </View>

        {/* ==================================
            MINHAS PARTIES
        ================================== */}

        <SectionHeader
          eyebrow="CRIADAS POR VOCÊ"
          title="Minhas Parties"
          count={myParties.length}
        />

        {myParties.length === 0 ? (
          <View style={styles.empty}>
            <View
              style={styles.emptyIcon}
            >
              <Ionicons
                name="people-outline"
                size={29}
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
              Nenhuma Party criada
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              Crie sua primeira Party
              e encontre jogadores
              para sua squad.
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.createPartyButton,

                pressed &&
                  styles.pressed,
              ]}
              onPress={() =>
                router.push(
                  '/(tabs)/criar'
                )
              }
            >
              <Ionicons
                name="add"
                size={17}
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.createPartyText
                }
              >
                Criar Party
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={
              styles.partiesContainer
            }
          >
            {myParties.map(
              (party) => {
                const available =
                  Math.max(
                    0,
                    party.maxPlayers -
                      party.currentPlayers
                  );

                return (
                  <Pressable
                    key={party.id}
                    style={({
                      pressed,
                    }) => [
                      styles.party,

                      pressed &&
                        styles.pressed,
                    ]}
                    onPress={() =>
                      router.push({
                        pathname:
                          '/party/[id]',

                        params: {
                          id: party.id,
                        },
                      })
                    }
                  >
                    <View
                      style={
                        styles.partyIcon
                      }
                    >
                      <Ionicons
                        name={getGameIcon(
                          party.game
                        )}
                        size={20}
                        color={
                          COLORS.primaryLight
                        }
                      />
                    </View>

                    <View
                      style={
                        styles.partyInfo
                      }
                    >
                      <Text
                        style={
                          styles.partyTitle
                        }
                        numberOfLines={1}
                      >
                        {party.title}
                      </Text>

                      <View
                        style={
                          styles.partyMeta
                        }
                      >
                        <Text
                          style={
                            styles.partyGame
                          }
                          numberOfLines={1}
                        >
                          {party.game}
                        </Text>

                        <Text
                          style={
                            styles.partyDot
                          }
                        >
                          •
                        </Text>

                        <Text
                          style={
                            styles.partyRank
                          }
                        >
                          {party.rank}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={
                        styles.partyRight
                      }
                    >
                      <View
                        style={
                          styles.partyPlayers
                        }
                      >
                        <Ionicons
                          name="people-outline"
                          size={13}
                          color={
                            COLORS.textSecondary
                          }
                        />

                        <Text
                          style={
                            styles.partyPlayersText
                          }
                        >
                          {
                            party.currentPlayers
                          }
                          /
                          {
                            party.maxPlayers
                          }
                        </Text>
                      </View>

                      <Text
                        style={
                          styles.availableText
                        }
                      >
                        {available > 0
                          ? `${available} vagas`
                          : 'Cheia'}
                      </Text>
                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={
                        COLORS.textSecondary
                      }
                    />
                  </Pressable>
                );
              }
            )}
          </View>
        )}

        {/* ==================================
            CONFIGURAÇÕES
        ================================== */}

        <SectionHeader
          eyebrow="CONFIGURAÇÕES"
          title="Conta"
        />

        <View
          style={
            styles.menuContainer
          }
        >
          {/* DADOS PESSOAIS TAMBÉM EDITA */}

          <MenuItem
            icon="person-outline"
            title="Dados pessoais"
            description="Nome, username e bio"
            onPress={
              handleEditProfile
            }
          />

          <View
            style={
              styles.menuDivider
            }
          />

          <MenuItem
            icon="notifications-outline"
            title="Notificações"
            description="Alertas e mensagens"
            onPress={() =>
              Alert.alert(
                'Notificações',
                'Configurações de notificações em breve.'
              )
            }
          />

          <View
            style={
              styles.menuDivider
            }
          />

          <MenuItem
            icon="shield-checkmark-outline"
            title="Privacidade"
            description="Segurança da sua conta"
            onPress={() =>
              Alert.alert(
                'Privacidade',
                'Configurações de privacidade em breve.'
              )
            }
          />

          <View
            style={
              styles.menuDivider
            }
          />

          <MenuItem
            icon="help-circle-outline"
            title="Ajuda"
            description="Suporte do PartyUp"
            onPress={() =>
              Alert.alert(
                'Ajuda',
                'Central de ajuda do PartyUp.'
              )
            }
          />
        </View>

        {/* ==================================
            BOTÃO SAIR DA CONTA
        ================================== */}

        <Pressable
          style={({ pressed }) => [
            styles.logout,

            pressed &&
              styles.pressed,

            loggingOut &&
              styles.logoutDisabled,
          ]}
          disabled={loggingOut}
          onPress={handleLogout}
        >
          <View
            style={
              styles.logoutIcon
            }
          >
            {loggingOut ? (
              <ActivityIndicator
                size="small"
                color={COLORS.danger}
              />
            ) : (
              <Ionicons
                name="log-out-outline"
                size={20}
                color={
                  COLORS.danger
                }
              />
            )}
          </View>

          <View
            style={{ flex: 1 }}
          >
            <Text
              style={
                styles.logoutText
              }
            >
              {loggingOut
                ? 'Saindo...'
                : 'Sair da conta'}
            </Text>

            <Text
              style={
                styles.logoutDescription
              }
            >
              Encerrar sua sessão no
              PartyUp
            </Text>
          </View>

          {!loggingOut && (
            <Ionicons
              name="chevron-forward"
              size={17}
              color={COLORS.danger}
            />
          )}
        </Pressable>

        {/* ==================================
            VERSION
        ================================== */}

        <View
          style={
            styles.versionContainer
          }
        >
          <Ionicons
            name="game-controller"
            size={14}
            color={
              COLORS.primaryLight
            }
          />

          <Text
            style={
              styles.versionText
            }
          >
            PartyUp • CP5
          </Text>
        </View>
      </ScrollView>

      {/* ====================================
          MODAL EDITAR PERFIL
      ==================================== */}

      <Modal
        visible={editVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() =>
          setEditVisible(false)
        }
      >
        <View
          style={
            styles.modalOverlay
          }
        >
          <View
            style={styles.modal}
          >
            {/* HEADER */}

            <View
              style={
                styles.modalHeader
              }
            >
              <View>
                <Text
                  style={
                    styles.modalEyebrow
                  }
                >
                  PARTYUP
                </Text>

                <Text
                  style={
                    styles.modalTitle
                  }
                >
                  Editar perfil
                </Text>

                <Text
                  style={
                    styles.modalSubtitle
                  }
                >
                  Personalize sua
                  identidade.
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.modalClose,

                  pressed &&
                    styles.pressed,
                ]}
                onPress={() =>
                  setEditVisible(
                    false
                  )
                }
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={
                    COLORS.text
                  }
                />
              </Pressable>
            </View>

            {/* AVATAR */}

            <View
              style={
                styles.modalProfile
              }
            >
              <View
                style={
                  styles.modalAvatar
                }
              >
                <Text
                  style={
                    styles.modalAvatarText
                  }
                >
                  {editName
                    .charAt(0)
                    .toUpperCase() ||
                    '?'}
                </Text>
              </View>

              <View>
                <Text
                  style={
                    styles.modalProfileName
                  }
                >
                  {editName ||
                    'Seu nome'}
                </Text>

                <Text
                  style={
                    styles.modalProfileUsername
                  }
                >
                  @
                  {editUsername ||
                    'username'}
                </Text>
              </View>
            </View>

            {/* NOME */}

            <Text
              style={
                styles.inputLabel
              }
            >
              NOME
            </Text>

            <View
              style={
                styles.editInputContainer
              }
            >
              <Ionicons
                name="person-outline"
                size={18}
                color={
                  COLORS.textSecondary
                }
              />

              <TextInput
                value={editName}
                onChangeText={
                  setEditName
                }
                placeholder="Seu nome"
                placeholderTextColor={
                  COLORS.textSecondary
                }
                style={
                  styles.editInput
                }
              />
            </View>

            {/* USERNAME */}

            <Text
              style={
                styles.inputLabel
              }
            >
              USERNAME
            </Text>

            <View
              style={
                styles.editInputContainer
              }
            >
              <Ionicons
                name="at"
                size={18}
                color={
                  COLORS.textSecondary
                }
              />

              <TextInput
                value={
                  editUsername
                }
                onChangeText={(
                  value
                ) =>
                  setEditUsername(
                    value
                      .replace(
                        /\s/g,
                        ''
                      )
                      .toLowerCase()
                  )
                }
                placeholder="username"
                placeholderTextColor={
                  COLORS.textSecondary
                }
                autoCapitalize="none"
                autoCorrect={false}
                style={
                  styles.editInput
                }
              />
            </View>

            {/* BIO */}

            <View
              style={
                styles.labelRow
              }
            >
              <Text
                style={
                  styles.inputLabel
                }
              >
                BIO
              </Text>

              <Text
                style={
                  styles.characterCount
                }
              >
                {editBio.length}/150
              </Text>
            </View>

            <View
              style={[
                styles.editInputContainer,
                styles.bioInputContainer,
              ]}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={
                  COLORS.textSecondary
                }
                style={{
                  marginTop: 2,
                }}
              />

              <TextInput
                value={editBio}
                onChangeText={
                  setEditBio
                }
                placeholder="Conte um pouco sobre você..."
                placeholderTextColor={
                  COLORS.textSecondary
                }
                multiline
                maxLength={150}
                style={[
                  styles.editInput,
                  styles.bioInput,
                ]}
              />
            </View>

            {/* ACTIONS */}

            <View
              style={
                styles.modalActions
              }
            >
              <Pressable
                style={({ pressed }) => [
                  styles.cancelButton,

                  pressed &&
                    styles.pressed,
                ]}
                disabled={saving}
                onPress={() =>
                  setEditVisible(
                    false
                  )
                }
              >
                <Text
                  style={
                    styles.cancelButtonText
                  }
                >
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.saveButton,

                  saving &&
                    styles.saveDisabled,

                  pressed &&
                    !saving &&
                    styles.pressed,
                ]}
                disabled={saving}
                onPress={
                  handleSaveProfile
                }
              >
                {saving ? (
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                  />
                ) : (
                  <>
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color="#FFFFFF"
                    />

                    <Text
                      style={
                        styles.saveButtonText
                      }
                    >
                      Salvar
                    </Text>
                  </>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ==========================================
// SECTION
// ==========================================

function SectionHeader({
  eyebrow,
  title,
  count,
}: {
  eyebrow: string;
  title: string;
  count?: number;
}) {
  return (
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
          {eyebrow}
        </Text>

        <Text
          style={
            styles.sectionTitle
          }
        >
          {title}
        </Text>
      </View>

      {count !== undefined && (
        <View
          style={
            styles.countBadge
          }
        >
          <Text
            style={
              styles.countText
            }
          >
            {count}
          </Text>
        </View>
      )}
    </View>
  );
}

// ==========================================
// STAT
// ==========================================

function Stat({
  icon,
  value,
  label,
}: {
  icon:
    keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <Ionicons
        name={icon}
        size={17}
        color={
          COLORS.primaryLight
        }
      />

      <Text
        style={styles.statValue}
      >
        {value}
      </Text>

      <Text
        style={styles.statLabel}
      >
        {label}
      </Text>
    </View>
  );
}

// ==========================================
// GAME
// ==========================================

function Game({
  name,
  rank,
  icon,
}: {
  name: string;
  rank: string;
  icon:
    keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View
      style={styles.gameCard}
    >
      <View
        style={styles.gameIcon}
      >
        <Ionicons
          name={icon}
          size={21}
          color={
            COLORS.primaryLight
          }
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={styles.gameName}
        >
          {name}
        </Text>

        <View
          style={styles.rankRow}
        >
          <Ionicons
            name="trophy-outline"
            size={11}
            color={
              COLORS.textSecondary
            }
          />

          <Text
            style={
              styles.gameRank
            }
          >
            {rank}
          </Text>
        </View>
      </View>

      <Ionicons
        name="checkmark-circle"
        size={18}
        color={COLORS.success}
      />
    </View>
  );
}

// ==========================================
// MENU
// ==========================================

function MenuItem({
  icon,
  title,
  description,
  onPress,
}: {
  icon:
    keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,

        pressed &&
          styles.pressed,
      ]}
      onPress={onPress}
    >
      <View
        style={styles.menuIcon}
      >
        <Ionicons
          name={icon}
          size={19}
          color={
            COLORS.primaryLight
          }
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={styles.menuText}
        >
          {title}
        </Text>

        <Text
          style={
            styles.menuDescription
          }
        >
          {description}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={17}
        color={
          COLORS.textSecondary
        }
      />
    </Pressable>
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
// STYLES
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
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 1.4,
      marginBottom: 4,
    },

    pageTitle: {
      color: COLORS.text,
      fontSize: 30,
      fontWeight: '900',
      letterSpacing: -1,
    },

    pageSubtitle: {
      color:
        COLORS.textSecondary,
      fontSize: 11,
      marginTop: 4,
    },

    headerIcon: {
      width: 47,
      height: 47,
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

    // PROFILE

    profileCard: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor:
        COLORS.surface,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      borderRadius: 22,
      padding: 17,
    },

    profileGlow: {
      position: 'absolute',
      width: 170,
      height: 170,
      borderRadius: 100,
      backgroundColor:
        COLORS.primary,
      opacity: 0.1,
      right: -60,
      top: -80,
    },

    profileTop: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    avatarWrapper: {
      position: 'relative',
    },

    avatar: {
      width: 64,
      height: 64,
      borderRadius: 20,
      backgroundColor:
        COLORS.primary,
      alignItems: 'center',
      justifyContent:
        'center',
      borderWidth: 2,
      borderColor:
        COLORS.primaryLight,
    },

    avatarText: {
      color: '#FFFFFF',
      fontSize: 22,
      fontWeight: '900',
    },

    online: {
      position: 'absolute',
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor:
        COLORS.success,
      right: -3,
      bottom: -3,
      borderWidth: 3,
      borderColor:
        COLORS.surface,
    },

    profileInfo: {
      flex: 1,
      marginLeft: 13,
    },

    name: {
      color: COLORS.text,
      fontSize: 18,
      fontWeight: '900',
    },

    username: {
      color:
        COLORS.textSecondary,
      fontSize: 11,
      marginTop: 2,
    },

    level: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor:
        'rgba(124,58,237,0.10)',
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 8,
      marginTop: 7,
    },

    levelText: {
      color:
        COLORS.primaryLight,
      fontSize: 7,
      fontWeight: '900',
    },

    editButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor:
        COLORS.background,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      alignItems: 'center',
      justifyContent:
        'center',
      zIndex: 10,
    },

    bio: {
      color:
        COLORS.textSecondary,
      fontSize: 11,
      lineHeight: 17,
      marginTop: 16,
    },

    emailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      backgroundColor:
        COLORS.background,
      borderRadius: 11,
      paddingHorizontal: 10,
      paddingVertical: 9,
      marginTop: 13,
    },

    emailText: {
      flex: 1,
      color:
        COLORS.textSecondary,
      fontSize: 9,
    },

    // STATS

    stats: {
      marginTop: 13,
      backgroundColor:
        COLORS.surface,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      borderRadius: 18,
      flexDirection: 'row',
      paddingVertical: 15,
    },

    stat: {
      flex: 1,
      alignItems: 'center',
      gap: 3,
    },

    statValue: {
      color: COLORS.text,
      fontSize: 17,
      fontWeight: '900',
    },

    statLabel: {
      color:
        COLORS.textSecondary,
      fontSize: 8,
    },

    separator: {
      width: 1,
      backgroundColor:
        COLORS.border,
      marginVertical: 7,
    },

    // SECTIONS

    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent:
        'space-between',
      marginTop: 28,
      marginBottom: 13,
    },

    sectionEyebrow: {
      color:
        COLORS.primaryLight,
      fontSize: 8,
      fontWeight: '900',
      letterSpacing: 1.1,
      marginBottom: 3,
    },

    sectionTitle: {
      color: COLORS.text,
      fontSize: 18,
      fontWeight: '800',
    },

    countBadge: {
      minWidth: 30,
      height: 30,
      paddingHorizontal: 8,
      borderRadius: 10,
      backgroundColor:
        'rgba(124,58,237,0.10)',
      borderWidth: 1,
      borderColor:
        COLORS.primary,
      alignItems: 'center',
      justifyContent:
        'center',
    },

    countText: {
      color:
        COLORS.primaryLight,
      fontSize: 11,
      fontWeight: '900',
    },

    // GAMES

    games: {
      gap: 9,
    },

    gameCard: {
      minHeight: 66,
      backgroundColor:
        COLORS.surface,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      borderRadius: 16,
      padding: 11,
      flexDirection: 'row',
      alignItems: 'center',
    },

    gameIcon: {
      width: 42,
      height: 42,
      borderRadius: 13,
      backgroundColor:
        COLORS.background,
      alignItems: 'center',
      justifyContent:
        'center',
      marginRight: 10,
    },

    gameName: {
      color: COLORS.text,
      fontSize: 12,
      fontWeight: '800',
    },

    rankRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
    },

    gameRank: {
      color:
        COLORS.textSecondary,
      fontSize: 9,
    },

    // EMPTY

    empty: {
      backgroundColor:
        COLORS.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      alignItems: 'center',
      padding: 24,
    },

    emptyIcon: {
      width: 61,
      height: 61,
      borderRadius: 19,
      backgroundColor:
        COLORS.background,
      alignItems: 'center',
      justifyContent:
        'center',
    },

    emptyTitle: {
      color: COLORS.text,
      fontSize: 14,
      fontWeight: '800',
      marginTop: 13,
    },

    emptyText: {
      color:
        COLORS.textSecondary,
      fontSize: 10,
      lineHeight: 16,
      textAlign: 'center',
      maxWidth: 230,
      marginTop: 5,
    },

    createPartyButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor:
        COLORS.primary,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 11,
      marginTop: 15,
    },

    createPartyText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: '800',
    },

    // PARTIES

    partiesContainer: {
      gap: 8,
    },

    party: {
      minHeight: 68,
      backgroundColor:
        COLORS.surface,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      borderRadius: 16,
      padding: 11,
      flexDirection: 'row',
      alignItems: 'center',
    },

    partyIcon: {
      width: 42,
      height: 42,
      borderRadius: 13,
      backgroundColor:
        COLORS.background,
      alignItems: 'center',
      justifyContent:
        'center',
    },

    partyInfo: {
      flex: 1,
      marginLeft: 10,
    },

    partyTitle: {
      color: COLORS.text,
      fontSize: 12,
      fontWeight: '800',
    },

    partyMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },

    partyGame: {
      color:
        COLORS.primaryLight,
      fontSize: 8,
      fontWeight: '700',
      maxWidth: 90,
    },

    partyDot: {
      color:
        COLORS.textSecondary,
      fontSize: 8,
      marginHorizontal: 5,
    },

    partyRank: {
      color:
        COLORS.textSecondary,
      fontSize: 8,
    },

    partyRight: {
      alignItems: 'flex-end',
      marginRight: 8,
    },

    partyPlayers: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },

    partyPlayersText: {
      color: COLORS.text,
      fontSize: 9,
      fontWeight: '700',
    },

    availableText: {
      color:
        COLORS.textSecondary,
      fontSize: 7,
      marginTop: 3,
    },

    // MENU

    menuContainer: {
      backgroundColor:
        COLORS.surface,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      borderRadius: 18,
      overflow: 'hidden',
    },

    menuItem: {
      minHeight: 65,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },

    menuIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor:
        COLORS.background,
      alignItems: 'center',
      justifyContent:
        'center',
    },

    menuText: {
      color: COLORS.text,
      fontSize: 11,
      fontWeight: '700',
    },

    menuDescription: {
      color:
        COLORS.textSecondary,
      fontSize: 8,
      marginTop: 3,
    },

    menuDivider: {
      height: 1,
      backgroundColor:
        COLORS.border,
      marginLeft: 60,
    },

    // LOGOUT

    logout: {
      minHeight: 65,
      marginTop: 12,
      borderWidth: 1,
      borderColor:
        'rgba(239,68,68,0.30)',
      backgroundColor:
        'rgba(239,68,68,0.04)',
      borderRadius: 17,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      gap: 10,
    },

    logoutDisabled: {
      opacity: 0.6,
    },

    logoutIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor:
        'rgba(239,68,68,0.08)',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    logoutText: {
      color: COLORS.danger,
      fontSize: 11,
      fontWeight: '800',
    },

    logoutDescription: {
      color:
        COLORS.textSecondary,
      fontSize: 8,
      marginTop: 3,
    },

    versionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'center',
      gap: 6,
      marginTop: 25,
    },

    versionText: {
      color:
        COLORS.textSecondary,
      fontSize: 8,
      fontWeight: '600',
    },

    // MODAL

    modalOverlay: {
      flex: 1,
      backgroundColor:
        'rgba(0,0,0,0.78)',
      alignItems: 'center',
      justifyContent:
        'center',
      padding: 20,
    },

    modal: {
      width: '100%',
      maxWidth: 430,
      backgroundColor:
        COLORS.surface,
      borderRadius: 24,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      padding: 20,
    },

    modalHeader: {
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems: 'flex-start',
      marginBottom: 18,
    },

    modalEyebrow: {
      color:
        COLORS.primaryLight,
      fontSize: 8,
      fontWeight: '900',
      letterSpacing: 1.2,
    },

    modalTitle: {
      color: COLORS.text,
      fontSize: 21,
      fontWeight: '900',
      marginTop: 3,
    },

    modalSubtitle: {
      color:
        COLORS.textSecondary,
      fontSize: 9,
      marginTop: 4,
    },

    modalClose: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor:
        COLORS.background,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      alignItems: 'center',
      justifyContent:
        'center',
    },

    modalProfile: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:
        COLORS.background,
      borderRadius: 15,
      padding: 11,
      marginBottom: 8,
    },

    modalAvatar: {
      width: 48,
      height: 48,
      borderRadius: 15,
      backgroundColor:
        COLORS.primary,
      alignItems: 'center',
      justifyContent:
        'center',
      marginRight: 10,
    },

    modalAvatarText: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: '900',
    },

    modalProfileName: {
      color: COLORS.text,
      fontSize: 12,
      fontWeight: '800',
    },

    modalProfileUsername: {
      color:
        COLORS.textSecondary,
      fontSize: 9,
      marginTop: 3,
    },

    inputLabel: {
      color:
        COLORS.textSecondary,
      fontSize: 8,
      fontWeight: '900',
      letterSpacing: 1,
      marginBottom: 7,
      marginTop: 12,
    },

    labelRow: {
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems: 'flex-end',
    },

    characterCount: {
      color:
        COLORS.textSecondary,
      fontSize: 8,
      marginBottom: 7,
    },

    editInputContainer: {
      minHeight: 50,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
      backgroundColor:
        COLORS.background,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      borderRadius: 14,
      paddingHorizontal: 13,
    },

    editInput: {
      flex: 1,
      color: COLORS.text,
      fontSize: 12,
      paddingVertical: 12,
    },

    bioInputContainer: {
      minHeight: 90,
      alignItems: 'flex-start',
      paddingTop: 12,
    },

    bioInput: {
      minHeight: 65,
      textAlignVertical: 'top',
      paddingTop: 0,
    },

    modalActions: {
      flexDirection: 'row',
      gap: 9,
      marginTop: 20,
    },

    cancelButton: {
      flex: 1,
      height: 48,
      borderRadius: 14,
      backgroundColor:
        COLORS.background,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      alignItems: 'center',
      justifyContent:
        'center',
    },

    cancelButtonText: {
      color:
        COLORS.textSecondary,
      fontSize: 11,
      fontWeight: '800',
    },

    saveButton: {
      flex: 1,
      height: 48,
      borderRadius: 14,
      backgroundColor:
        COLORS.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'center',
      gap: 6,
    },

    saveDisabled: {
      opacity: 0.5,
    },

    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '900',
    },

    pressed: {
      opacity: 0.7,
    },
  });