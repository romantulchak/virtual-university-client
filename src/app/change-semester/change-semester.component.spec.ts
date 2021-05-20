import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSemesterComponent } from './change-semester.component';

describe('ChangeSemesterComponent', () => {
  let component: ChangeSemesterComponent;
  let fixture: ComponentFixture<ChangeSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSemesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
