import { CommonModule } from '@angular/common';
import { Component, signal, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface Filters {
  searchText: string;
  locationFilter: string;
  role: string;
  jobTypes: string[];
}

@Component({
  selector: 'app-filters-component',
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './filters-component.html',
  styleUrl: './filters-component.scss',
})
export class FiltersComponent {
  searchText: string = '';
  locationFilter: string = '';
  role: string = '';
  remoteOnly: boolean = false;

  showFilters = signal<boolean>(false);
  
  jobTypes = signal<string[]>(['film', 'short-film', 'series', 'ad-film', 'others']);
  
  selectedTypes = signal<string[]>([]);

  @Output() filtersChange = new EventEmitter<Filters>();

  private searchTimeout: any = null;

  toggleFilters() {
    this.showFilters.update(v => !v);
  }

  onSearch(value: string) {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      if (!value || value.length >= 3) {
        this.filtersChange.emit({
          searchText: value ? value.trim() : '',
          locationFilter: this.locationFilter,
          role: this.role,
          jobTypes: this.selectedTypes(),
        });
      }
    }, 250);
  }
  onLocationChange(value: string) {
    this.filtersChange.emit({
      searchText: this.searchText,
      locationFilter: value ? value.trim() : '',
      role: this.role,
      jobTypes: this.selectedTypes(),
    });
  }
  onRoleChange(value: string) {
    this.filtersChange.emit({
      searchText: this.searchText,
      locationFilter: this.locationFilter,
      role: value,
      jobTypes: this.selectedTypes(),
    });
  }

  toggleJobType(type: string) {
    this.selectedTypes.update(current => {
      if (current.includes(type)) {
        return current.filter(t => t !== type);
      } else {
        return [...current, type];
      }
    });
    this.filtersChange.emit({
      searchText: this.searchText,
      locationFilter: this.locationFilter,
      role: this.role,
      jobTypes: this.selectedTypes(),
    });
  }

  resetFilters() {
    this.searchText = '';
    this.locationFilter = '';
    this.role = '';
    this.selectedTypes.set([]);
    this.filtersChange.emit({
      searchText: '',
      locationFilter: '',
      role: '',
      jobTypes: [],
    });
  }
}
