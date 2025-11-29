import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescForm } from './desc-form';

describe('DescForm', () => {
  let component: DescForm;
  let fixture: ComponentFixture<DescForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
