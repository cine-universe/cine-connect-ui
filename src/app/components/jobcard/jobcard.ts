import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { JobData } from '../../models/JobData';

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
})
export class Jobcard {
  @Input() jobData!: JobData;
}
