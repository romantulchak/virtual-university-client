import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleDTO } from '../dto/schedule.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { ScheduleDay } from '../model/schedule-day.model';
import { Schedule } from '../model/schedule.model';
import { StudentGroup } from '../model/studentGroup.model';
import { ScheduleDayService } from '../service/schedule-day.service';
import { ScheduleService } from '../service/schedule.service';
import { StudentGroupService } from '../service/student-group.service';

@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.component.html',
  styleUrls: ['./add-day.component.scss']
})
export class AddDayComponent implements OnInit {
  public showCreateNewScheduleDay: boolean = false;
  public scheduleDay: FormGroup;
  public subjectTeacher: SubjectTeacherGroupDTO[];
  public currentIndex: number = 0;
  public currentLessonIndex: number = 0;
  public dayIsAvailable: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) private data:any,
              private fb: FormBuilder,
              private scheduleService: ScheduleService,
              private groupService: StudentGroupService, 
              private scheduleDayService: ScheduleDayService) { }

  ngOnInit(): void {
    this.resetForm();
    this.addNewDay(0);
    this.findSubjectsForGroup();
    this.showCreateNewScheduleDay = !this.showCreateNewScheduleDay;
  }

  public create(){
    let schedule: Schedule = {
      id: this.data.schedule.id,
      studentGroup: this.data.currentGroup,
      days: this.convetToDays(),

    }
    this.scheduleService.create(schedule).subscribe(
      res=>{
         this.showCreateNewScheduleDay = false;
         this.scheduleService.updateSchedule.next(true);
      }
    );
  }


  private convetToDays():ScheduleDay[]{
    this.scheduleDay.value.days.forEach((day:ScheduleDay) => {
      day.day = new Date(day.day);
      day.lessons.forEach(lesson=>{
          let start =  this.convertStringToTime(lesson.dateStart.toString());
          let end = this.convertStringToTime(lesson.dateEnd.toString());
          lesson.dateStart = new Date(day.day.setHours(start[0], start[1]));
          lesson.dateEnd = new Date(day.day.setHours(end[0], end[1]));
      });
    });

    return this.scheduleDay.value.days;
  }

  private convertStringToTime(time: string): number[]{
    return time.split(":") as unknown as number[];
  }

  private resetForm(){
    this.scheduleDay = this.fb.group({
      days: this.fb.array([])
    })
  }

  public addNewScheduleDay(){
    this.resetForm();
    this.addNewDay(0);
    this.findSubjectsForGroup();
    this.showCreateNewScheduleDay = !this.showCreateNewScheduleDay;
  }

  public addNewDay(index: number){
      this.days.push(this.fb.group({
        id: null,
        day:null,
        schedule: null,
        lessons:this.fb.array([])
      }));
      this.addNewLesson(index);
      this.currentIndex = index;
  }





  private findSubjectsForGroup(){
    this.groupService.findSubjectsForGroup(this.data.currentGroup.id).subscribe(
      res=>{
        this.subjectTeacher = res;
      }
    );
  }

  get days():FormArray{
    return this.scheduleDay.get('days') as FormArray;
  }
  public lessons(index: number):FormArray{
    return this.days.controls[index].get('lessons') as FormArray;
  }

  public checkIfDayAvailable(day:any){
    this.scheduleDayService.checkIfDayFree(this.data.schedule.id,day.value).subscribe(
      res=>{
        this.dayIsAvailable = !res;
      }
    );
    
  }
  public removeDayFromForm(index: number){
    this.currentIndex = index-1;
    this.dayIsAvailable = true;
    this.days.removeAt(index);
  }



  public addNewLesson(index: number){
    this.lessons(index).push(this.fb.group({
      id:null,
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      subjectTeacher: ['', Validators.required],
      scheduleDay: null,
      status: ''
    }));
    this.currentLessonIndex = index;
  }

  public removeLessonFromDay(dayIndex: number, lessonIndex: number){
    this.lessons(dayIndex).removeAt(lessonIndex);
  }
}
