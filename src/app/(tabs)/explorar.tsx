import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PartyUp</Text>
      <Text style={styles.text}>Tela inicial do aplicativo.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
  },

  text: {
    color: COLORS.textSecondary,
    marginTop: 8,
  },
});