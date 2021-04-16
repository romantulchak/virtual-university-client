import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddLessonDialogComponent } from '../add-lesson-dialog/add-lesson-dialog.component';
import { ScheduleDayDTO } from '../dto/schedule-day.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { Lesson } from '../model/lesson.model';
import { ScheduleDay } from '../model/schedule-day.model';
import { StudentGroup } from '../model/studentGroup.model';
import { SubjectTeacherGroup } from '../model/subjectTeacherGroup.model';
import { LessonService } from '../service/lesson.service';
import { ScheduleDayService } from '../service/schedule-day.service';
import { ScheduleService } from '../service/schedule.service';
import { StudentGroupService } from '../service/student-group.service';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent implements OnInit, OnChanges {

  @Input("days") days: ScheduleDayDTO[];
  @Input("isAdmin") isAdmin: boolean = false;
  @Input("group") group: StudentGroupDTO;
  @Input("scheduleId") scheduleId: number;
  @Output("allDaysToUpdate") daysToUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  public rangeFilter: boolean = false;
  public rangeGroup: FormGroup;
  public currentDay: ScheduleDay;
  constructor(private fb: FormBuilder, 
              private scheduleDayService: ScheduleDayService, 
              private lessonService: LessonService,
              private scheduleDay: ScheduleDayService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    
    this.generateRangeForm();
    this.updateLessonsInDay();
  }

  ngOnChanges(){
  }



  private updateLessonsInDay(){
    this.lessonService.lesson.subscribe(
      res=>{
        if(res != null){
            this.currentDay.lessons.push(res as unknown as Lesson);
        }
      }
    );
  }

  public getAllDays(){
    this.daysToUpdate.emit(true);
  }
 
  private generateRangeForm() {
    this.rangeGroup = this.fb.group({
      dayAfter: ['', Validators.required],
      dayBefore: ['', Validators.required]
    });
  }
  public setFilterOption() {
    this.rangeFilter = true;
  }

  public filterByRange() {
    this.scheduleDayService.getScheduleInRange(this.dayAfter, this.dayBefore, this.scheduleId).subscribe(
      res => {
        this.days = res;

      }
    );
  }


  get dayAfter(): string {
    return this.rangeGroup.get('dayAfter').value;
  }
  get dayBefore(): string {
    return this.rangeGroup.get('dayBefore').value;
  }

  public setCurrentDay(day: ScheduleDay) {
    this.currentDay = day;

    this.dialog.open(AddLessonDialogComponent, {
      data: {
        currentDay: this.currentDay,
        group: this.group
      }
    });
  }

  public deleteLessonFromDay(lesson: Lesson, day: ScheduleDay){
      if(window.confirm('Are you sure you want to delete this lesson?')){
        this.lessonService.delete(lesson.id).subscribe(
          res=>{
            day.lessons = day.lessons.filter(x=>x.id != lesson.id);
          }
        );
      }
      
  }
  public editLessonInDay(lesson: Lesson){

  }



  public deleteDayFromSchedule(day: ScheduleDayDTO){
    if(window.prompt(`Are you sure that you wan to delete all day: ${day.day} ? Please enter YES`) == 'YES'){
      this.scheduleDayService.deleteDayFromSchedule(day.id).subscribe(
        res=>{
          this.days = this.days.filter(d => d.id != day.id);
          
        }
      );
    }
    
  }




  public getDaysForWeek(){
    this.scheduleDay.getDaysForWeek(this.group.id).subscribe(
      res=>{
        this.days = res;
      }
    );
  }
}