import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailsTeacherLayoutComponent } from './group-details-teacher-layout.component';

describe('GroupDetailsTeacherLayoutComponent', () => {
  let component: GroupDetailsTeacherLayoutComponent;
  let fixture: ComponentFixture<GroupDetailsTeacherLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupDetailsTeacherLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailsTeacherLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
