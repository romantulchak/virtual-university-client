import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StudentDTO } from '../dto/student.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { TeacherDTO } from '../dto/teacher.dto';
import { Student } from '../model/student.model';
import { Subject } from '../model/subject.model';
import { SubjectTeacherGroup } from '../model/subjectTeacherGroup.model';
import { Teacher } from '../model/teacher.model';
import { StudentGroupService } from '../service/student-group.service';
import { StudentService } from '../service/student.service';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  private groupId: number;
  public groupDetais: StudentGroupDTO;
  public loading: boolean = true;

  public source: MatTableDataSource<StudentDTO>;
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'delete'];

  public subjectsSource: MatTableDataSource<SubjectTeacherGroup>;
  public subjectsDisplayedColumns: string[] = ['id', 'name', 'type', 'teacherDetails'];

  public studentsToAddSource: MatTableDataSource<StudentDTO>;
  public studentsToAddDisplayedColumns: string[] = ['id', 'firstName', 'lastName', 'add'];


  public subjectsToAddSource: MatTableDataSource<SubjectDTO>;
  public subjectsToAddDisplayedColumns: string[] = ['id', 'name', 'type', 'teacher'];


  public studentToGroup: StudentDTO[] = [];
  public subjectTeacherGroup: SubjectTeacherGroup[] = [];

  constructor(private router: ActivatedRoute,
              private groupService: StudentGroupService,
              private studentService: StudentService,
              private subjectService: SubjectService) { 
    this.router.params.subscribe(
      res=>{
        this.groupId = res.id;
      }
    ); 
  }

  ngOnInit(): void {
    this.findGroupDetails();    
    this.findStudentsWithoutGroup();
    this.getAvailableSubjectsForGroup();
  }


  private findGroupDetails(){
    this.groupService.findGroupById(this.groupId).subscribe(
      res=>{
        if(res != null){
          console.log(res);
          
          this.groupDetais = res;
          this.source = new MatTableDataSource<StudentDTO>(res.students);
          this.subjectsSource = new MatTableDataSource<SubjectTeacherGroup>(this.convetToSubjectSource(res.subjects));
          this.loading = false;
        }
      }
    );
  }


  private findStudentsWithoutGroup(){
    this.studentService.getStudentsWithoutGroup().subscribe(
      res=>{
        this.studentsToAddSource = new MatTableDataSource<StudentDTO>(res);
        
      }
    );
  }
  public addStudentToArray(students: StudentDTO[]) {
    console.log(students);
    
    
    this.studentToGroup = students;
  }
  public getAvailableSubjectsForGroup(){
    this.subjectService.getAvailableSubjectsForGroup(this.groupId).subscribe(
      res=>{
        this.subjectsToAddSource = new MatTableDataSource<SubjectDTO>(res);
      }
    );
  }
  public addStudentsToGroup(){
    this.groupService.addStudentsToGroup(this.studentToGroup, this.groupId).subscribe(
      res=>{
        this.updateStudentsTableData();
        this.studentToGroup =[];
      }
    );
  }


  public addSubjectToGroup(){
    
    this.groupService.addSubjectsToGroup(this.subjectTeacherGroup, this.groupId).subscribe(
      res=>{
        this.updateSubjectsTableData();  
        this.subjectTeacherGroup = [];
      }
    );
  }

  public setSubjectsToArray(subjectTeacherGroup: SubjectTeacherGroup[]){
    this.subjectTeacherGroup = subjectTeacherGroup; 
  }
  private updateSubjectsTableData(){
    this.subjectTeacherGroup.forEach(x=>{
      if(this.subjectTeacherGroup.includes(x)){
        this.subjectsToAddSource = new MatTableDataSource<SubjectDTO>(this.subjectsToAddSource.data.filter(s => s.id != x.subject.id ));
        this.subjectsSource.data.push(this.convertToSubjectTeacherGroup(x.subject, x.teacher));
         this.subjectsSource = new MatTableDataSource<SubjectTeacherGroup>(this.subjectsSource.data);
      }
    });
  }
  private updateStudentsTableData(){
    this.studentToGroup.forEach(x=>{
      if(this.studentsToAddSource.data.includes(x)){
        this.studentsToAddSource = new MatTableDataSource<StudentDTO>(this.studentsToAddSource.data.filter(s => s != x));
        this.source.data.push(x);
        this.source = new MatTableDataSource<StudentDTO>(this.source.data);
      }
    })
  }
 
  //TODO: fix it
  private convertToSubjectTeacherGroup(subject: SubjectDTO | Subject, teacher: TeacherDTO | Teacher): SubjectTeacherGroup{
    let subjectTeacherGroup ={
      id: subject.id,
      name: subject.name,
      type: subject.type,
      teacher:{
        id: teacher.id,
        name: teacher.firstName + ' ' + teacher.lastName
      }
    }
    return subjectTeacherGroup as unknown as SubjectTeacherGroup;
  }  

  private convetToSubjectSource(subjects: SubjectTeacherGroupDTO[]){
  
    let subjectsArr = [];
          subjects.forEach(subjectTeacherGroup=>{
            let subject = {
              id: subjectTeacherGroup.subject.id,
              name: subjectTeacherGroup.subject.name,
              type: subjectTeacherGroup.subject.type,
              teacher: {
                id: subjectTeacherGroup.teacher.id,
                name: subjectTeacherGroup.teacher.firstName + ' ' + subjectTeacherGroup.teacher.lastName
              }  
            }
            subjectsArr.push(subject);
          });
      return subjectsArr;
  }
}
