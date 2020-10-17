import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterColaboradorComponent } from './register-colaborador.component';

describe('RegisterColaboradorComponent', () => {
  let component: RegisterColaboradorComponent;
  let fixture: ComponentFixture<RegisterColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
