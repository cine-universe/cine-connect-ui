export interface Notification {
  id: number;
  type: string;
  message: string;
  timestamp: Date;
  avatarUrl: string;
  read: boolean;
}