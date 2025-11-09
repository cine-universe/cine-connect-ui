import { Routes } from '@angular/router';
import { Home } from './screens/home/home';
import { Feed } from './screens/feed/feed';
import { Messages } from './screens/messages/messages';
import { Profile } from './screens/profile/profile';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'feed', component: Feed },
    { path: 'messages', component: Messages },
    { path: 'profile', component: Profile },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
