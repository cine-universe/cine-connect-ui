import { Component, OnInit } from '@angular/core';
import { MobileHeader } from '../../components/mobile-header/mobile-header';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { JobService } from '../../services/job-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-applications',
  imports: [
    RouterModule,
    MobileHeader,
    MatProgressBarModule,
    MatPaginatorModule,
    TimeAgoPipe
  ],
  templateUrl: './applications.html',
  styleUrl: './applications.scss',
})
export class Applications implements OnInit {
  applications: any = [];
  constructor(
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.applications = this.jobService.getApplications();
  }

  pageSizeOptions: number[] = [5, 10];
  pageSize = 5;
  pageIndex = 0;

  get paginatedApplications() {
    const start = this.pageIndex * this.pageSize;
    return this.applications.slice(start, start + this.pageSize);
  }

  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
