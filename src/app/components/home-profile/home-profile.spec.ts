import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfile } from './home-profile';

describe('HomeProfile', () => {
  let component: HomeProfile;
  let fixture: ComponentFixture<HomeProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
