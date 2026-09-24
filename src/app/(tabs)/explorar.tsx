import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import PartyCard from '../../components/PartyCard';

import {
  COLORS,
  RADIUS,
  SPACING,
} from '../../constants/theme';

import { useParties } from '../../contexts/PartyContext';

// ==========================================
// FILTROS
// ==========================================

const filters = [
  {
    label: 'Todos',
    icon: 'apps-outline',
  },
  {
    label: 'Competitivo',
    icon: 'trophy-outline',
  },
  {
    label: 'Casual',
    icon: 'happy-outline',
  },
] as const;

// ==========================================
// EXPLORAR
// ==========================================

export default function Explorar() {
  const {
    parties,
    loading,
    refreshParties,
  } = useParties();

  const [search, setSearch] =
    useState('');

  const [
    selectedFilter,
    setSelectedFilter,
  ] = useState<
    'Todos' | 'Competitivo' | 'Casual'
  >('Todos');

  // ========================================
  // FILTRAGEM
  // ========================================

  const filteredParties =
    useMemo(() => {
      const term = search
        .toLowerCase()
        .trim();

      return parties.filter(
        (party) => {
          const matchesSearch =
            term.length === 0 ||
            party.game
              .toLowerCase()
              .includes(term) ||
            party.title
              .toLowerCase()
              .includes(term) ||
            party.mode
              .toLowerCase()
              .includes(term) ||
            party.rank
              .toLowerCase()
              .includes(term) ||
            party.region
              .toLowerCase()
              .includes(term) ||
            party.owner.username
              .toLowerCase()
              .includes(term);

          const matchesFilter =
            selectedFilter ===
              'Todos' ||
            party.style ===
              selectedFilter;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      parties,
      search,
      selectedFilter,
    ]);

  // ========================================
  // ESTATÍSTICAS
  // ========================================

  const openParties =
    filteredParties.filter(
      (party) =>
        party.currentPlayers <
        party.maxPlayers
    ).length;

  const availableSlots =
    filteredParties.reduce(
      (total, party) =>
        total +
        Math.max(
          0,
          party.maxPlayers -
            party.currentPlayers
        ),
      0
    );

  // ========================================
  // LIMPAR PESQUISA
  // ========================================

  function clearSearch() {
    setSearch('');
  }

  // ========================================
  // HEADER
  // ========================================

  function renderHeader() {
    return (
      <>
        {/* ==================================
            TÍTULO
        ================================== */}

        <View style={styles.header}>
          <View>
            <Text
              style={
                styles.eyebrow
              }
            >
              PARTYUP
            </Text>

            <Text
              style={
                styles.title
              }
            >
              Explorar
            </Text>

            <Text
              style={
                styles.subtitle
              }
            >
              Encontre jogadores que
              combinam com o seu estilo.
            </Text>
          </View>

          <View
            style={
              styles.headerIcon
            }
          >
            <Ionicons
              name="compass-outline"
              size={25}
              color={
                COLORS.primaryLight
              }
            />
          </View>
        </View>

        {/* ==================================
            PESQUISA
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
              size={19}
              color={
                COLORS.primaryLight
              }
            />
          </View>

          <TextInput
            value={search}
            onChangeText={
              setSearch
            }
            placeholder="Jogo, rank, modo ou jogador..."
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
              onPress={
                clearSearch
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
            FILTROS
        ================================== */}

        <View
          style={
            styles.filterSection
          }
        >
          <Text
            style={
              styles.filterLabel
            }
          >
            ESTILO DE JOGO
          </Text>

          <View
            style={styles.filters}
          >
            {filters.map(
              (filter) => {
                const selected =
                  selectedFilter ===
                  filter.label;

                return (
                  <Pressable
                    key={
                      filter.label
                    }
                    style={({
                      pressed,
                    }) => [
                      styles.filter,

                      selected &&
                        styles.filterSelected,

                      pressed &&
                        styles.pressed,
                    ]}
                    onPress={() =>
                      setSelectedFilter(
                        filter.label
                      )
                    }
                  >
                    <Ionicons
                      name={
                        filter.icon
                      }
                      size={15}
                      color={
                        selected
                          ? '#FFFFFF'
                          : COLORS.textSecondary
                      }
                    />

                    <Text
                      style={[
                        styles.filterText,

                        selected &&
                          styles.filterTextSelected,
                      ]}
                    >
                      {
                        filter.label
                      }
                    </Text>
                  </Pressable>
                );
              }
            )}
          </View>
        </View>

        {/* ==================================
            RESUMO
        ================================== */}

        <View
          style={
            styles.statsContainer
          }
        >
          <View
            style={styles.stat}
          >
            <View
              style={
                styles.statIcon
              }
            >
              <Ionicons
                name="game-controller-outline"
                size={18}
                color={
                  COLORS.primaryLight
                }
              />
            </View>

            <View>
              <Text
                style={
                  styles.statNumber
                }
              >
                {
                  filteredParties.length
                }
              </Text>

              <Text
                style={
                  styles.statLabel
                }
              >
                encontradas
              </Text>
            </View>
          </View>

          <View
            style={
              styles.statDivider
            }
          />

          <View
            style={styles.stat}
          >
            <View
              style={
                styles.statIcon
              }
            >
              <Ionicons
                name="radio-outline"
                size={18}
                color={
                  COLORS.success
                }
              />
            </View>

            <View>
              <Text
                style={
                  styles.statNumber
                }
              >
                {openParties}
              </Text>

              <Text
                style={
                  styles.statLabel
                }
              >
                abertas
              </Text>
            </View>
          </View>

          <View
            style={
              styles.statDivider
            }
          />

          <View
            style={styles.stat}
          >
            <View
              style={
                styles.statIcon
              }
            >
              <Ionicons
                name="person-add-outline"
                size={18}
                color={
                  COLORS.primaryLight
                }
              />
            </View>

            <View>
              <Text
                style={
                  styles.statNumber
                }
              >
                {availableSlots}
              </Text>

              <Text
                style={
                  styles.statLabel
                }
              >
                vagas
              </Text>
            </View>
          </View>
        </View>

        {/* ==================================
            RESULTADOS
        ================================== */}

        <View
          style={
            styles.resultHeader
          }
        >
          <View>
            <Text
              style={
                styles.resultEyebrow
              }
            >
              JOGUE AGORA
            </Text>

            <Text
              style={
                styles.resultTitle
              }
            >
              Parties encontradas
            </Text>
          </View>

          <View
            style={
              styles.resultCount
            }
          >
            <Text
              style={
                styles.resultCountText
              }
            >
              {
                filteredParties.length
              }
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
        data={filteredParties}
        keyExtractor={(item) =>
          item.id
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
        refreshing={loading}
        onRefresh={
          refreshParties
        }
        keyboardShouldPersistTaps="handled"
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
                styles.loading
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
                Buscando squads...
              </Text>
            </View>
          ) : (
            <View
              style={
                styles.empty
              }
            >
              <View
                style={
                  styles.emptyIcon
                }
              >
                <Ionicons
                  name="search-outline"
                  size={32}
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
                Nenhuma Party encontrada
              </Text>

              <Text
                style={
                  styles.emptyDescription
                }
              >
                Tente pesquisar outro
                jogo, rank ou alterar o
                estilo de partida.
              </Text>

              {(search.length >
                0 ||
                selectedFilter !==
                  'Todos') && (
                <Pressable
                  style={
                    styles.resetButton
                  }
                  onPress={() => {
                    setSearch('');

                    setSelectedFilter(
                      'Todos'
                    );
                  }}
                >
                  <Ionicons
                    name="refresh-outline"
                    size={17}
                    color="#FFFFFF"
                  />

                  <Text
                    style={
                      styles.resetButtonText
                    }
                  >
                    Limpar filtros
                  </Text>
                </Pressable>
              )}
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

      lineHeight: 18,

      marginTop: 5,

      maxWidth: 260,
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
    // PESQUISA
    // ======================================

    searchContainer: {
      minHeight: 56,

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
      width: 37,

      height: 37,

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
    // FILTROS
    // ======================================

    filterSection: {
      marginTop: 19,
    },

    filterLabel: {
      color:
        COLORS.textSecondary,

      fontSize: 9,

      fontWeight: '800',

      letterSpacing: 1.2,

      marginBottom: 10,
    },

    filters: {
      flexDirection: 'row',

      gap: 8,
    },

    filter: {
      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'center',

      gap: 6,

      paddingHorizontal: 13,

      paddingVertical: 9,

      borderRadius:
        RADIUS.full,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,
    },

    filterSelected: {
      backgroundColor:
        COLORS.primary,

      borderColor:
        COLORS.primary,
    },

    filterText: {
      color:
        COLORS.textSecondary,

      fontSize: 11,

      fontWeight: '700',
    },

    filterTextSelected: {
      color: '#FFFFFF',
    },

    pressed: {
      opacity: 0.7,
    },

    // ======================================
    // ESTATÍSTICAS
    // ======================================

    statsContainer: {
      minHeight: 80,

      backgroundColor:
        COLORS.surface,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      borderRadius: 18,

      flexDirection: 'row',

      alignItems: 'center',

      marginTop: 20,

      paddingHorizontal: 13,
    },

    stat: {
      flex: 1,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'center',

      gap: 7,
    },

    statIcon: {
      width: 31,

      height: 31,

      borderRadius: 10,

      backgroundColor:
        COLORS.background,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    statNumber: {
      color: COLORS.text,

      fontSize: 15,

      fontWeight: '900',
    },

    statLabel: {
      color:
        COLORS.textSecondary,

      fontSize: 8,

      marginTop: 1,
    },

    statDivider: {
      width: 1,

      height: 30,

      backgroundColor:
        COLORS.border,
    },

    // ======================================
    // RESULTADOS
    // ======================================

    resultHeader: {
      flexDirection: 'row',

      alignItems: 'flex-end',

      justifyContent:
        'space-between',

      marginTop: 29,

      marginBottom: 15,
    },

    resultEyebrow: {
      color:
        COLORS.primaryLight,

      fontSize: 9,

      fontWeight: '900',

      letterSpacing: 1.2,

      marginBottom: 4,
    },

    resultTitle: {
      color: COLORS.text,

      fontSize: 20,

      fontWeight: '800',

      letterSpacing: -0.4,
    },

    resultCount: {
      minWidth: 31,

      height: 31,

      paddingHorizontal: 9,

      borderRadius: 10,

      backgroundColor:
        'rgba(124,58,237,0.12)',

      borderWidth: 1,

      borderColor:
        COLORS.primary,

      alignItems: 'center',

      justifyContent:
        'center',
    },

    resultCountText: {
      color:
        COLORS.primaryLight,

      fontSize: 12,

      fontWeight: '900',
    },

    // ======================================
    // CARDS
    // ======================================

    cardContainer: {
      marginBottom:
        SPACING.md,
    },

    // ======================================
    // LOADING
    // ======================================

    loading: {
      alignItems: 'center',

      justifyContent:
        'center',

      paddingVertical: 70,
    },

    loadingText: {
      color:
        COLORS.textSecondary,

      fontSize: 12,

      marginTop: 12,
    },

    // ======================================
    // EMPTY
    // ======================================

    empty: {
      alignItems: 'center',

      justifyContent:
        'center',

      backgroundColor:
        COLORS.surface,

      borderRadius: 22,

      borderWidth: 1,

      borderColor:
        COLORS.border,

      padding: 28,
    },

    emptyIcon: {
      width: 68,

      height: 68,

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

      textAlign: 'center',
    },

    emptyDescription: {
      color:
        COLORS.textSecondary,

      fontSize: 12,

      lineHeight: 18,

      textAlign: 'center',

      maxWidth: 250,

      marginTop: 7,
    },

    resetButton: {
      minHeight: 45,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'center',

      gap: 7,

      paddingHorizontal: 17,

      borderRadius: 13,

      backgroundColor:
        COLORS.primary,

      marginTop: 18,
    },

    resetButtonText: {
      color: '#FFFFFF',

      fontSize: 12,

      fontWeight: '800',
    },
  });