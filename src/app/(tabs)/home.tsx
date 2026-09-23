import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PartyCard from '../../components/PartyCard';
import { COLORS, SPACING } from '../../constants/theme';
import { parties } from '../../data/parties';
import { router } from 'expo-router';
import { useParties } from '../../contexts/PartyContext';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={parties}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.logo}>
                  Party<Text style={styles.logoHighlight}>Up</Text>
                </Text>

                <Text style={styles.subtitle}>
                  Never Play Alone.
                </Text>
              </View>

              <View style={styles.notification}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={COLORS.text}
                />

                <View style={styles.notificationDot} />
              </View>
            </View>

            <View style={styles.welcome}>
              <Text style={styles.welcomeText}>
                Bora jogar? 🎮
              </Text>

              <Text style={styles.description}>
                Encontre jogadores e entre em uma party.
              </Text>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Parties abertas
              </Text>

              <View style={styles.online}>
                <View style={styles.onlineDot} />

                <Text style={styles.onlineText}>
                  {parties.length} disponíveis
                </Text>
              </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },

  logo: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },

  logoHighlight: {
    color: COLORS.primary,
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },

  notification: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },

  welcome: {
    marginBottom: SPACING.xl,
  },

  welcomeText: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '700',
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: SPACING.sm,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
  },

  online: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },

  onlineText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },

  cardContainer: {
    marginBottom: SPACING.md,
  },
});