import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubjectsButtonComponent } from './all-subjects-button.component';

describe('AllSubjectsButtonComponent', () => {
  let component: AllSubjectsButtonComponent;
  let fixture: ComponentFixture<AllSubjectsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSubjectsButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSubjectsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
