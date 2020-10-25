import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCitasComponent } from './user-citas.component';

describe('UserCitasComponent', () => {
  let component: UserCitasComponent;
  let fixture: ComponentFixture<UserCitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
