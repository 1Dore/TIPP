import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeColaboradoresComponent } from './lista-de-colaboradores.component';

describe('ListaDeColaboradoresComponent', () => {
  let component: ListaDeColaboradoresComponent;
  let fixture: ComponentFixture<ListaDeColaboradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeColaboradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
