import { Component, OnInit } from '@angular/core';
import { StudentGroupGradeDTO } from '../dto/student-group-grade.dto';
import { TeacherSubjectStudentGradeLinkDTO } from '../dto/teacherSubjectStudentGradeLink.dto';
import { Student } from '../model/student.model';
import { StudentGroupGrade } from '../model/studentGroupGrade.model';
import { StudentGradesService } from '../service/student-grades.service';
import { StudentGroupGradeService } from '../service/studentGroupGrade.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss']
})
export class StudentGradeComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private studentGroupGrade: StudentGroupGradeService) { }
  private studentId: number;
  public studentGrades: StudentGroupGradeDTO[];
  public averageGrade: number = 0;
  ngOnInit(): void {
    this.studentId = this.tokenStorageService.getUser().id;
    this.getStudentGrades();
  }


  private getStudentGrades(){
    this.studentGroupGrade.getStudentGrades(this.studentId).subscribe(
      res=>{
        this.averageGrade = res.map(x=> x.grade).reduce((previous, current) => previous + current) / res.length;
       
        this.studentGrades = res;
      }
    );
  }

}
