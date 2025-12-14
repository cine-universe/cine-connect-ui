import { Component } from '@angular/core';
import { FiltersComponent } from '../../components/filters-component/filters-component';
import { MobileHeader } from '../../components/mobile-header/mobile-header';
import { Jobcard } from '../../components/jobcard/jobcard';
import { JobData } from '../../models/JobData';

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
export class JobBoard {
  sampleJob: JobData[] = [
    {
    title: 'Focus Puller (1st AC)',
    company: 'Red Horizon Productions',
    type: 'Contract',
    location: 'Los Angeles, CA',
    rate: '650/day',
    postedTime: '3h ago',
    description: 'Looking for an experienced 1st AC for a 3-week feature shoot. Must own wireless follow focus system. Genre: Sci-Fi Thriller.',
    skills: ['Focus Pulling', 'Camera Assembly', 'Preston FIZ']
  },
  {
    title: 'Sound Mixer',
    company: 'Vibrant Stories Doc',
    type: 'Freelance',
    location: 'New York, NY',
    rate: '500/day',
    postedTime: '1d ago',
    description: 'Documentary shoot in Manhattan. Run & Gun style. Need someone fast on their feet with own gear (Boom + Lavs).',
    skills: ['Location Sound', 'Audio Mixing']
  },
  {
    title: 'VFX Composer',
    company: 'Pixel Magic Studios',
    type: 'Full-Time',
    location: 'Reemote',
    rate: 'DOE',
    postedTime: '2d ago',
    description: 'Senior Nuke compositor needed for upcoming streaming series. Keying, rotoscoping, and integration of CG elements.',
    skills: ['Nuke', 'Compositing', 'VFX']
  }
  ]
}
