import { Component, OnInit } from '@angular/core';
import { TeacherSubjectStudentGradeLinkDTO } from '../dto/teacherSubjectStudentGradeLink.dto';
import { Student } from '../model/student.model';
import { StudentGradesService } from '../service/student-grades.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss']
})
export class StudentGradeComponent implements OnInit {

  constructor(private studentGradeService: StudentGradesService, private tokenStorageService: TokenStorageService) { }
  private studentId: number;
  public studentGrades: TeacherSubjectStudentGradeLinkDTO[];
  ngOnInit(): void {
    this.studentId = this.tokenStorageService.getUser().id;
    this.getStudentGrades();
  }


  private getStudentGrades(){
    this.studentGradeService.getStudentGrades(this.studentId).subscribe(
      res=>{
        if(res != null){
          this.studentGrades = res;
        }
      }
    );
  }

}
