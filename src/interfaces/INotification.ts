export interface INotification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  chatId?: string;
  type?: 'post' | 'chat';
}
