import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SemesterDTO} from '../dto/semester.dto';
import {SpecializationDTO} from '../dto/specialization.dto';
import {StudentDTO} from '../dto/student.dto';
import {SubjectDTO} from '../dto/subject.dto';
import { FilterHelper } from '../helpers/filter.helper';
import { StatusEnum } from '../model/enum/status.enum';
import {Student} from '../model/student.model';
import {StudentGroup} from '../model/studentGroup.model';
import {Subject} from '../model/subject.model';
import {SubjectTeacherGroup} from '../model/subjectTeacherGroup.model';
import {Teacher} from '../model/teacher.model';
import { NotificationService } from '../service/notification.service';
import {SemesterService} from '../service/semester.service';
import {SpecializationService} from '../service/specialization.service';
import {StudentGroupService} from '../service/student-group.service';
import {StudentService} from '../service/student.service';
import {SubjectService} from '../service/subject.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit, AfterViewInit {
  public formGroup: FormGroup;
  public semesters: SemesterDTO[];

  public group: StudentGroup = new StudentGroup();
  public specializations: SpecializationDTO[];

  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'add'];
  public subjectsDisplayedColumns: string[] = ['id', 'name','type', 'teacher'];
  public dataSource: MatTableDataSource<StudentDTO>;
  public subjectsSource: MatTableDataSource<SubjectDTO>;

  private studentToGroup: Student[] = [];
  private subjectTeacherGroup: SubjectTeacherGroup[] = [];

  public isCreateGroup: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private studentService: StudentService,
              private subjectService: SubjectService,
              private specializationService: SpecializationService,
              private studentGroupService: StudentGroupService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getStudentsWithoutGroup();
    this.getSpecializations();
  }

  ngAfterViewInit() {

  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      semester: ['', Validators.required],
      specialization: ['', Validators.required]
    });
  }


  private getStudentsWithoutGroup() {
    this.studentService.getStudentsWithoutGroup().subscribe(
      res => {
        if (res != null) {
          this.dataSource = new MatTableDataSource(res);
        }
      }
    );
  }

  private getSpecializations() {
    this.specializationService.getAllSpecializations().subscribe(
      res => {
        this.specializations = res;
      }
    );
  }

  public addStudentToArray(students: Student[]) {
    this.studentToGroup = students;
  }

  public createGroup(){
    this.isCreateGroup = true;
  }

  public create(semester?:any) {
    if(semester != null && semester.isSemesterCreated){
      this.group.name = this.formGroup.get('name').value;
      this.group.specialization = this.formGroup.get('specialization').value;
      this.group.semester = semester.data;
      this.group.students = this.studentToGroup;
      this.group.subjectTeacherGroups = this.subjectTeacherGroup;
      this.studentGroupService.create(this.group).subscribe(
        res => {
          this.notificationService.showNotification(`Group: ${this.group.name} was created`, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
        },
        error=>{
          this.notificationService.showNotification(error.error.message, error.statusText, error.status);
        }
      );
    }

  }

  public getDataForSpecialization(specialization: SpecializationDTO) {
    this.getSubjectsBySpecialiaztion(specialization.id);

  }

  private getSubjectsBySpecialiaztion(id: number) {
    this.subjectService.getAllForSpecialization(id).subscribe(
      res => {
       
        this.subjectsSource = new MatTableDataSource(res);  
      }
    );
  }

  public semesterCreated(semester:any){
    if(semester.isSemesterCreated){
      this.create();
    }
  }

  public setTeacherForSubject(subjectTeacher: SubjectTeacherGroup[]) {
    this.subjectTeacherGroup = subjectTeacher;
  }
}
