import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSemestersComponent } from './group-semesters.component';

describe('GroupSemestersComponent', () => {
  let component: GroupSemestersComponent;
  let fixture: ComponentFixture<GroupSemestersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSemestersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSemestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
