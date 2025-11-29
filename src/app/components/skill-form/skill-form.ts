import { AsyncPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-skill-form',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatError,
    FormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './skill-form.html',
  styleUrl: './skill-form.scss'
})
export class SkillForm implements OnInit {
  skillControl = new FormControl('',[
    this.duplicateSkillValidator.bind(this)
  ]);
  userSkills: string[] ;
  allSkills: string[] = ['Editing', 'Directing', 'Cinematography', 'Screenwriting', 'Producing', 'Acting', 'Sound Design', 'Visual Effects', 'Animation', 'Production Design', 'Costume Design', 'Makeup Artistry', 'Lighting', 'Camera Operation', 'Film Editing', 'Color Grading', 'Storyboarding', 'Script Supervising', 'Location Scouting', 'Casting', 'Stunt Coordination'];
  filteredSkills: Observable<string[]> = of(this.allSkills);
  selectedSkill = '';

  constructor(
    public dialogRef: MatDialogRef<SkillForm>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.userSkills = data || [];
  }

  ngOnInit(): void {
    this.filteredSkills = this.skillControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterSkills(value || ''))
    )
  }
  _filterSkills(value: string): any {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }

  skillSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedSkill = event.option.viewValue;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  duplicateSkillValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim();
    if (value && this.userSkills.includes(value)) {
      return { duplicate: true }; 
    }
    return null;
  }

  onSubmit(): void {
    const skillToAdd = this.selectedSkill || this.skillControl.value?.trim();
    if (skillToAdd && !this.userSkills.includes(skillToAdd)) {
      this.dialogRef.close(skillToAdd);
    }
    this.selectedSkill = '';
  }
}
