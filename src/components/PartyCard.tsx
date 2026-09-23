import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS, RADIUS, SPACING } from '../constants/theme';
import { Party } from '../types/party';

interface PartyCardProps {
  party: Party;
  onPress?: () => void;
}

export default function PartyCard({
  party,
  onPress,
}: PartyCardProps) {
  const availableSlots = party.maxPlayers - party.currentPlayers;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.gameIcon}>
          <Ionicons
            name="game-controller"
            size={24}
            color={COLORS.primaryLight}
          />
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.game}>{party.game}</Text>

          <Text style={styles.title}>
            {party.title}
          </Text>
        </View>

        <View
          style={[
            styles.status,
            {
              backgroundColor:
                availableSlots > 0
                  ? 'rgba(34,197,94,0.15)'
                  : 'rgba(239,68,68,0.15)',
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  availableSlots > 0
                    ? COLORS.success
                    : COLORS.danger,
              },
            ]}
          />

          <Text
            style={[
              styles.statusText,
              {
                color:
                  availableSlots > 0
                    ? COLORS.success
                    : COLORS.danger,
              },
            ]}
          >
            {availableSlots > 0 ? 'Aberta' : 'Cheia'}
          </Text>
        </View>
      </View>

      <View style={styles.tags}>
        <View style={styles.tag}>
          <Ionicons
            name="trophy-outline"
            size={14}
            color={COLORS.textSecondary}
          />

          <Text style={styles.tagText}>
            {party.rank}
          </Text>
        </View>

        <View style={styles.tag}>
          <Ionicons
            name="people-outline"
            size={14}
            color={COLORS.textSecondary}
          />

          <Text style={styles.tagText}>
            {party.currentPlayers}/{party.maxPlayers}
          </Text>
        </View>

        {party.microphone && (
          <View style={styles.tag}>
            <Ionicons
              name="mic-outline"
              size={14}
              color={COLORS.textSecondary}
            />

            <Text style={styles.tagText}>Mic</Text>
          </View>
        )}

        <View style={styles.tag}>
          <Ionicons
            name="location-outline"
            size={14}
            color={COLORS.textSecondary}
          />

          <Text style={styles.tagText}>
            {party.region}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.ownerLabel}>
            Líder da Party
          </Text>

          <Text style={styles.owner}>
            @{party.owner.username}
          </Text>
        </View>

        <View style={styles.players}>
          <Ionicons
            name="person-add-outline"
            size={16}
            color={COLORS.primaryLight}
          />

          <Text style={styles.playersText}>
            {availableSlots} {availableSlots === 1 ? 'vaga' : 'vagas'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },

  cardPressed: {
    opacity: 0.8,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  gameIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },

  game: {
    color: COLORS.primaryLight,
    fontSize: 13,
    fontWeight: '600',
  },

  title: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 2,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },

  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },

  tagText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ownerLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },

  owner: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },

  players: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  playersText: {
    color: COLORS.primaryLight,
    fontSize: 12,
    fontWeight: '600',
  },
});