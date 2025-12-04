import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-info',
  imports: [
    RouterModule,
    MatIconModule
  ],
  templateUrl: './profile-info.html',
  styleUrl: './profile-info.scss',
})
export class ProfileInfo {

    @Input() userProfile: any;
    @Output() selectedCategoryUpdated = new EventEmitter<string>();

    selectExperienceCategory(category: string) {
      this.selectedCategoryUpdated.emit(category);
    }
}
