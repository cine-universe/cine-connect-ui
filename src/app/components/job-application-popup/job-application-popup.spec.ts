import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationPopup } from './job-application-popup';

describe('JobApplicationPopup', () => {
  let component: JobApplicationPopup;
  let fixture: ComponentFixture<JobApplicationPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
