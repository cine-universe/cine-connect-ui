import { Routes } from '@angular/router';
import { Messages } from './screens/messages/messages';
import { Profile } from './screens/profile/profile';
import { HomePage } from './screens/home-page/home-page';
import { JobBoard } from './screens/job-board/job-board';

export const routes: Routes = [
    { path: 'home', component: HomePage },
    { path: 'feed', component: JobBoard },
    { path: 'messages', component: Messages },
    { path: 'profile', component: Profile },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
