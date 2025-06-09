// Mock data for the AI Chat Frontend application

export const mockUser = {
  id: 'user-1',
  name: 'John Doe',
  avatar: '/api/placeholder/40/40',
  status: 'online'
};

export const mockAIBots = [
  {
    id: 'ai-1',
    name: 'ChatGPT Assistant',
    description: 'General purpose AI assistant',
    avatar: '/api/placeholder/40/40',
    model: 'gpt-3.5-turbo',
    capabilities: ['text generation', 'question answering', 'creative writing']
  },
  {
    id: 'ai-2',
    name: 'Code Helper',
    description: 'Programming and development assistant',
    avatar: '/api/placeholder/40/40',
    model: 'gpt-4',
    capabilities: ['code generation', 'debugging', 'code review']
  },
  {
    id: 'ai-3',
    name: 'Travel Planner',
    description: 'Travel and tourism assistant',
    avatar: '/api/placeholder/40/40',
    model: 'gpt-3.5-turbo',
    capabilities: ['travel planning', 'recommendations', 'booking assistance']
  }
];

export const mockUsers = [
  {
    id: 'user-2',
    name: 'Alice Smith',
    avatar: '/api/placeholder/40/40',
    status: 'online',
    lastSeen: '2024-01-15T10:30:00Z'
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    avatar: '/api/placeholder/40/40',
    status: 'offline',
    lastSeen: '2024-01-15T09:15:00Z'
  },
  {
    id: 'user-4',
    name: 'Carol Williams',
    avatar: '/api/placeholder/40/40',
    status: 'away',
    lastSeen: '2024-01-15T08:45:00Z'
  }
];

export const mockChats = [
  {
    id: 'chat-1',
    type: 'ai',
    name: 'ChatGPT Assistant',
    avatar: '/api/placeholder/40/40',
    participants: ['user-1', 'ai-1'],
    lastMessage: {
      id: 'msg-1',
      chatId: 'chat-1',
      senderId: 'ai-1',
      senderName: 'ChatGPT Assistant',
      content: 'Hello! How can I help you today?',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'text',
      status: 'read'
    },
    unreadCount: 0,
    isPinned: true,
    isMuted: false,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'chat-2',
    type: 'user',
    name: 'Alice Smith',
    avatar: '/api/placeholder/40/40',
    participants: ['user-1', 'user-2'],
    lastMessage: {
      id: 'msg-2',
      chatId: 'chat-2',
      senderId: 'user-2',
      senderName: 'Alice Smith',
      content: 'Hey! Are we still meeting for lunch?',
      timestamp: '2024-01-15T10:15:00Z',
      type: 'text',
      status: 'delivered'
    },
    unreadCount: 2,
    isPinned: false,
    isMuted: false,
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-15T10:15:00Z'
  },
  {
    id: 'chat-3',
    type: 'ai',
    name: 'Code Helper',
    avatar: '/api/placeholder/40/40',
    participants: ['user-1', 'ai-2'],
    lastMessage: {
      id: 'msg-3',
      chatId: 'chat-3',
      senderId: 'user-1',
      senderName: 'John Doe',
      content: 'Can you help me debug this React component?',
      timestamp: '2024-01-15T09:45:00Z',
      type: 'text',
      status: 'read'
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:45:00Z'
  }
];

export const mockMessages = {
  'chat-1': [
    {
      id: 'msg-1-1',
      chatId: 'chat-1',
      senderId: 'user-1',
      senderName: 'John Doe',
      content: 'Hello! I need help with a React project.',
      timestamp: '2024-01-15T10:00:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-1-2',
      chatId: 'chat-1',
      senderId: 'ai-1',
      senderName: 'ChatGPT Assistant',
      content: 'Hello! I\'d be happy to help you with your React project. What specific issue are you facing?',
      timestamp: '2024-01-15T10:01:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-1-3',
      chatId: 'chat-1',
      senderId: 'user-1',
      senderName: 'John Doe',
      content: 'I\'m having trouble with state management in a complex component.',
      timestamp: '2024-01-15T10:02:00Z',
      type: 'text',
      status: 'read'
    }
  ],
  'chat-2': [
    {
      id: 'msg-2-1',
      chatId: 'chat-2',
      senderId: 'user-2',
      senderName: 'Alice Smith',
      content: 'Hey John! How are you doing?',
      timestamp: '2024-01-15T09:30:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-2-2',
      chatId: 'chat-2',
      senderId: 'user-1',
      senderName: 'John Doe',
      content: 'Hi Alice! I\'m doing great, thanks for asking.',
      timestamp: '2024-01-15T09:35:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-2-3',
      chatId: 'chat-2',
      senderId: 'user-2',
      senderName: 'Alice Smith',
      content: 'Hey! Are we still meeting for lunch?',
      timestamp: '2024-01-15T10:15:00Z',
      type: 'text',
      status: 'delivered'
    }
  ],
  'chat-3': [
    {
      id: 'msg-3-1',
      chatId: 'chat-3',
      senderId: 'user-1',
      senderName: 'John Doe',
      content: 'Can you help me debug this React component?',
      timestamp: '2024-01-15T09:45:00Z',
      type: 'text',
      status: 'read'
    }
  ]
};

