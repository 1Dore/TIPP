import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColabSettingsComponent } from './colab-settings.component';

describe('ColabSettingsComponent', () => {
  let component: ColabSettingsComponent;
  let fixture: ComponentFixture<ColabSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColabSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColabSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
