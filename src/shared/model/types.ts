export interface User {
  id: string;
  name: string;
  surname?: string;
  username?: string;
  status?: string;
  photo?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface Chat {
  id: string;
  title: string;
  type: "ai" | "people" | "group";
  members: string[];
  avatar?: string;
  lastMessage?: Message;
  unreadCount?: number;
  isPinned?: boolean;
  isMuted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  sender: string;
  senderName?: string;
  text: string;
  timestamp: string;
  type: "text" | "image" | "file" | "system";
  status: "sending" | "sent" | "delivered" | "read";
  replyTo?: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: "image" | "file" | "audio" | "video";
  url: string;
  name: string;
  size: number;
}

export interface Profile {
  name: string;
  surname: string;
  username?: string;
  status: string;
  photo: string;
  bio?: string;
  phone?: string;
  email?: string;
}

export interface ChatState {
  chats: Chat[];
  selectedChatId: string | null;
  messagesByChat: Record<string, Message[]>;
  isLoading: boolean;
  searchQuery: string;
  activeTab: "ai" | "people" | "all";
}

export interface AppState {
  user: User;
  profile: Profile;
  chatState: ChatState;
  isTyping: Record<string, boolean>;
}