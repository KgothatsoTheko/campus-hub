import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelPage } from './channel.page';

describe('ChannelPage', () => {
  let component: ChannelPage;
  let fixture: ComponentFixture<ChannelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
