import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonStatusRequestPanelComponent } from './lesson-status-request-panel.component';

describe('LessonStatusRequestPanelComponent', () => {
  let component: LessonStatusRequestPanelComponent;
  let fixture: ComponentFixture<LessonStatusRequestPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonStatusRequestPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonStatusRequestPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
