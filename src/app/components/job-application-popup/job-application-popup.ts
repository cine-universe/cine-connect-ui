import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-application-popup',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './job-application-popup.html',
  styleUrl: './job-application-popup.scss',
})
export class JobApplicationPopup {
  jobId: string = '';
  jobTitle: string = 'Senior UX Designer';
  companyName: string = 'Creative Minds Inc.';
  email: string = localStorage.getItem('email') || '';
  applicationForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<JobApplicationPopup>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.jobId = data.jobId;
    this.jobTitle = data.jobTitle;
    this.companyName = data.companyName;
    this.applicationForm = this.fb.group({      
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  closePopup() {
    this.dialogRef.close();
  }

  submitApplication() {
    if (this.applicationForm.valid) {
      const formValue = this.applicationForm.getRawValue();
      this.dialogRef.close({ 
        jobId: this.jobId, 
        phone: formValue.phone,
        jobTitle: this.jobTitle,
        companyName: this.companyName
      });
      this.toastr.success('Application submitted successfully! Check status in My Applications', 'Success');
    } else {
      this.applicationForm.markAllAsTouched(); 
    }
  }

  get f() { return this.applicationForm.controls; }
}
