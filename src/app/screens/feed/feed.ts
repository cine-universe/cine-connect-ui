import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Search } from '../../components/search/search';
import { Jobcard } from '../../components/jobcard/jobcard';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MobileHeader } from '../../components/mobile-header/mobile-header';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [ 
    FormsModule, 
    CommonModule, 
    MatIconModule, 
    Search,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MobileHeader
  ],
  templateUrl: './feed.html',
  styleUrls: ['./feed.scss'],
})
export class Feed implements OnInit {
  categories: string[] = [
    'All',
    'Action',
    'Drama',
    'Comedy',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Documentary'
  ];

  jobData = [
    {
      name: 'SS Rajamouli',
      role: 'Director',
      location: 'SKHT, AP, IND',
      title: 'The Globe Trotter',
      genre: 'Action',
      openingRoles: ['Producer', 'Editor'],
      postingTime: '2 hours ago'
    },
    {
      name: 'Jane Smith',
      role: 'Villain',
      title: 'Mystery of Shadows',
      location: 'Mumbai, MH, IND',
      genre: 'Drama',
      openingRoles: ['Villain'],
      postingTime: '5 hours ago'
    },
    {
      name: 'Alice Johnson',
      role: 'Editor',
      title: 'Laugh Out Loud',
      location: 'Bangalore, KA, IND',
      genre: 'Comedy',
      openingRoles: ['Editor', 'Hero'],
      postingTime: '1 day ago'
    },
    {
      name: 'Bob Brown',
      role: 'Hero',
      title: 'Night Terrors',
      location: 'Chennai, TN, IND',
      genre: 'Horror',
      openingRoles: ['Hero', 'Villain'],
      postingTime: '3 days ago'
    },
    {
      name: 'Charlie Davis',
      role: 'Villain',
      title: 'Love in the Air',
      location: 'Hyderabad, TS, IND',
      genre: 'Romance',
      openingRoles: ['Villain', 'Editor'],
      postingTime: '4 days ago'
    }
  ]

  filterData = this.jobData;

  selectedCategory: string = 'All';
  selectedLocation: string = 'Location';
  selectedRole: string = 'Role';

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterData = this.jobData;
    if(category === 'All') {
      // Show all jobs
      this.filterData = this.jobData;
    } else {
      // Filter jobs based on selected category
      this.filterData = this.jobData.filter(job => job.genre === category);
    }
  }

  onSearchChange(searchTerm: string): void {
    this.filterData = this.jobData.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.openingRoles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  applyFilters(): void {
    this.filterData = this.jobData.filter(job => {
      const matchesState = this.selectedLocation ? job.location === this.selectedLocation : true;
      const matchesRole = this.selectedRole ? job.openingRoles.includes(this.selectedRole) : true;
      return matchesState && matchesRole;
    });
  }

  clearFilters(): void {
    this.locControl.reset('');
    this.roleControl.reset('');
    this.filterData = this.jobData;
    this.selectedCategory = 'All';
  }

  locControl = new FormControl('');
  roleControl = new FormControl('');
  locs: string[] = [
    'SKHT, AP, IND',
    'Mumbai, MH, IND',
    'Bangalore, KA, IND',
    'Chennai, TN, IND',
    'Hyderabad, TS, IND'
  ];
  roles: string[] = [
    'Hero',
    'Editor',
    'Villain'
  ];

  locationsObservable: Observable<string[]> = of(this.locs);
  rolesObservable: Observable<string[]> = of(this.roles);

  ngOnInit() {
    this.locationsObservable = this.locControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLocations(value || '')),
    );

    this.rolesObservable = this.roleControl.valueChanges.pipe(
      startWith(this.roleControl.value || ''),
      map(value => this._filterRoles(value || '')),
    );
  }

  private _filterLocations(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.locs.filter(loc => loc.toLowerCase().includes(filterValue));
  }

  private _filterRoles(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.roles.filter(role => role.toLowerCase().includes(filterValue));
  }

  selectLocation(event: any): void {
    this.selectedLocation = event.option.value;
  }

  selectRole(event: any): void {
    this.selectedRole = event.option.value;
  }
}
