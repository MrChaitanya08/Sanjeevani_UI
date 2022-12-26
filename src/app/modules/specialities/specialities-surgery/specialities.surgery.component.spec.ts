import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesRoomComponent } from './facilities.room.component';

describe('RoomComponent', () => {
  let component: FacilitiesRoomComponent;
  let fixture: ComponentFixture<FacilitiesRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
