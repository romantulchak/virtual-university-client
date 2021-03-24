import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StudentDTO } from '../dto/student.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { Student } from '../model/student.model';
import { StudentGroupService } from '../service/student-group.service';
import { StudentService } from '../service/student.service';

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

  public subjectsSource: MatTableDataSource<SubjectTeacherGroupDTO>;
  public subjectsDisplayedColumns: string[] = ['id', 'name', 'type', 'teacherDetails'];

  public studentsToAddSource: MatTableDataSource<StudentDTO>;
  public studentsToAddDisplayedColumns: string[] = ['id', 'firstName', 'lastName', 'add'];

  public studentToGroup: StudentDTO[] = [];

  constructor(private router: ActivatedRoute, private groupService: StudentGroupService, private studentService: StudentService) { 
    this.router.params.subscribe(
      res=>{
        this.groupId = res.id;
      }
    ); 
  }

  ngOnInit(): void {
    this.findGroupDetails();    
    this.findStudentsWithoutGroup();
  }


  private findGroupDetails(){
    this.groupService.findGroupById(this.groupId).subscribe(
      res=>{
        if(res != null){
          this.groupDetais = res;
          this.source = new MatTableDataSource<StudentDTO>(res.students);
          this.convetToSubjectSource(res.subjects);
          this.loading = false;
        }
      }
    );
  }

  private convetToSubjectSource(subjects: SubjectTeacherGroupDTO[]){
    let subjectsArr = [];
          subjects.forEach(subjectTeacherGroup=>{
            let subject = {
              id: subjectTeacherGroup.id,
              name: subjectTeacherGroup.subject.name,
              type: subjectTeacherGroup.subject.type,
              teacher: {
                id: subjectTeacherGroup.teacher.id,
                name: subjectTeacherGroup.teacher.firstName + ' ' + subjectTeacherGroup.teacher.lastName
              }  
            }
            subjectsArr.push(subject);
          });
      this.subjectsSource = new MatTableDataSource<SubjectTeacherGroupDTO>(subjectsArr);
  }

  private findStudentsWithoutGroup(){
    this.studentService.getStudentsWithoutGroup().subscribe(
      res=>{
        this.studentsToAddSource = new MatTableDataSource<StudentDTO>(res);
        
      }
    );
  }
  public addStudentToArray(students: StudentDTO[]) {
    this.studentToGroup = students;
  }
  public addStudentsToGroup(){
    this.groupService.addStudentsToGroup(this.studentToGroup, this.groupId).subscribe(
      res=>{
        this.updateTableData();
      }
    );
  
      

  }
  private updateTableData(){
    this.studentToGroup.forEach(x=>{
      if(this.studentsToAddSource.data.includes(x)){
        this.studentsToAddSource = new MatTableDataSource<StudentDTO>(this.studentsToAddSource.data.filter(s => s != x));
        this.source.data.push(x);
        this.source = new MatTableDataSource<StudentDTO>(this.source.data);
      }
    })
  }
}
