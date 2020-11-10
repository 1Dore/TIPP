import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditTagComponent } from './admin-edit-tag.component';

describe('AdminEditTagComponent', () => {
  let component: AdminEditTagComponent;
  let fixture: ComponentFixture<AdminEditTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
