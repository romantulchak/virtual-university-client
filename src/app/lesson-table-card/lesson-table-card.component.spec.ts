import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTableCardComponent } from './lesson-table-card.component';

describe('LessonTableCardComponent', () => {
  let component: LessonTableCardComponent;
  let fixture: ComponentFixture<LessonTableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonTableCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
