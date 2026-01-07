import { Injectable } from '@angular/core';
import { JobData } from '../models/JobData';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobs: JobData[] = [];
  applications: any[] = [];

  constructor() {
    this.jobs = this.getAllJobs();
  }

  getAllJobs() {
    const jobs: JobData[] = [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
        title: 'VFX Composer',
        company: 'Pixel Magic Studios',
        type: 'Full-Time',
        location: 'Reemote',
        rate: 'DOE',
        postedTime: '2d ago',
        description: 'Senior Nuke compositor needed for upcoming streaming series. Keying, rotoscoping, and integration of CG elements.',
        skills: ['Nuke', 'Compositing', 'VFX']
      },
      {
        id: 4,
        title: 'Gaffer',
        company: 'Bright Light Films',
        type: 'Contract',
        location: 'Atlanta, GA',
        rate: '600/day',
        postedTime: '5h ago',
        description: 'Experienced gaffer needed for a 2-week indie film shoot. Must have own lighting kit and crew management skills.',
        skills: ['Lighting Design', 'Crew Management']
      },
      {
        id: 5,
        title: 'Production Designer',
        company: 'CineArt Productions',
        type: 'Full-Time',
        location: 'Chicago, IL',
        rate: 'DOE',
        postedTime: '3d ago',
        description: 'Seeking a creative production designer for a high-profile commercial shoot. Experience with set design and budgeting required.',
        skills: ['Set Design', 'Budgeting', 'Creative Direction']
      },
      {
        id: 6,
        title: 'Steadicam Operator',
        company: 'Fluid Motion Studios',
        type: 'Freelance',
        location: 'Vancouver, BC',
        rate: '700/day',
        postedTime: '12h ago',
        description: 'Looking for a skilled Steadicam operator for a music video shoot. Must have own rig and demonstrate strong camera movement skills.',
        skills: ['Steadicam Operation', 'Camera Movement']
      },
      {
        id: 7,
        title: 'Colorist',
        company: 'Visionary Post',
        type: 'Contract',
        location: 'Remote',
        rate: 'DOE',
        postedTime: '4d ago',
        description: 'Experienced colorist needed for feature film post-production. Proficiency in DaVinci Resolve required. Must deliver high-quality color grading.',
        skills: ['Color Grading', 'DaVinci Resolve']
      },
    ]

    return jobs;
  }

  getApplications() {
    const applied = this.applications;
    return applied;
  }

  getApplicationById(id: number) {
    const applications = this.getAllJobs();
    return applications.find(app => app.id === id);
  }

  addApplication(id: number) {
    let application = {id: this.applications.length + 1, status: 'Applied', appliedDate: new Date()};
    this.jobs.find(job => {
      if (job.id === id) {
        this.applications.push({...application, title: job.title, company: job.company, location: job.location});
      }
    });
  }
}
