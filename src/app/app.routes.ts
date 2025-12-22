import { Routes } from '@angular/router';
import { Messages } from './screens/messages/messages';
import { Profile } from './screens/profile/profile';
import { HomePage } from './screens/home-page/home-page';
import { JobBoard } from './screens/job-board/job-board';
import { Login } from './screens/login/login';
import { Oauth2RedirectComponent } from './components/oauth2-redirect-component/oauth2-redirect-component';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'oauth2-redirect', component: Oauth2RedirectComponent },

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomePage },
      { path: 'feed', component: JobBoard },
      { path: 'messages', component: Messages },
      { path: 'profile', component: Profile },
    ]
  },

  { path: '**', redirectTo: 'login' }
];
