import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Messagelist } from './messagelist';

describe('Messagelist', () => {
  let component: Messagelist;
  let fixture: ComponentFixture<Messagelist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Messagelist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Messagelist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
