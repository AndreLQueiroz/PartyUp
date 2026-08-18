import { StyleSheet, Text, View } from 'react-native';

export default function PartyCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Festa do mês</Text>
      <Text style={styles.subtitle}>Rua das Flores • 22h</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>+120 confirmados</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    gap: 8,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#444',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#e5e5e5',
  },
  badgeText: {
    fontSize: 12,
    color: '#222',
  },
});
