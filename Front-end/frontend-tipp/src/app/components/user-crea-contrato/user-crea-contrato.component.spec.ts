import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreaContratoComponent } from './user-crea-contrato.component';

describe('UserCreaContratoComponent', () => {
  let component: UserCreaContratoComponent;
  let fixture: ComponentFixture<UserCreaContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreaContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreaContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
