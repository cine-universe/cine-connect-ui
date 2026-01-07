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
  sampleJob: JobData[] = []

  constructor(
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.sampleJob = this.jobService.getAllJobs();
  }
}
