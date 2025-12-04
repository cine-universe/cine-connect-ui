import { Component, Input } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-profile',
  imports: [RouterModule],
  templateUrl: './home-profile.html',
  styleUrl: './home-profile.scss',
})
export class HomeProfile {
  profile : any;
  constructor(private readonly profileServive: ProfileService,
    private router: Router
  ) {
    this.profile = this.profileServive.getHomeProfile();
  }
  navigateToProfile() {
    this.router.navigate(['/profile'])
  }
}
