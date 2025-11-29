import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Achievements } from '../../models/Achievements';

@Component({
  selector: 'app-achievement-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './achievement-form.html',
  styleUrl: './achievement-form.scss',
})
export class AchievementForm {

  achForm: FormGroup;

  constructor (
    @Inject(MAT_DIALOG_DATA) public data : Achievements,
    readonly dialogRef: MatDialogRef<AchievementForm>,
    private fb: FormBuilder
  ) {
    this.achForm = fb.group({
      category: data.category || '',
      year: data.year || null,
      event: data.event || '',
      eventLocation: data.eventLocation || '',
      filmTitle: data.filmTitle || '',
      verificationLink: data.verificationLink || ''
    })
  }

  onClose() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.dialogRef.close(this.achForm.value);
  }
}
