import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTagsComponent } from './admin-create-tags.component';

describe('AdminCreateTagsComponent', () => {
  let component: AdminCreateTagsComponent;
  let fixture: ComponentFixture<AdminCreateTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
