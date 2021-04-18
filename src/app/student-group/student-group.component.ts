import { Component, OnInit } from '@angular/core';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { TeacherDTO } from '../dto/teacher.dto';
import { StudentGradesService } from '../service/student-grades.service';
import { StudentGroupService } from '../service/student-group.service';
import { StudentGroupGradeService } from '../service/studentGroupGrade.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-student-group',
  templateUrl: './student-group.component.html',
  styleUrls: ['./student-group.component.scss']
})
export class StudentGroupComponent implements OnInit {


  public studentGroup: StudentGroupDTO;
  private studentId: number;
  public gradeForSubject: number;
  public currentSubject: SubjectTeacherGroupDTO = new SubjectTeacherGroupDTO();
  constructor(private groupService: StudentGroupService, private tokenStorageService: TokenStorageService, private groupGradeService: StudentGroupGradeService) { }

  ngOnInit(): void {
    this.studentId = this.tokenStorageService.getUser().id;
    this.getStudentGroup();
  }

  private getStudentGroup(){
    this.groupService.findStudentGroup(this.studentId).subscribe(
      res=>{
        this.studentGroup = res;
      },
      err=>{
        console.log(err);
        
      }
    );
  }

  public selectedSubject(subject: SubjectDTO, teacher: TeacherDTO){
    console.log(subject);
    
    if(this.currentSubject.subject != subject){
      this.currentSubject.subject = subject;
      this.currentSubject.teacher = teacher;
      this.getGradeForSubject(subject.id);
    }
  }

  private getGradeForSubject(subjectId: number){
    this.groupGradeService.getGradeForStudentBySubject(this.studentGroup.id, subjectId, this.studentId).subscribe(
      res=>{
        this.gradeForSubject = res;
      }
    );
  }
  

}
