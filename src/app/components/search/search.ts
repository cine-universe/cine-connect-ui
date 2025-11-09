import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  imports: [MatIconModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  @Output() searchTerm = new EventEmitter<string>();

  onSearch(value: string): void {
    this.searchTerm.emit(value);
  }

  reset(input?: HTMLInputElement): void {
    if (input) {
      input.value = '';
    }
    this.searchTerm.emit('');
  }
}
