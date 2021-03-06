import { Component, OnInit } from '@angular/core';
import { SpecializationDTO } from '../dto/specialization.dto';
import { TeacherSubjectStudentGradeLinkDTO } from '../dto/teacherSubjectStudentGradeLink.dto';
import { SpecializationService } from '../service/specialization.service';
import { StudentGradesService } from '../service/student-grades.service';
import { TeacherService } from '../service/teacher.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-teacher-specializations',
  templateUrl: './teacher-specializations.component.html',
  styleUrls: ['./teacher-specializations.component.scss']
})
export class TeacherSpecializationsComponent implements OnInit {

  private teacherId:number;
  public specializations: SpecializationDTO[];
  public studentGrades: TeacherSubjectStudentGradeLinkDTO[];
  constructor(private specializationService: SpecializationService, private tokenStorageService: TokenStorageService, private studentGradesService: StudentGradesService) { }

  ngOnInit(): void {
    this.teacherId = this.tokenStorageService.getUser().id;
    this.getTeacherSpecializations();
  }

  private getTeacherSpecializations(){
    this.specializationService.getTeacherSpecializations(this.teacherId).subscribe(
      res=>{
        console.log(res);
        this.specializations = res;
      }
    );
  }
  public showStudents(specializationId: number, semesterId: number){
    this.studentGradesService.getStudentGradesForTeacher(this.teacherId, specializationId, semesterId).subscribe(
      res=>{
        console.log(res);
        this.studentGrades = res;
      }
    );
    
  }
  public setGrade(grade: number, studentGrade: TeacherSubjectStudentGradeLinkDTO){
    console.log(grade);
    
    studentGrade.grade = grade;
    this.studentGradesService.setGradeForStudent(studentGrade).subscribe(
      res=>{
        console.log("Ok");
        
      }
    );
    
  }
}
