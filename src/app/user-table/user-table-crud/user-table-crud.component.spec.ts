import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableCRUDComponent } from './user-table-crud.component';

describe('UserTableCRUDComponent', () => {
  let component: UserTableCRUDComponent;
  let fixture: ComponentFixture<UserTableCRUDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTableCRUDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
