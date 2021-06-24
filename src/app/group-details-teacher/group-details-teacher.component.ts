import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TimeoutError } from 'rxjs';
import { PageableDTO } from '../dto/pageable/pageable.dto';
import { SemesterDTO } from '../dto/semester.dto';
import { StudentGroupGradeDTO } from '../dto/student-group-grade.dto';
import { StudentDTO } from '../dto/student.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { FilterHelper } from '../helpers/filter.helper';
import { StatusEnum } from '../model/enum/status.enum';
import { Student } from '../model/student.model';
import { StudentGroupGrade } from '../model/studentGroupGrade.model';
import { SubjectFile } from '../model/subject-file.model';
import { Subject } from '../model/subject.model';
import { NotificationService } from '../service/notification.service';
import { ScheduleService } from '../service/schedule.service';
import { StudentGroupService } from '../service/student-group.service';
import { StudentGroupGradeService } from '../service/studentGroupGrade.service';
import { SubjectTeacherService } from '../service/subject-teacher.service';
import { SubjectService } from '../service/subject.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-group-details-teacher',
  templateUrl: './group-details-teacher.component.html',
  styleUrls: ['./group-details-teacher.component.scss']
})
export class GroupDetailsTeacherComponent implements OnInit {

  public group: StudentGroupDTO;

  public grades: number[] = [2, 3, 3.5, 4, 4.5, 5];
  public loaded: boolean = true;
  public selectedSemester: SemesterDTO;
  public files: File[];
  public studentGrades: StudentGroupGradeDTO[];
  public subjectFiles: SubjectFile[];
  public gradesNotZero: boolean = true;
  public showFiles: boolean = false;
  public isShowStudents: boolean = false;
  public showChart: boolean = false;
  public totalPages: number;
  public tableSize: number = 5;
  public subject: Subject;
  public gradesForChart: StudentGroupGradeDTO[];
  private groupId: number;
  private teacherId: number;
  private studentGroupGrades: StudentGroupGrade[] = [];
  private currentPage: number = 1;

  constructor(private router: ActivatedRoute,
              private studentGroupService: StudentGroupService,
              private tokenStorageService: TokenStorageService, 
              private filterHelper: FilterHelper,
              private studentGroupGradeService: StudentGroupGradeService,
              private subjectTeacherService: SubjectTeacherService,
              private subjectService: SubjectService,
              private notificationService: NotificationService) {
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
    this.studentGroupService.findGroup(this.groupId).subscribe(
      res=>{
        this.group = res;
        this.studentGroupService.teacherCurrentGroup.next(res);
      },
      error=>{
        console.log("You haven't access to this group");
      }
    );
  }

  public selectSubject(subject: Subject){
    if(this.subject != subject){
      this.subject = subject;
      this.getTeacherFiles();
    }
  }

  private getTeacherFiles(){
    this.subjectService.findTeacherFilesForSubject(this.subject.id, this.group.id, this.selectedSemester.id).subscribe(
      res=>{
        this.subjectFiles = res;        
      }
    );    
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
        //TODO: make it only on the client side
        this.findStudentGrades(this.currentPage);
        
      }
    );
  }

  public showStudents(){
    this.isShowStudents = !this.isShowStudents;
    
    if(this.isShowStudents){
      this.findStudentGrades(1);
    }
  }

  public findStudentGrades(page:number){
    this.loaded = false;
    this.studentGroupGradeService.getStudentGradesBySubjectAndGroupForTeacher(this.groupId, this.subject.id, this.teacherId, this.selectedSemester.id, page, this.tableSize).subscribe(
      res=>{
        if(res != null){
          this.loaded = true;
          this.studentGrades = res.data;
          this.totalPages = res.totalPages;
          this.currentPage = page;
        }
      }
    );
  }

  private findSubjects(){
    this.subjectTeacherService.findSubjectsForGroupByTeacherAndSemester(this.group.id, this.selectedSemester.id, this.teacherId).subscribe(
      res=>{
        this.group.subjects = res;
      }
    );
  }

  public getSemesterSelected(semester: SemesterDTO){
    this.selectedSemester = semester;
    this.findSubjects();
    this.studentGrades = null;
  }


  public selectFiles(event: any){
    this.files = [];
    this.files = event.target.files;  
  }

  public upload(){
    this.subjectService.uploadTeacherFiles(this.files, this.subject.id, this.group.id, this.selectedSemester.id).subscribe(
      res=>{
        this.notificationService.showNotification(`Files uploeded`, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
        this.getTeacherFiles();
      },
      error=>{
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
    );
  }

  private checkIfAllGradesNotZer(){
    this.gradesNotZero = true;
    for(let grade of this.gradesForChart){
      if(grade.grade == 0){
        this.gradesNotZero = false;
        break;
      }
    }
  }

  public findGradesForChart(){
    this.showChart = !this.showChart;
    this.studentGroupGradeService.findGradesForChart(this.groupId, this.subject.id, this.teacherId, this.selectedSemester.id).subscribe(
      res=>{
        this.gradesForChart = res;
        this.checkIfAllGradesNotZer();
      }
    )
  }
}
