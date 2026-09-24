export interface Chat {
  id: string;
  name: string;
  game: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  userId: string;
  username: string;
  text: string;
  time: string;
}

export const chats: Chat[] = [
  {
    id: '1',
    name: 'Ranked sem estresse',
    game: 'Valorant',
    lastMessage: 'Bora fechar a party?',
    time: '12:40',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Flex pra subir elo',
    game: 'League of Legends',
    lastMessage: 'Vou entrar em 5 minutos',
    time: '11:25',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Survival tranquilo',
    game: 'Minecraft',
    lastMessage: 'Servidor já está aberto',
    time: 'Ontem',
    unread: 0,
    online: false,
  },
];

export const initialMessages: Message[] = [
  {
    id: '1',
    chatId: '1',
    userId: '2',
    username: 'ShadowBR',
    text: 'Fala mano, vai jogar?',
    time: '12:35',
  },
  {
    id: '2',
    chatId: '1',
    userId: 'current-user',
    username: 'Andre',
    text: 'Vou sim',
    time: '12:37',
  },
  {
    id: '3',
    chatId: '1',
    userId: '2',
    username: 'ShadowBR',
    text: 'Bora fechar a party?',
    time: '12:40',
  },
];