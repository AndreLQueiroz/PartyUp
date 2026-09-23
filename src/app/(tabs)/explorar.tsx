import { Ionicons } from '@expo/vector-icons';
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
import { router } from 'expo-router';

import PartyCard from '../../components/PartyCard';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { parties } from '../../data/parties';
import { useParties } from '../../contexts/PartyContext';

const filters = ['Todos', 'Competitivo', 'Casual'];

export default function Explorar() {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filteredParties = useMemo(() => {
    return parties.filter((party) => {
      const term = search.toLowerCase().trim();

      const matchesSearch =
        party.game.toLowerCase().includes(term) ||
        party.title.toLowerCase().includes(term) ||
        party.owner.username.toLowerCase().includes(term);

      const matchesFilter =
        selectedFilter === 'Todos' ||
        party.style === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, selectedFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredParties}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Explorar</Text>

              <Text style={styles.subtitle}>
                Encontre a party ideal para você.
              </Text>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={20}
                color={COLORS.textSecondary}
              />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar jogo, party ou jogador..."
                placeholderTextColor={COLORS.textSecondary}
                style={styles.input}
              />

              {search.length > 0 && (
                <Pressable onPress={() => setSearch('')}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={COLORS.textSecondary}
                  />
                </Pressable>
              )}
            </View>

            <View style={styles.filters}>
              {filters.map((filter) => {
                const selected = selectedFilter === filter;

                return (
                  <Pressable
                    key={filter}
                    style={[
                      styles.filter,
                      selected && styles.filterSelected,
                    ]}
                    onPress={() => setSelectedFilter(filter)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        selected && styles.filterTextSelected,
                      ]}
                    >
                      {filter}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>
                Parties encontradas
              </Text>

              <Text style={styles.resultCount}>
                {filteredParties.length}
              </Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <PartyCard
              party={item}
              onPress={() =>
                router.push({
                  pathname: '/party/[id]',
                  params: { id: item.id },
                })
              }
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="search-outline"
              size={50}
              color={COLORS.textSecondary}
            />

            <Text style={styles.emptyTitle}>
              Nenhuma party encontrada
            </Text>

            <Text style={styles.emptyDescription}>
              Tente pesquisar outro jogo ou alterar o filtro.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },

  header: {
    marginBottom: SPACING.lg,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 5,
  },

  searchContainer: {
    height: 52,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },

  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
  },

  filters: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },

  filter: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  filterSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  filterText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },

  filterTextSelected: {
    color: '#FFFFFF',
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },

  resultTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
  },

  resultCount: {
    color: COLORS.primaryLight,
    fontSize: 13,
    fontWeight: '700',
  },

  cardContainer: {
    marginBottom: SPACING.md,
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 70,
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: SPACING.md,
  },

  emptyDescription: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
});