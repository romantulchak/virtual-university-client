import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { SemesterDTO } from '../dto/semester.dto';
import { StudentGroupGradeDTO } from '../dto/student-group-grade.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { TeacherSubjectStudentGradeLinkDTO } from '../dto/teacherSubjectStudentGradeLink.dto';
import { Student } from '../model/student.model';
import { StudentGroup } from '../model/studentGroup.model';
import { StudentGroupGrade } from '../model/studentGroupGrade.model';
import { StudentGradesService } from '../service/student-grades.service';
import { StudentGroupService } from '../service/student-group.service';
import { StudentGroupGradeService } from '../service/studentGroupGrade.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss']
})
export class StudentGradeComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, 
              private studentGroupGrade: StudentGroupGradeService,
              private studentGroupService: StudentGroupService) { }
  public studentGrades: StudentGroupGradeDTO[];
  public averageGrade: number = 0;
  public group: StudentGroupDTO;
  public loaded: boolean = false;
  private selectedSemester: SemesterDTO;
  private studentId: number;



  ngOnInit(): void {
    this.studentId = this.tokenStorageService.getUser().id;
    this.getStudentGroup();
  }

  private getStudentGrades(){
    this.studentGroupGrade.getStudentGrades(this.studentId, this.selectedSemester.id).subscribe(
      res=>{
        if(res != null){
          this.averageGrade = res.map(x=> x.grade).reduce((previous, current) => previous + current) / res.length;
        } 
        this.studentGrades = res;
      }
    );
  }
  private getStudentGroup(){
    this.studentGroupService.findStudentGroup(this.studentId).subscribe(
      res=>{
        setTimeout(() => {
          this.loaded = true;
        }, 500);
        this.group = res;
      }
    );
  }


  public getSemesterSelected(semester: SemesterDTO){
    this.selectedSemester = semester;
    this.getStudentGrades();
  }
}
