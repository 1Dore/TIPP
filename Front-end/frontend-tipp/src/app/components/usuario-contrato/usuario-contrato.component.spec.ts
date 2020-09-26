import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioContratoComponent } from './usuario-contrato.component';

describe('UsuarioContratoComponent', () => {
  let component: UsuarioContratoComponent;
  let fixture: ComponentFixture<UsuarioContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
