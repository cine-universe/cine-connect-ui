import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Message {
  id?: number | string;
  profileUrl?: string;
  sender: string;
  time: string;
  isRead?: boolean;
  isFavorite?: boolean;
  isArchived?: boolean;
}

@Component({
  selector: 'app-messagelist',
  imports: [NgClass],
  templateUrl: './messagelist.html',
  styleUrl: './messagelist.scss',
})
export class Messagelist implements OnInit {

  @Output() messageSelected = new EventEmitter<Message>();

  private _selectedCategory = 'All';
  @Input()
  set selectedCategory(value: string) {
    if (this._selectedCategory !== value) {
      this._selectedCategory = value || 'All';
      this.filterMessages();
    }
  }
  get selectedCategory(): string {
    return this._selectedCategory;
  }

  // new: search input from parent
  private _searchQuery = '';
  @Input()
  set searchQuery(value: string) {
    const normalized = (value || '').trim();
    if (this._searchQuery !== normalized) {
      this._searchQuery = normalized;
      this.filterMessages();
    }
  }
  get searchQuery(): string { return this._searchQuery; }

  // internal message store (could be replaced by an @Input() later)
  messages: Message[] = [];
  filterMessage: Message[] = [];

  selectedMessage: Message | null = null;

  selectMessage(message: Message) {
    if (this.selectedMessage !== message) {
      this.selectedMessage = message;
      this.messageSelected.emit(message);
    }
  }

  ngOnInit() {
    // seed messages (replace with service call when available)
    this.messages = [
      { id: 1, profileUrl: 'https://picsum.photos/id/63/200/200', sender: 'Alice Johnson', time: '10:30 AM', isRead: false, isFavorite: true },
      { id: 2, profileUrl: 'https://picsum.photos/id/65/200/200', sender: 'Bob Smith', time: 'Yesterday', isRead: true, isFavorite: false },
      { id: 3, profileUrl: 'https://picsum.photos/id/66/200/200', sender: 'Charlie Brown', time: '2 days ago', isRead: false, isFavorite: false }
    ];
    this.filterMessages();
  }

  filterMessages() {
    // base filter by category
    let results: Message[];
    switch (this._selectedCategory) {
      case 'Unread':
        results = this.messages.filter(m => !m.isRead);
        break;
      case 'Favorites':
        results = this.messages.filter(m => !!m.isFavorite);
        break;
      case 'Archived':
        results = this.messages.filter(m => !!m.isArchived);
        break;
      default:
        results = [...this.messages];
    }

    // apply search (case-insensitive) against sender and time
    const q = (this._searchQuery || '').toLowerCase();
    if (q) {
      results = results.filter(m =>
        (m.sender || '').toLowerCase().includes(q) ||
        (m.time || '').toLowerCase().includes(q)
      );
    }

    this.filterMessage = results;
  }

  trackByMessage(index: number, item: Message) {
    return item?.id ?? index;
  }
}
