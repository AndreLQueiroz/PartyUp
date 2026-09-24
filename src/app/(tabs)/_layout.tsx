import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { COLORS } from '../../constants/theme';

// ==========================================
// TABS LAYOUT
// ==========================================

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor:
          COLORS.primaryLight,

        tabBarInactiveTintColor:
          COLORS.textSecondary,

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginTop: 2,
        },

        tabBarStyle: {
          position: 'absolute',

          height:
            Platform.OS === 'ios'
              ? 88
              : 74,

          paddingTop: 8,

          paddingBottom:
            Platform.OS === 'ios'
              ? 22
              : 9,

          paddingHorizontal: 8,

          backgroundColor:
            COLORS.surface,

          borderTopWidth: 1,

          borderTopColor:
            COLORS.border,

          elevation: 20,

          shadowColor: '#000',

          shadowOffset: {
            width: 0,
            height: -4,
          },

          shadowOpacity: 0.2,

          shadowRadius: 12,
        },

        tabBarItemStyle: {
          paddingTop: 2,
        },
      }}
    >
      {/* ==================================
          HOME
      ================================== */}

      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              focused={focused}
              color={color}
              activeIcon="home"
              inactiveIcon="home-outline"
            />
          ),
        }}
      />

      {/* ==================================
          EXPLORAR
      ================================== */}

      <Tabs.Screen
        name="explorar"
        options={{
          title: 'Explorar',

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              focused={focused}
              color={color}
              activeIcon="compass"
              inactiveIcon="compass-outline"
            />
          ),
        }}
      />

      {/* ==================================
          CRIAR PARTY
      ================================== */}

      <Tabs.Screen
        name="criar"
        options={{
          title: 'Criar',

          tabBarLabelStyle: {
            fontSize: 10,

            fontWeight: '800',

            color:
              COLORS.primaryLight,

            marginTop: 4,
          },

          tabBarIcon: ({
            focused,
          }) => (
            <View
              style={[
                styles.createOuter,

                focused &&
                  styles.createOuterFocused,
              ]}
            >
              <View
                style={
                  styles.createButton
                }
              >
                <Ionicons
                  name="add"
                  size={29}
                  color="#FFFFFF"
                />
              </View>
            </View>
          ),
        }}
      />

      {/* ==================================
          CHATS
      ================================== */}

      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              focused={focused}
              color={color}
              activeIcon="chatbubble"
              inactiveIcon="chatbubble-outline"
            />
          ),
        }}
      />

      {/* ==================================
          PERFIL
      ================================== */}

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              focused={focused}
              color={color}
              activeIcon="person"
              inactiveIcon="person-outline"
            />
          ),
        }}
      />
    </Tabs>
  );
}

// ==========================================
// ÍCONE NORMAL DA TAB
// ==========================================

function TabIcon({
  focused,
  color,
  activeIcon,
  inactiveIcon,
}: {
  focused: boolean;

  color: string;

  activeIcon:
    keyof typeof Ionicons.glyphMap;

  inactiveIcon:
    keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View
      style={[
        styles.tabIconContainer,

        focused &&
          styles.tabIconActive,
      ]}
    >
      <Ionicons
        name={
          focused
            ? activeIcon
            : inactiveIcon
        }
        size={21}
        color={color}
      />

      {focused && (
        <View
          style={
            styles.activeDot
          }
        />
      )}
    </View>
  );
}

// ==========================================
// ESTILOS
// ==========================================

const styles = StyleSheet.create({
  // ========================================
  // ÍCONES NORMAIS
  // ========================================

  tabIconContainer: {
    width: 42,

    height: 32,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent:
      'center',

    position: 'relative',
  },

  tabIconActive: {
    backgroundColor:
      'rgba(124,58,237,0.10)',
  },

  activeDot: {
    position: 'absolute',

    bottom: -3,

    width: 4,

    height: 4,

    borderRadius: 4,

    backgroundColor:
      COLORS.primaryLight,
  },

  // ========================================
  // BOTÃO CRIAR
  // ========================================

  createOuter: {
    width: 62,

    height: 62,

    borderRadius: 22,

    backgroundColor:
      COLORS.background,

    alignItems: 'center',

    justifyContent:
      'center',

    marginTop: -27,

    borderWidth: 5,

    borderColor:
      COLORS.background,

    elevation: 10,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.3,

    shadowRadius: 8,
  },

  createOuterFocused: {
    transform: [
      {
        scale: 1.05,
      },
    ],
  },

  createButton: {
    width: 52,

    height: 52,

    borderRadius: 18,

    backgroundColor:
      COLORS.primary,

    alignItems: 'center',

    justifyContent:
      'center',

    borderWidth: 1,

    borderColor:
      COLORS.primaryLight,

    elevation: 8,

    shadowColor:
      COLORS.primary,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.4,

    shadowRadius: 10,
  },
});