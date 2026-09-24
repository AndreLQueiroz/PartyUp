import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Party } from '../types/party';
import { supabase } from '../services/supabase';
import { useAuth } from './AuthContext';

// ==========================================
// DADOS NECESSÁRIOS PARA CRIAR UMA PARTY
// ==========================================

interface CreatePartyData {
  game: string;
  title: string;
  mode: string;
  rank: string;
  region: string;
  maxPlayers: number;
  microphone: boolean;
  style: 'Casual' | 'Competitivo';
}

// ==========================================
// TIPO DO CONTEXTO
// ==========================================

interface PartyContextData {
  parties: Party[];

  loading: boolean;

  addParty: (
    data: CreatePartyData
  ) => Promise<Party | null>;

  getPartyById: (
    id: string
  ) => Party | undefined;

  refreshParties: () => Promise<void>;

  deleteParty: (
    id: string
  ) => Promise<boolean>;
}

// ==========================================
// CONTEXTO
// ==========================================

const PartyContext =
  createContext<PartyContextData | undefined>(
    undefined
  );

// ==========================================
// PROVIDER
// ==========================================

export function PartyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();

  const [parties, setParties] =
    useState<Party[]>([]);

  const [loading, setLoading] =
    useState(false);

  // ========================================
  // QUANDO USUÁRIO LOGAR
  // ========================================

  useEffect(() => {
    if (user) {
      console.log(
        '👤 Usuário autenticado. Carregando parties...'
      );

      refreshParties();
    } else {
      console.log(
        '🚪 Usuário não autenticado.'
      );

      setParties([]);
    }
  }, [user]);

  // ========================================
  // BUSCAR PARTIES
  // ========================================

  async function refreshParties() {
    try {
      setLoading(true);

      console.log(
        '🎮 Buscando parties...'
      );

      // ======================================
      // BUSCA SOMENTE A TABELA PARTIES
      // ======================================

      const {
        data: partiesData,
        error: partiesError,
      } = await supabase
        .from('parties')
        .select('*')
        .order(
          'created_at',
          {
            ascending: false,
          }
        );

      // ======================================
      // ERRO AO BUSCAR PARTIES
      // ======================================

      if (partiesError) {
        console.error(
          '❌ Erro buscando parties:',
          partiesError
        );

        return;
      }

      console.log(
        '📦 Parties recebidas:',
        partiesData
      );

      // ======================================
      // NÃO EXISTE NENHUMA PARTY
      // ======================================

      if (
        !partiesData ||
        partiesData.length === 0
      ) {
        console.log(
          'ℹ️ Nenhuma Party encontrada.'
        );

        setParties([]);

        return;
      }

      // ======================================
      // PEGA TODOS OS OWNER_ID
      // ======================================

      const ownerIds = Array.from(
        new Set(
          partiesData
            .map(
              (party: any) =>
                party.owner_id
            )
            .filter(Boolean)
        )
      );

      console.log(
        '👤 IDs dos donos:',
        ownerIds
      );

      // ======================================
      // BUSCA OS PROFILES SEPARADAMENTE
      // ======================================

      let profilesData: any[] = [];

      if (ownerIds.length > 0) {
        const {
          data,
          error,
        } = await supabase
          .from('profiles')
          .select(
            'id, username, level'
          )
          .in(
            'id',
            ownerIds
          );

        // ====================================
        // ERRO AO BUSCAR PROFILE
        // ====================================

        if (error) {
          console.error(
            '⚠️ Erro buscando profiles:',
            error
          );
        } else {
          profilesData =
            data ?? [];
        }
      }

      console.log(
        '👥 Profiles encontrados:',
        profilesData
      );

      // ======================================
      // JUNTA PARTY + PROFILE
      // ======================================

      const formatted: Party[] =
        partiesData.map(
          (item: any) => {
            // Procura o dono da Party
            const owner =
              profilesData.find(
                (profile: any) =>
                  profile.id ===
                  item.owner_id
              );

            return {
              id:
                item.id,

              game:
                item.game,

              title:
                item.title,

              mode:
                item.mode,

              rank:
                item.rank,

              region:
                item.region,

              currentPlayers:
                item.current_players,

              maxPlayers:
                item.max_players,

              microphone:
                item.microphone,

              style:
                item.style,

              owner: {
                id:
                  item.owner_id,

                username:
                  owner?.username ??
                  'Jogador',

                level:
                  owner?.level ??
                  1,
              },
            };
          }
        );

      console.log(
        '✅ Parties formatadas:',
        formatted
      );

      // ======================================
      // SALVA NO CONTEXTO
      // ======================================

      setParties(
        formatted
      );
    } catch (error) {
      console.error(
        '❌ Erro inesperado buscando parties:',
        error
      );
    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // CRIAR PARTY
  // ========================================

  async function addParty(
    data: CreatePartyData
  ): Promise<Party | null> {
    // ======================================
    // VERIFICA LOGIN
    // ======================================

    if (!user) {
      console.error(
        '❌ Não é possível criar Party sem estar logado.'
      );

      return null;
    }

    try {
      console.log(
        '🎮 Criando nova Party...'
      );

      console.log(
        '👤 Owner:',
        user.id
      );

      // ======================================
      // INSERT NO SUPABASE
      // ======================================

      const {
        data: inserted,
        error,
      } = await supabase
        .from('parties')
        .insert({
          owner_id:
            user.id,

          game:
            data.game,

          title:
            data.title,

          mode:
            data.mode,

          rank:
            data.rank,

          region:
            data.region,

          current_players:
            1,

          max_players:
            data.maxPlayers,

          microphone:
            data.microphone,

          style:
            data.style,
        })
        .select()
        .single();

      // ======================================
      // ERRO AO CRIAR
      // ======================================

      if (error) {
        console.error(
          '❌ Erro criando Party:',
          error
        );

        return null;
      }

      if (!inserted) {
        console.error(
          '❌ Supabase não retornou a Party criada.'
        );

        return null;
      }

      console.log(
        '✅ Party criada no Supabase:',
        inserted
      );

      // ======================================
      // MONTA A PARTY LOCAL
      // ======================================

      const newParty: Party = {
        id:
          inserted.id,

        game:
          inserted.game,

        title:
          inserted.title,

        mode:
          inserted.mode,

        rank:
          inserted.rank,

        region:
          inserted.region,

        currentPlayers:
          inserted.current_players,

        maxPlayers:
          inserted.max_players,

        microphone:
          inserted.microphone,

        style:
          inserted.style,

        owner: {
          id:
            user.id,

          username:
            user.user_metadata?.username ??
            'Você',

          level:
            user.user_metadata?.level ??
            1,
        },
      };

      // ======================================
      // ATUALIZA LISTA IMEDIATAMENTE
      // ======================================

      setParties(
        (current) => [
          newParty,
          ...current,
        ]
      );

      console.log(
        '🔄 Lista local atualizada.'
      );

      return newParty;
    } catch (error) {
      console.error(
        '❌ Erro inesperado criando Party:',
        error
      );

      return null;
    }
  }

  // ========================================
  // BUSCAR PARTY PELO ID
  // ========================================

  function getPartyById(
    id: string
  ): Party | undefined {
    return parties.find(
      (party) =>
        party.id === id
    );
  }

  // ========================================
  // EXCLUIR PARTY
  // ========================================

  async function deleteParty(
    id: string
  ): Promise<boolean> {
    // ======================================
    // VERIFICA LOGIN
    // ======================================

    if (!user) {
      console.error(
        '❌ Não é possível excluir Party sem estar logado.'
      );

      return false;
    }

    try {
      console.log(
        '🗑️ Excluindo Party:',
        id
      );

      // ======================================
      // DELETE NO SUPABASE
      // ======================================

      const {
        error,
      } = await supabase
        .from('parties')
        .delete()
        .eq(
          'id',
          id
        )
        .eq(
          'owner_id',
          user.id
        );

      // ======================================
      // ERRO
      // ======================================

      if (error) {
        console.error(
          '❌ Erro excluindo Party:',
          error
        );

        return false;
      }

      // ======================================
      // REMOVE DA LISTA LOCAL
      // ======================================

      setParties(
        (current) =>
          current.filter(
            (party) =>
              party.id !== id
          )
      );

      console.log(
        '✅ Party excluída.'
      );

      return true;
    } catch (error) {
      console.error(
        '❌ Erro inesperado excluindo Party:',
        error
      );

      return false;
    }
  }

  // ========================================
  // PROVIDER
  // ========================================

  return (
    <PartyContext.Provider
      value={{
        parties,

        loading,

        addParty,

        getPartyById,

        refreshParties,

        deleteParty,
      }}
    >
      {children}
    </PartyContext.Provider>
  );
}

// ==========================================
// HOOK
// ==========================================

export function useParties() {
  const context =
    useContext(
      PartyContext
    );

  if (!context) {
    throw new Error(
      'useParties deve ser usado dentro de PartyProvider'
    );
  }

  return context;
}