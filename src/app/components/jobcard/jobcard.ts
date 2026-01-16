import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { JobData } from '../../models/JobData';
import { MatDialog } from '@angular/material/dialog';
import { JobApplicationPopup } from '../job-application-popup/job-application-popup';
import { JobService } from '../../services/job-service';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-jobcard',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule
  ],
  templateUrl: './jobcard.html',
  styleUrl: './jobcard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Jobcard implements OnInit {
  readonly dialog = inject(MatDialog);
  @Input() jobData!: JobData;
  applicationStatus = signal('Apply');

  constructor(
    private jobService: JobService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const appliedJobs = this.jobService.getApplications();
    const isApplied = appliedJobs.find(job => job.id === this.jobData.id);
    if (isApplied) {
      this.applicationStatus.set('Applied');
    }
  }

  openApplicationPopup() {
    this.dialog.open(JobApplicationPopup, {
      data: {
        jobId: this.jobData.id,
        jobTitle: this.jobData.title,
        companyName: this.jobData.company
      },
      width: '90%',
      maxHeight: '80vh',
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop'
    }).afterClosed().subscribe(result => {
      if (result && result.jobId) {
        this.applicationStatus.set('Applied');
        this.jobService.addApplication(result.jobId);
        this.notificationService.publishNotification({
          id: new Date().getTime(),
          type: 'application_update',
          message: `Your application for the <strong class="notification-highlights">${result.jobTitle}</strong> position at <strong class="notification-highlights">${result.companyName}</strong> has been submitted successfully.`,
          timestamp: new Date(),
          avatarUrl: 'https://picsum.photos/id/65/200/200',
          read: false
        });
      }
    });
  }
}
