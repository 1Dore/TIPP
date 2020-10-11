import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColabMenuComponent } from './colab-menu.component';

describe('ColabMenuComponent', () => {
  let component: ColabMenuComponent;
  let fixture: ComponentFixture<ColabMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColabMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
