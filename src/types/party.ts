export interface Party {
    id: string;
    game: string;
    title: string;
    mode: string;
    rank: string;
    region: string;
    currentPlayers: number;
    maxPlayers: number;
    microphone: boolean;
    style: 'Casual' | 'Competitivo';
    owner: {
        id: string;
        username: string;
        level: number;
    };
}