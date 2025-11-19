import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpForm } from './exp-form';

describe('ExpForm', () => {
  let component: ExpForm;
  let fixture: ComponentFixture<ExpForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
