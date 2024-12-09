import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRsvpPage } from './my-rsvp.page';

describe('MyRsvpPage', () => {
  let component: MyRsvpPage;
  let fixture: ComponentFixture<MyRsvpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRsvpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
