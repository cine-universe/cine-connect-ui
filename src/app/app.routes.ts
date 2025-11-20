import { Routes } from '@angular/router';
import { Feed } from './screens/feed/feed';
import { Messages } from './screens/messages/messages';
import { Profile } from './screens/profile/profile';
import { HomePage } from './screens/home-page/home-page';

export const routes: Routes = [
    { path: 'home', component: HomePage },
    { path: 'feed', component: Feed },
    { path: 'messages', component: Messages },
    { path: 'profile', component: Profile },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
