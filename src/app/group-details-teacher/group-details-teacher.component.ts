import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StudentGroupGradeDTO } from '../dto/student-group-grade.dto';
import { StudentDTO } from '../dto/student.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { FilterHelper } from '../helpers/filter.helper';
import { Student } from '../model/student.model';
import { StudentGroupGrade } from '../model/studentGroupGrade.model';
import { Subject } from '../model/subject.model';
import { StudentGroupService } from '../service/student-group.service';
import { StudentGroupGradeService } from '../service/studentGroupGrade.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-group-details-teacher',
  templateUrl: './group-details-teacher.component.html',
  styleUrls: ['./group-details-teacher.component.scss']
})
export class GroupDetailsTeacherComponent implements OnInit {
  private groupId: number;
  private teacherId: number;
  public group: StudentGroupDTO;
  public source: MatTableDataSource<StudentGroupGradeDTO>;
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'grade'];
  public grades: number[] = [2, 3, 3.5, 4, 4.5, 5];
  private studentGroupGrades: StudentGroupGrade[] = [];
  private subject: Subject;
  constructor(private router: ActivatedRoute,
              private studentGroupService: StudentGroupService,
              private tokenStorageService: TokenStorageService, 
              private filterHelper: FilterHelper,
              private studentGroupGradeService: StudentGroupGradeService) {

      router.params.subscribe(
        res=>{
          this.groupId = res.id;
        }
      );

   }

  ngOnInit(): void {
    this.teacherId = this.tokenStorageService.getUser().id;
    this.getGroupDetails();
  }

  private getGroupDetails(){
    this.studentGroupService.findGroupByIdForTeacher(this.groupId, this.teacherId).subscribe(
      res=>{
        console.log(res);
        this.group = res;
        
      },
      error=>{
        console.log("You haven't access to this group");
        
      }
    );
  }

  public selectSubject(subject: Subject){
    this.subject = subject;
    this.findStudentGrades();
   
      
  }
  public filter(e: any, source: any){
    this.filterHelper.filter(e, source);
  }
  public changeGrade(grade:number, studentGroupGradeId: number){
      let studentGroupGrade: any = {
          id: studentGroupGradeId,
          grade: grade
      }
      this.studentGroupGrades.push(studentGroupGrade);
  }

  public setGrade(){
this.studentGroupGradeService.setGrade(this.studentGroupGrades).subscribe(
      res=>{
        this.findStudentGrades();
        
      }
    );
  }

  private findStudentGrades(){
    this.studentGroupGradeService.getStudentGradesBySubjectAndGroupForTeacher(this.groupId, this.subject.id, this.teacherId).subscribe(
      res=>{
        console.log(res);
        
        this.source = new MatTableDataSource(res);
        
      }
    );
  }

  

}
