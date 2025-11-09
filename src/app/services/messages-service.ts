import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messageList: any[] = [];
  

  constructor() { 
    // Initialize with some dummy messages
    this.messageList = [
      { id: 1, sender: 'Alice Johnson', time: '10:30 AM', isRead: false, isFavorite: true },
      { id: 2, sender: 'Bob Smith', time: 'Yesterday', isRead: true, isFavorite: false },
      { id: 3, sender: 'Charlie Brown', time: '2 days ago', isRead: false, isFavorite: false }
    ];
  }

  getMessagesList(): any[] {
    return this.messageList;
  }

  getConversation(messageId: number): any[] {
    // Dummy conversation data
    return [
      { id: 1, senderId: 'Alice Johnson', text: 'Hello!', time: '10:30 AM', isRead: true },
      { id: 2, senderId: 'me', text: 'Hi Alice, how are you?', time: '10:32 AM', isRead: true },
      { id: 3, senderId: 'Alice Johnson', text: 'I am good, thanks!', time: '10:33 AM', isRead: true }
    ];
  }
}
