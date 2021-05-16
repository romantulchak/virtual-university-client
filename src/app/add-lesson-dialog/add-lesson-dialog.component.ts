import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { DateConvertHelper } from '../helpers/date-convert.helper';
import { StatusEnum } from '../model/enum/status.enum';
import { Lesson } from '../model/lesson.model';
import { ScheduleDay } from '../model/schedule-day.model';
import { SubjectTeacherGroup } from '../model/subjectTeacherGroup.model';
import { LessonService } from '../service/lesson.service';
import { NotificationService } from '../service/notification.service';
import { StudentGroupService } from '../service/student-group.service';

@Component({
  selector: 'app-add-lesson-dialog',
  templateUrl: './add-lesson-dialog.component.html',
  styleUrls: ['./add-lesson-dialog.component.scss']
})
export class AddLessonDialogComponent implements OnInit {
  private lesson: Lesson = new Lesson();
  public subjectTeacher: SubjectTeacherGroupDTO[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private lessonService: LessonService,
              private groupService: StudentGroupService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    console.log(this.data);
    
      this.findSubjectsForGroup();
  }

  

  public setTimeStart(time: string) {
    //this.lesson.dateStart = new Date(this.data.currentDay.day + " " + time);
      this.lesson.dateStart = DateConvertHelper.convertDateToString(this.data.currentDay.day, time);
  }
  public setTimeEnd(time: string) {
   // this.lesson.dateEnd = new Date(this.data.currentDay.day + " " + time);
     this.lesson.dateEnd = DateConvertHelper.convertDateToString(this.data.currentDay.day, time);
  }

  public setSubjectToLesson(subject: SubjectTeacherGroup) {
    this.lesson.subjectTeacher = subject;
  }

  public addLessonToDay() {
    this.lesson.scheduleDay = this.data.currentDay;
    this.lessonService.create(this.lesson).subscribe(
      res => {
        res.groupName = this.data.group.name;
        this.lessonService.lesson.next(res);
        this.notificationService.showNotification(`Lessons added to day ${this.data.currentDay.day}`, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
      },
      error=>{
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
    );
  }

  private findSubjectsForGroup(){
    this.groupService.findSubjectsForGroup(this.data.group.id, this.data.selectedSemester.id).subscribe(
      res=>{
        this.subjectTeacher = res;
      }
    );
  }
  public setRoomNumber(roomNumber: string){
    this.lesson.roomNumber = roomNumber;
  }
}
