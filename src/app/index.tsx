import { router } from 'expo-router';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS } from '../constants/theme';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>P</Text>
        </View>

        <Text style={styles.title}>
          PARTY<Text style={styles.highlight}>UP</Text>
        </Text>

        <Text style={styles.slogan}>NEVER PLAY ALONE</Text>

        <Text style={styles.description}>
          Encontre jogadores, forme sua party e jogue junto.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  logo: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  logoText: {
    color: COLORS.text,
    fontSize: 48,
    fontWeight: 'bold',
  },

  title: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: 'bold',
  },

  highlight: {
    color: COLORS.primary,
  },

  slogan: {
    color: COLORS.primaryLight,
    fontSize: 11,
    letterSpacing: 4,
    marginTop: 8,
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 24,
  },

  button: {
    backgroundColor: COLORS.success,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 36,
  },

  buttonText: {
    color: '#08100B',
    fontWeight: 'bold',
  },
});