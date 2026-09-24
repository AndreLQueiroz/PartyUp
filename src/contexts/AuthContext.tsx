import {
  Session,
  User,
} from '@supabase/supabase-js';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { supabase } from '../services/supabase';

// ==========================================
// TIPAGEM
// ==========================================

interface UpdateProfileData {
  name: string;
  username: string;
  bio?: string;
}

interface AuthContextData {
  user: User | null;

  session: Session | null;

  loading: boolean;

  signIn: (
    email: string,
    password: string
  ) => Promise<string | null>;

  signUp: (
    name: string,
    username: string,
    email: string,
    password: string
  ) => Promise<string | null>;

  signOut: () => Promise<string | null>;

  updateProfile: (
    data: UpdateProfileData
  ) => Promise<string | null>;
}

// ==========================================
// CONTEXTO
// ==========================================

const AuthContext =
  createContext<AuthContextData | undefined>(
    undefined
  );

// ==========================================
// PROVIDER
// ==========================================

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] =
    useState<Session | null>(null);

  const [loading, setLoading] =
    useState(true);

  const user =
    session?.user ?? null;

  // ========================================
  // SESSÃO
  // ========================================

  useEffect(() => {
    async function loadSession() {
      try {
        const {
          data,
          error,
        } =
          await supabase.auth.getSession();

        if (error) {
          console.error(
            '❌ Erro carregando sessão:',
            error
          );
        }

        setSession(
          data.session
        );
      } catch (error) {
        console.error(
          '❌ Erro inesperado:',
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadSession();

    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        (event, currentSession) => {
          console.log(
            '🔐 Auth:',
            event
          );

          setSession(
            currentSession
          );

          setLoading(false);
        }
      );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ========================================
  // LOGIN
  // ========================================

  async function signIn(
    email: string,
    password: string
  ): Promise<string | null> {
    try {
      const {
        error,
      } =
        await supabase.auth.signInWithPassword({
          email:
            email
              .trim()
              .toLowerCase(),

          password,
        });

      if (error) {
        console.error(
          '❌ Login:',
          error.message
        );

        return error.message;
      }

      return null;
    } catch (error) {
      console.error(
        '❌ Login inesperado:',
        error
      );

      return 'Erro inesperado ao realizar login.';
    }
  }

  // ========================================
  // CADASTRO
  // ========================================

  async function signUp(
    name: string,
    username: string,
    email: string,
    password: string
  ): Promise<string | null> {
    try {
      const cleanUsername =
        username
          .trim()
          .toLowerCase();

      const {
        data,
        error,
      } =
        await supabase.auth.signUp({
          email:
            email
              .trim()
              .toLowerCase(),

          password,

          options: {
            data: {
              name:
                name.trim(),

              username:
                cleanUsername,
            },
          },
        });

      if (error) {
        return error.message;
      }

      if (!data.user) {
        return 'Não foi possível criar o usuário.';
      }

      // ====================================
      // PROFILE
      // ====================================

      if (data.session) {
        const {
          error: profileError,
        } =
          await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,

              full_name:
                name.trim(),

              username:
                cleanUsername,
            });

        if (profileError) {
          console.error(
            '❌ Profile:',
            profileError.message
          );

          await supabase.auth.signOut();

          return profileError.message;
        }
      }

      // ====================================
      // VOLTA PARA LOGIN
      // ====================================

      if (data.session) {
        await supabase.auth.signOut();
      }

      return null;
    } catch (error) {
      console.error(
        '❌ Cadastro inesperado:',
        error
      );

      return 'Erro inesperado ao criar conta.';
    }
  }

  // ========================================
  // ATUALIZAR PERFIL
  // ========================================

  async function updateProfile({
    name,
    username,
    bio,
  }: UpdateProfileData): Promise<string | null> {
    if (!user) {
      return 'Usuário não autenticado.';
    }

    try {
      const cleanName =
        name.trim();

      const cleanUsername =
        username
          .trim()
          .toLowerCase();

      if (!cleanName) {
        return 'Informe seu nome.';
      }

      if (!cleanUsername) {
        return 'Informe um username.';
      }

      // ====================================
      // ATUALIZA AUTH METADATA
      // ====================================

      const {
        data: authData,
        error: authError,
      } =
        await supabase.auth.updateUser({
          data: {
            name:
              cleanName,

            username:
              cleanUsername,

            bio:
              bio?.trim() || '',
          },
        });

      if (authError) {
        console.error(
          '❌ Atualizando Auth:',
          authError.message
        );

        return authError.message;
      }

      // ====================================
      // ATUALIZA PROFILE
      // ====================================

      const {
        error: profileError,
      } =
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,

            full_name:
              cleanName,

            username:
              cleanUsername,
          });

      if (profileError) {
        console.error(
          '❌ Atualizando profile:',
          profileError.message
        );

        return profileError.message;
      }

      // ====================================
      // ATUALIZA SESSION LOCAL
      // ====================================

      if (authData.user) {
        setSession(
          (current) => {
            if (!current) {
              return current;
            }

            return {
              ...current,

              user:
                authData.user,
            };
          }
        );
      }

      console.log(
        '✅ Perfil atualizado'
      );

      return null;
    } catch (error) {
      console.error(
        '❌ Update profile:',
        error
      );

      return 'Erro inesperado ao atualizar perfil.';
    }
  }

  // ========================================
  // LOGOUT
  // ========================================

  async function signOut(): Promise<string | null> {
    try {
      console.log(
        '🚪 Fazendo logout...'
      );

      const {
        error,
      } =
        await supabase.auth.signOut();

      if (error) {
        console.error(
          '❌ Logout:',
          error.message
        );

        return error.message;
      }

      // Garante atualização imediata da UI.
      setSession(null);

      console.log(
        '✅ Logout realizado'
      );

      return null;
    } catch (error) {
      console.error(
        '❌ Logout inesperado:',
        error
      );

      return 'Erro inesperado ao sair da conta.';
    }
  }

  // ========================================
  // PROVIDER
  // ========================================

  return (
    <AuthContext.Provider
      value={{
        user,

        session,

        loading,

        signIn,

        signUp,

        signOut,

        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// HOOK
// ==========================================

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser usado dentro de AuthProvider'
    );
  }

  return context;
}