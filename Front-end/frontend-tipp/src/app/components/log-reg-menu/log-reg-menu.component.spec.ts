import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRegMenuComponent } from './log-reg-menu.component';

describe('LogRegMenuComponent', () => {
  let component: LogRegMenuComponent;
  let fixture: ComponentFixture<LogRegMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogRegMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRegMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
