import { Component, OnInit } from '@angular/core';
import { FiltersComponent } from '../../components/filters-component/filters-component';
import { MobileHeader } from '../../components/mobile-header/mobile-header';
import { Jobcard } from '../../components/jobcard/jobcard';
import { JobData } from '../../models/JobData';
import { JobService } from '../../services/job-service';

@Component({
  selector: 'app-job-board',
  imports: [
    FiltersComponent,
    MobileHeader,
    Jobcard
  ],
  templateUrl: './job-board.html',
  styleUrl: './job-board.scss',
})
export class JobBoard implements OnInit {
  allJobs: JobData[] = [];
  filteredJobs: JobData[] = [];

  constructor(
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.allJobs = this.jobService.getAllJobs();
    this.filteredJobs = this.allJobs;
  }

  onSearchChanged(query: string) {
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      this.filteredJobs = this.allJobs;
      return;
    }

    this.filteredJobs = this.allJobs.filter(job => {
      const inTitle = job.title?.toLowerCase().includes(q);
      const inCompany = job.company?.toLowerCase().includes(q);
      const inDesc = job.description?.toLowerCase().includes(q);
      const inSkills = job.skills?.join(' ').toLowerCase().includes(q);
      return inTitle || inCompany || inDesc || inSkills;
    });
  }

  onJobTypeChanged(selectedTypes: string[]) {
    if (!selectedTypes || selectedTypes.length === 0) {
      this.filteredJobs = this.allJobs;
      return;
    }
    this.filteredJobs = this.allJobs.filter(job => selectedTypes.includes(job.type));
  }

  onFiltersChanged(filters: any) {
    this.filteredJobs = this.allJobs.filter(job => {
      const matchesSearch = !filters.searchText || (
        job.title?.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        job.company?.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        job.description?.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        (job.skills && job.skills.join(' ').toLowerCase().includes(filters.searchText.toLowerCase()))
      );
      const matchesLocation = !filters.locationFilter || (
        job.location?.toLowerCase().includes(filters.locationFilter.toLowerCase())
      );
      const matchesRole = !filters.role || (
        job.role?.toLowerCase().includes(filters.role.toString().toLowerCase())
      );
      const matchesJobTypes = !filters.jobTypes.length || filters.jobTypes.includes(job.type);

      return matchesSearch && matchesLocation && matchesRole && matchesJobTypes;
    });
  }
}