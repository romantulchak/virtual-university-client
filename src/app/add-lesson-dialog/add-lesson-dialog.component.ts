import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { Lesson } from '../model/lesson.model';
import { ScheduleDay } from '../model/schedule-day.model';
import { SubjectTeacherGroup } from '../model/subjectTeacherGroup.model';
import { LessonService } from '../service/lesson.service';
import { StudentGroupService } from '../service/student-group.service';

@Component({
  selector: 'app-add-lesson-dialog',
  templateUrl: './add-lesson-dialog.component.html',
  styleUrls: ['./add-lesson-dialog.component.scss']
})
export class AddLessonDialogComponent implements OnInit {
  private lesson: Lesson = new Lesson();
  public subjectTeacher: SubjectTeacherGroupDTO[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private lessonService: LessonService,private groupService: StudentGroupService) { }

  ngOnInit(): void {
    this.findSubjectsForGroup();
  }


  public setTimeStart(time: string) {
    this.lesson.dateStart = new Date(this.data.currentDay.day + " " + time);
  }
  public setTimeEnd(time: string) {
    this.lesson.dateEnd = new Date(this.data.currentDay.day + " " + time);
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
        
      }
    );
  }

  private findSubjectsForGroup(){
    this.groupService.findSubjectsForGroup(this.data.group.id).subscribe(
      res=>{
        this.subjectTeacher = res;
      }
    );
  }
}
