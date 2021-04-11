import { Component, OnInit } from '@angular/core';
import { ScheduleDTO } from '../dto/schedule.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { Lesson } from '../model/lesson.model';
import { ScheduleDay } from '../model/schedule-day.model';
import { Schedule } from '../model/schedule.model';
import { SubjectTeacherGroup } from '../model/subjectTeacherGroup.model';
import { LessonService } from '../service/lesson.service';
import { ScheduleService } from '../service/schedule.service';
import { StudentGroupService } from '../service/student-group.service';

@Component({
  selector: 'app-schedule-panel',
  templateUrl: './schedule-panel.component.html',
  styleUrls: ['./schedule-panel.component.scss']
})
export class SchedulePanelComponent implements OnInit {
  public schedule: ScheduleDTO;
  public subjectTeacher: SubjectTeacherGroupDTO[];
  private lesson: Lesson = new Lesson();
  public currentDay: ScheduleDay;


  constructor(private scheduleService: ScheduleService, private groupService: StudentGroupService, private lessonService: LessonService) { }

  ngOnInit(): void {
    this.getScheduleForGroup(12);
  }



  private create(){
    let dateStart = new Date(2021, 10, 29, 11, 20);
    let dateEnd = new Date(2021, 10, 29, 12,45);
    let schedule: Schedule = {
      id: null,
      studentGroup: {
        id: 161, 

      },
      days:[
        {
          id: null,
          day: new Date(2021, 10, 29),
          lessons:[
            {
              id: null, 
              dateStart: dateStart,
              dateEnd: dateEnd,
              status: 'ACTIVE',
              scheduleDay: null,
              subjectTeacher:{
                id: 132
              }
            },
            {
              id: null, 
              dateStart: dateStart,
              dateEnd: dateEnd,
              status: 'ACTIVE',
              scheduleDay: null,
              subjectTeacher:{
                id: 131
              }
            }
          ],
          schedule: null
        }
      ]
    }


    this.scheduleService.create(schedule).subscribe(
      res=>{
        console.log(res);
        
      }
    );
  }

  public getScheduleForGroup(groupId: number){
    this.scheduleService.getScheduleForGroup(161).subscribe(
      res=>{
        console.log(res);
        
        this.schedule = res;
      }
    );
  }

  public setCurrentDay(day: ScheduleDay){
      this.currentDay = day;
      this.findSubjectsForGroup();
  }

  private findSubjectsForGroup(){
    this.groupService.findSubjectsForGroup(161).subscribe(
      res=>{
        console.log(res);
        this.subjectTeacher = res;
      }
    );
  }

  public setTimeStart(time: string){
    this.lesson.dateStart = new Date(this.currentDay.day + " " + time);
  }
  public setTimeEnd(time: string){
    console.log(time);
    
    this.lesson.dateEnd = new Date(this.currentDay.day + " " + time);
  }
  public setSubjectToLesson(subject: SubjectTeacherGroup){
    this.lesson.subjectTeacher = subject;
  }

  public addLessonToDay(){
    this.lesson.scheduleDay = this.currentDay;
    console.log(this.lesson);
    
    this.lessonService.create(this.lesson).subscribe(
      res=>{
        console.log("Ok");
        
      }
    );
  }

}
