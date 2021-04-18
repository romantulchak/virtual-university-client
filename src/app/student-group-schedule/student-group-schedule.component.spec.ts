import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGroupScheduleComponent } from './student-group-schedule.component';

describe('StudentGroupScheduleComponent', () => {
  let component: StudentGroupScheduleComponent;
  let fixture: ComponentFixture<StudentGroupScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGroupScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGroupScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
