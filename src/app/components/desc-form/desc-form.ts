import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-desc-form',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './desc-form.html',
  styleUrl: './desc-form.scss',
})
export class DescForm {
  descriptionHeading='You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.';
  descForm: FormGroup;
  readonly maxLength = 900;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string,
    readonly dialogRef: MatDialogRef<DescForm>
  ) {
    this.descForm = this.fb.group({
      description: [data]
    });
  }
  
  get charCount(): number {
    return (this.descForm.get('description')?.value || '').length;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close({...this.descForm.value});
  }
}
