import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Experience, ProductionType } from '../../models/Experience';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-exp-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [DatePipe],
  templateUrl: './exp-form.html',
  styleUrl: './exp-form.scss'
})
export class ExpForm {

  expForm: FormGroup;
  productionTypes = Object.values(ProductionType);

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: Experience,
    readonly dialogRef: MatDialogRef<ExpForm>
  ) {
    this.expForm = this.fb.group({
      projectTitle: [data.projectTitle, Validators.required],
      productionType: [data.productionType],
      productionCompany: [data.productionCompany],
      location: [data.location],
      role: [data.role, Validators.required],
      startDate: [this.datePipe.transform(data.startDate, 'yyyy-MM-dd'), Validators.required],
      endDate: [this.datePipe.transform(data.endDate, 'yyyy-MM-dd'), Validators.required],
      description: [data.description]
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close({...this.expForm.value, id: this.data.id, userId: this.data.userId});
  }
}
