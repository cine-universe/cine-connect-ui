import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-achievement-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './achievement-form.html',
  styleUrl: './achievement-form.scss',
})
export class AchievementForm implements OnChanges {
  @Input() achievement: any = null;
  @Output() saved = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  awardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.awardForm = this.fb.group({
      award: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      event: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.achievement) {
      // patch form with incoming achievement values
      console.log(this.achievement)
      this.awardForm.patchValue({
        award: this.achievement.award ?? '',
        year: this.achievement.year ?? '',
        event: this.achievement.event ?? this.achievement.event ?? '',
        category: this.achievement.category ?? ''
      });
    } else if (!this.achievement) {
      this.awardForm.reset();
    }
  }

  onSubmit() {
    if (this.awardForm.valid) {
      const payload = {
        ...this.awardForm.value,
        userId: this.achievement?.userId ?? '',
        // later this id was updated by backend
        id: this.achievement?.id ?? Date.now()
      };
      this.saved.emit(payload);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

}
