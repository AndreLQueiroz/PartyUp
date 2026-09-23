import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from 'react';

import { parties as initialParties } from '../data/parties';
import { Party } from '../types/party';

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

interface PartyContextData {
    parties: Party[];
    addParty: (data: CreatePartyData) => Party;
    getPartyById: (id: string) => Party | undefined;
}

const PartyContext = createContext<PartyContextData | undefined>(
    undefined
);

interface PartyProviderProps {
    children: ReactNode;
}

export function PartyProvider({
    children,
}: PartyProviderProps) {
    const [parties, setParties] =
        useState<Party[]>(initialParties);

    function addParty(data: CreatePartyData): Party {
        const newParty: Party = {
            id: Date.now().toString(),
            game: data.game,
            title: data.title,
            mode: data.mode,
            rank: data.rank,
            region: data.region,
            currentPlayers: 1,
            maxPlayers: data.maxPlayers,
            microphone: data.microphone,
            style: data.style,

            owner: {
                id: 'current-user',
                username: 'Andre',
                level: 1,
            },
        };

        setParties((currentParties) => [
            newParty,
            ...currentParties,
        ]);

        return newParty;
    }

    function getPartyById(id: string) {
        return parties.find((party) => party.id === id);
    }

    return (
        <PartyContext.Provider
            value={{
                parties,
                addParty,
                getPartyById,
            }}
        >
            {children}
        </PartyContext.Provider>
    );
}

export function useParties() {
    const context = useContext(PartyContext);

    if (!context) {
        throw new Error(
            'useParties deve ser usado dentro de PartyProvider'
        );
    }

    return context;
}