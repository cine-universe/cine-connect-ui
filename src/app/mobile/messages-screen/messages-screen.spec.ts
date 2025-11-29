import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesScreen } from './messages-screen';

describe('MessagesScreen', () => {
  let component: MessagesScreen;
  let fixture: ComponentFixture<MessagesScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
