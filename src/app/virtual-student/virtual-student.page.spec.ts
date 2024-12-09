import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtualStudentPage } from './virtual-student.page';

describe('VirtualStudentPage', () => {
  let component: VirtualStudentPage;
  let fixture: ComponentFixture<VirtualStudentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
