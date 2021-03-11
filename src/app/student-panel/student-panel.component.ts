import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StudentDTO } from '../dto/student.dto';
import { TeacherDTO } from '../dto/teacher.dto';
import { TeacherSubjectStudentGradeLinkDTO } from '../dto/teacherSubjectStudentGradeLink.dto';
import { StudentGradesService } from '../service/student-grades.service';
import { StudentService } from '../service/student.service';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.scss']
})
export class StudentPanelComponent implements OnInit {


  public firstName: string;
  public lastName: string;

  public students: StudentDTO[];

  public studentGrades: TeacherSubjectStudentGradeLinkDTO[];
  public teachers: TeacherDTO[];
  public teachersFormControl: FormControl = new FormControl();
  constructor(private studentService: StudentService, private studentGradesService: StudentGradesService, private teacherService: TeacherService) { }

  ngOnInit(): void {
  }

  public findStudentByName(){
    this.studentService.getStudentByName(this.firstName, this.lastName).subscribe(
      res=>{
        this.students = res;
      }
    );
  }
  public getStudentGrades(studentId: number, semesterId: number){
      this.studentGradesService.studentGradesBySemester(studentId, semesterId).subscribe(
        res=>{
          this.studentGrades = res;
          
        }
      );
  }

  public showTeachers(subjectId: number){
    this.teacherService.findTeachersBySubject(subjectId).subscribe(
      res=>{
        console.log(res);
        this.teachers = res;
      }
    );
  } 

  public changeTeacher(teacher: TeacherDTO, subjectId: number){
    
  }
}
