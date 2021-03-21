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
import {Student} from '../model/student.model';
import {StudentGroup} from '../model/studentGroup.model';
import {Subject} from '../model/subject.model';
import {SubjectTeacherGroup} from '../model/subjectTeacherGroup.model';
import {Teacher} from '../model/teacher.model';
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
  public subjectsDisplayedColumns: string[] = ['id', 'name', 'teacher'];
  public dataSource: MatTableDataSource<StudentDTO>;
  public subjectsSource: MatTableDataSource<SubjectDTO>;

  private studentToGroup: Student[] = [];
  private subjectTeacherGroup: SubjectTeacherGroup[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private formBuilder: FormBuilder,
              private semesterService: SemesterService,
              private studentService: StudentService,
              private subjectService: SubjectService,
              private specializationService: SpecializationService,
              private studentGroupService: StudentGroupService,
              private filterHelper: FilterHelper) {
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

  public filter(e, dataSource = null) {
    this.filterHelper.filter(e, dataSource);
  }


  private getStudentsWithoutGroup() {
    this.studentService.getStudentsWithoutGroup().subscribe(
      res => {
        if (res != null) {

          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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

  public addStudentToArray(student: Student) {
    if (this.studentToGroup.filter(x => x.id == student.id).length != 0) {
      this.studentToGroup = this.studentToGroup.filter(x => x.id != student.id);
    } else {
      this.studentToGroup.push(student);
    }
  }


  public create() {
    this.group.name = this.formGroup.get('name').value;
    this.group.specialization = this.formGroup.get('specialization').value;
    this.group.semester = this.formGroup.get('semester').value;
    this.group.students = this.studentToGroup;
    this.group.subjectTeacherGroups = this.subjectTeacherGroup;

    this.studentGroupService.create(this.group).subscribe(
      res => {
        console.log('Ok');
      }
    );

  }

  public getDataForSpecialization(specialization: SpecializationDTO) {
    this.getSubjectsBySpecialiaztion(specialization.id);
    this.getSemestersBySpecialization(specialization.id);

  }

  private getSubjectsBySpecialiaztion(id: number) {
    this.subjectService.getAllForSpecialization(id).subscribe(
      res => {
        this.subjectsSource = new MatTableDataSource(res);
      }
    );
  }

  private getSemestersBySpecialization(id: number) {
    this.semesterService.getSemestersForSpecialization(id).subscribe(
      res => {
        this.semesters = res;
      }
    );
  }

  public setTeacherForSubject(subjectTeacher: SubjectTeacherGroup) {
    
    let subjectTeacherGroup: SubjectTeacherGroup = {
      subject: subjectTeacher.subject,
      teacher: subjectTeacher.teacher,
      studentGroup: null
    };
    if (this.subjectTeacherGroup.filter(x => x.subject.id == subjectTeacher.subject.id)) {
      this.subjectTeacherGroup = this.subjectTeacherGroup.filter(x => x.subject.id != subjectTeacher.subject.id);
    }
    this.subjectTeacherGroup.push(subjectTeacherGroup);    
  }
}
