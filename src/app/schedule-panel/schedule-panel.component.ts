import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ScheduleDTO } from '../dto/schedule.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { Lesson } from '../model/lesson.model';
import { ScheduleDay } from '../model/schedule-day.model';
import { Schedule } from '../model/schedule.model';
import { StudentGroup } from '../model/studentGroup.model';
import { SubjectTeacherGroup } from '../model/subjectTeacherGroup.model';
import { LessonService } from '../service/lesson.service';
import { ScheduleDayService } from '../service/schedule-day.service';
import { ScheduleService } from '../service/schedule.service';
import { StudentGroupService } from '../service/student-group.service';

@Component({
  selector: 'app-schedule-panel',
  templateUrl: './schedule-panel.component.html',
  styleUrls: ['./schedule-panel.component.scss']
})
export class SchedulePanelComponent implements OnInit {

  public currentGroup: StudentGroup;
  public schedule: ScheduleDTO;
  public subjectTeacher: SubjectTeacherGroupDTO[];
  public groups: StudentGroupDTO[];

  public scheduleDay: FormGroup;
  public dayIsAvailable: boolean = true;
  public showCreateNewScheduleDay: boolean = false;


  public currentIndex: number = 0;
  public currentLessonIndex: number = 0;
  constructor(private scheduleService: ScheduleService,
              private groupService: StudentGroupService,
              private lessonService: LessonService,
              private fb: FormBuilder,
              private scheduleDayService: ScheduleDayService) { }

  ngOnInit(): void {
    this.getAllGroups();  
  }


  public create(){
    let schedule: Schedule = {
      id: this.schedule.id,
      studentGroup: this.currentGroup,
      days: this.convetToDays(),

    }
    this.scheduleService.create(schedule).subscribe(
      res=>{
         this.getScheduleForGroup(this.currentGroup);
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

  private getAllGroups(){
    this.groupService.findAllGroups().subscribe(
      res=>{
        this.groups = res;
      }
    );
  }

  public getScheduleForGroup(group: StudentGroup = this.currentGroup) {
    this.scheduleService.getScheduleForGroup(group.id).subscribe(
      res => {

        this.schedule = res;
        this.currentGroup = group;
        this.resetForm(); 

      }
    );
  }
  
  public removeLessonFromDay(dayIndex: number, lessonIndex: number){
    this.lessons(dayIndex).removeAt(lessonIndex);
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



  private findSubjectsForGroup(){
    this.groupService.findSubjectsForGroup(this.currentGroup.id).subscribe(
      res=>{
        this.subjectTeacher = res;
      }
    );
  }



  public checkIfDayAvailable(day:any){

    
    this.scheduleDayService.checkIfDayFree(this.schedule.id,day.value).subscribe(
      res=>{
        this.dayIsAvailable = !res;
        console.log(res);
        
      }
    );
    
  }
  public removeDayFromForm(index: number){
    this.days.removeAt(index);
  }

  get days():FormArray{
    return this.scheduleDay.get('days') as FormArray;
  }
  public lessons(index: number):FormArray{
    return this.days.controls[index].get('lessons') as FormArray;
  }

}
