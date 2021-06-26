import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AllSubjectsButtonComponent } from '../all-subjects-button/all-subjects-button.component';
import { ChangeSemesterComponent } from '../change-semester/change-semester.component';
import { StudentDTO } from '../dto/student.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { SubjectTeacherGroupDTO } from '../dto/subjectTeacherGroup.dto';
import { TeacherDTO } from '../dto/teacher.dto';
import { StatusEnum } from '../model/enum/status.enum';
import { Student } from '../model/student.model';
import { Subject } from '../model/subject.model';
import { SubjectTeacherGroup } from '../model/subjectTeacherGroup.model';
import { Teacher } from '../model/teacher.model';
import { NotificationService } from '../service/notification.service';
import { SemesterService } from '../service/semester.service';
import { StudentGroupService } from '../service/student-group.service';
import { StudentService } from '../service/student.service';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit, AfterViewInit {
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
  private groupId: number;

  @ViewChild('allSubjectsButton') allSubjectsButton: AllSubjectsButtonComponent;

  constructor(private router: ActivatedRoute,
              private groupService: StudentGroupService,
              private studentService: StudentService,
              private subjectService: SubjectService,
              private dialog: MatDialog,
              private notificationService: NotificationService) { 
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

  ngAfterViewInit(): void{
  }

  private findGroupDetails(){
    this.groupService.findGroupById(this.groupId).subscribe(
      res=>{
        if(res != null){
          this.groupDetais = res;
          this.source = new MatTableDataSource<StudentDTO>(res.students);
          this.subjectsSource = new MatTableDataSource<SubjectTeacherGroup>(this.convetToSubjectSource(res.subjects));
          this.loading = false;
          this.getAvailableSubjectsForGroup();
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
    this.studentToGroup = students;
  }
  public getAvailableSubjectsForGroup(){
    this.subjectService.getAvailableSubjectsForGroup(this.groupId).subscribe(
      res=>{
        if(res != null && res.length > 0){
          this.subjectsToAddSource = new MatTableDataSource<SubjectDTO>(res);
        }else{
          this.allSubjectsButton.findSubjects(this.groupDetais.semester.id);
        }
      }
    );
  }
  public addStudentsToGroup(){
    this.groupService.addStudentsToGroup(this.studentToGroup, this.groupId).subscribe(
      res=>{
        this.updateStudentsTableData();
        this.studentToGroup =[];
        this.notificationService.showNotification('Student was added to group', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
        this.groupDetais.studentsCount++;
      },
      error=>{
        this.notificationService.showNotification(error.error.message,error.statusText, error.status);
      }
    );
  }


  public addSubjectToGroup(){
    this.groupService.addSubjectsToGroup(this.subjectTeacherGroup, this.groupId).subscribe(
      res=>{
        this.updateSubjectsTableData();  
        this.subjectTeacherGroup = [];
        this.notificationService.showNotification('Subject was added to group', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
      },
      error=>{
        this.notificationService.showNotification(error.error.message,error.statusText, error.status);
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

  public removeStudent(student: StudentDTO){
    this.groupService.deleteStudentFromGroup(this.groupId, student.id).subscribe(
      res=>{
        if(this.source.data.filter(s=>s.id == student.id) != null){
          this.studentsToAddSource.data.push(student);
          this.studentsToAddSource = new MatTableDataSource<StudentDTO>(this.studentsToAddSource.data);
          this.source.data = this.source.data.filter(s => s.id != student.id);
          this.source = new MatTableDataSource(this.source.data);
        } 
        this.notificationService.showNotification('Student was removed from group', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
        this.groupDetais.studentsCount--;
      },
      error=>{
        this.notificationService.showNotification(error.error.message,error.statusText, error.status);
      }
    );
  }

  public changeSemester(){
      this.dialog.open(ChangeSemesterComponent, {
        data: this.groupDetais
      });
  }
  public findAllSubjects(subjects: SubjectDTO[]){
    this.subjectsToAddSource = new MatTableDataSource(subjects);
  }
}
