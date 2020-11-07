import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColabPerfilComponent } from './colab-perfil.component';

describe('ColabPerfilComponent', () => {
  let component: ColabPerfilComponent;
  let fixture: ComponentFixture<ColabPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColabPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColabPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
