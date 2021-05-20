import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { StatusEnum } from '../model/enum/status.enum';
import { SubjectTeacherGroup } from '../model/subjectTeacherGroup.model';
import { NotificationService } from '../service/notification.service';
import { StudentGroupService } from '../service/student-group.service';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-change-semester',
  templateUrl: './change-semester.component.html',
  styleUrls: ['./change-semester.component.scss']
})
export class ChangeSemesterComponent implements OnInit {
  private subjectTeacherGroup: SubjectTeacherGroup[] = [];
  public subjectsSource: MatTableDataSource<SubjectDTO>;
  public subjectsDisplayedColumns: string[] = ['id', 'name', 'type', 'teacher'];
  public isCreate: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public group: StudentGroupDTO,
              private subjectService: SubjectService, 
              private studentGroupService: StudentGroupService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getSubjectsBySpecialiaztion(this.group.specialization.id);
    
  }
  public setTeacherForSubject(subjectTeacher: SubjectTeacherGroup[]) {
    this.subjectTeacherGroup = subjectTeacher;
  }


  public setSubjectsToArray(subjectTeacherGroup: SubjectTeacherGroup[]){
    this.subjectTeacherGroup = subjectTeacherGroup;  
  }

  private getSubjectsBySpecialiaztion(id: number) {
    this.subjectService.getAllForSpecialization(id).subscribe(
      res => {
        this.subjectsSource = new MatTableDataSource(res);  
      }
    );
  }
  public findAllSubjects(subjects: SubjectDTO[]){
    if(subjects != null && subjects.length > 0){
      this.subjectsSource = new MatTableDataSource(subjects);
      this.subjectTeacherGroup = [];
    }
  }
  public createSemester(semester:any){
    if(semester.isSemesterCreated){
      this.studentGroupService.changeGroupSemester(this.group.id, semester.data.id, this.subjectTeacherGroup).subscribe(
        res=>{
          this.notificationService.showNotification("Semester was changed", StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
        },
        error=>{
          this.notificationService.showNotification(error.error.message, error.statusText, error.status);
        }
      );
    }
  }
  public create(){
    this.isCreate = true;
  }
}
