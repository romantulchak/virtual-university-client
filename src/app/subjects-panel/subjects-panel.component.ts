import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubjectDTO } from '../dto/subject.dto';
import { TeacherDTO } from '../dto/teacher.dto';
import { StatusEnum } from '../model/enum/status.enum';
import { NotificationService } from '../service/notification.service';
import { SubjectService } from '../service/subject.service';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-subjects-panel',
  templateUrl: './subjects-panel.component.html',
  styleUrls: ['./subjects-panel.component.scss']
})
export class SubjectsPanelComponent implements OnInit {

  constructor(private teacherService: TeacherService, 
              private subjectService: SubjectService,
              private notificationService: NotificationService) { }
  public teachers: TeacherDTO[];
  public subjects: SubjectDTO[];
  public subjectsFormControl: FormControl = new FormControl();
  private currentTeacherId: number;
  ngOnInit(): void {
    this.getAllTeachers();
  }

  private getAllTeachers(){
    this.teacherService.getAllTeachers().subscribe(
      res=>{
        this.teachers = res;
      }
    )
  }

  public searchSubjects(id: number){
    this.subjectService.getAvailableSubjects(id).subscribe(
      res=>{
        this.subjects = res;
        this.currentTeacherId = id;
      }
    );
  }

  public addSubject(){
    this.teacherService.addSubjectsToTeacher(this.currentTeacherId, this.subjectsFormControl.value).subscribe(
      res=>{
        this.notificationService.showNotification('Subject was add for teacher', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
      },
      error=>{
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
    );
  }

 
}
