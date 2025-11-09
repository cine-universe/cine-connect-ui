import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Search } from '../../components/search/search';
import { Jobcard } from '../../components/jobcard/jobcard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [ FormsModule, CommonModule, MatIconModule, Search, Jobcard],
  templateUrl: './feed.html',
  styleUrls: ['./feed.scss'],
})
export class Feed {
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

  states: string[] = [
    'Location',
    'SKHT, AP, IND',
    'Mumbai, MH, IND',
    'Bangalore, KA, IND',
    'Chennai, TN, IND',
    'Hyderabad, TS, IND'
  ];

  roles: string[] = [
    'Role',
    'Hero',
    'Editor',
    'Villain'
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
  selectedState: string = 'Location';
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

  selectState(state: string): void {
    this.selectedState = state;
  }

  selectRole(role: string): void {
    this.selectedRole = role;
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
      const matchesState = this.selectedState ? job.location === this.selectedState : true;
      const matchesRole = this.selectedRole ? job.openingRoles.includes(this.selectedRole) : true;
      return matchesState && matchesRole;
    });
  }

  clearFilters(): void {
    this.selectedState = 'Location';
    this.selectedRole = 'Role';
    this.filterData = this.jobData;
    this.selectedCategory = 'All';
  }
}
