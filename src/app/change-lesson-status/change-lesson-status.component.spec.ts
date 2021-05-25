import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLessonStatusComponent } from './change-lesson-status.component';

describe('ChangeLessonStatusComponent', () => {
  let component: ChangeLessonStatusComponent;
  let fixture: ComponentFixture<ChangeLessonStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLessonStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLessonStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
