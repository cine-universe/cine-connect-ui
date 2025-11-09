import { Component } from '@angular/core';
import { Messagelist } from '../../components/messagelist/messagelist';
import { Messagebox } from '../../components/messagebox/messagebox';

@Component({
  selector: 'app-messages',
  imports: [Messagelist, Messagebox],
  templateUrl: './messages.html',
  styleUrl: './messages.scss',
})
export class Messages {
  categories: string[] = [
    'All',
    'Unread',
    'Favorites',
    'Archived'
  ];

  selectedMessage: any;

  selectedCategory: string = 'All';

  // search query bound to the input and passed to child
  searchQuery: string = '';

  selectCategory(category: string): void {
    this.selectedCategory = category;
    // child listens to selectedCategory input and will refilter
  }

  filterMessages(): void {
    // no-op here; filtering handled by child component via inputs
  }

  onSearch(query: string): void {
    this.searchQuery = query || '';
  }

  messageSelected(message: any): void {
    this.selectedMessage = message;
  }
}
