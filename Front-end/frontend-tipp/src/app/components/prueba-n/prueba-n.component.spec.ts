import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaNComponent } from './prueba-n.component';

describe('PruebaNComponent', () => {
  let component: PruebaNComponent;
  let fixture: ComponentFixture<PruebaNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
