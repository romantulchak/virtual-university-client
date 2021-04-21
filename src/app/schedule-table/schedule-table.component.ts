import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddDayComponent } from '../add-day/add-day.component';
import { AddLessonDialogComponent } from '../add-lesson-dialog/add-lesson-dialog.component';
import { ScheduleDayDTO } from '../dto/schedule-day.dto';
import { ScheduleDTO } from '../dto/schedule.dto';
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
export class ScheduleTableComponent implements OnInit, OnChanges, AfterContentInit {

  public days: ScheduleDayDTO[];
  @Input("isAdmin") isAdmin: boolean = false;
  @Input("group") group: StudentGroupDTO;
  public scheduleId: number;
  public rangeFilter: boolean = false;
  public rangeGroup: FormGroup;
  public currentDay: ScheduleDay;
  public schedule: ScheduleDTO;
  constructor(private fb: FormBuilder, 
              private scheduleDayService: ScheduleDayService, 
              private lessonService: LessonService,
              private scheduleDay: ScheduleDayService,
              private dialog: MatDialog,
              private scheduleService: ScheduleService) {}

  ngOnInit(): void {

    this.generateRangeForm();
    this.updateLessonsInDay();
    this.updateSchedule();

  }

  ngOnChanges(){
    if(this.group != null){
      this.getDaysForWeek();
      this.getScheduleIdByGroup();
    }

  }
  
  ngAfterContentInit(){
    
  }

  private getScheduleIdByGroup(){
    this.scheduleService.getScheduleIdForGroup(this.group.id).subscribe(
      res=>{
        this.scheduleId = res;
        
      }
    );
  }


  public getScheduleForGroup(group: StudentGroupDTO = this.group) {
    this.scheduleService.getScheduleForGroup(group.id).subscribe(
      res => {
        this.schedule = res;
        this.days = res.days;
        this.group = group;  
      }
    );
  }
  private updateSchedule() {
    this.scheduleService.updateSchedule.subscribe(
      res=>{
        if(res){
          this.getScheduleForGroup();
        }
        
      }
    );
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



  public addNewScheduleDay(){
    this.dialog.open(AddDayComponent, {
      data:{
        scheduleId: this.scheduleId,
        currentGroup: this.group
      },
      panelClass:"create-day-modal"
    });
  }
}
