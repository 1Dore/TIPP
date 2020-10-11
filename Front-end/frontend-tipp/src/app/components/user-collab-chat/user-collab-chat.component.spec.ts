import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCollabChatComponent } from './user-collab-chat.component';

describe('UserCollabChatComponent', () => {
  let component: UserCollabChatComponent;
  let fixture: ComponentFixture<UserCollabChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCollabChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCollabChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
