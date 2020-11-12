import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserColabCalificacionComponent } from './user-colab-calificacion.component';

describe('UserColabCalificacionComponent', () => {
  let component: UserColabCalificacionComponent;
  let fixture: ComponentFixture<UserColabCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserColabCalificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserColabCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
