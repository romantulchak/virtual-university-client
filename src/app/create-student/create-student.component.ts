import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/student.model';
import { Subject } from '../model/subject.model';
import { StudentService } from '../service/student.service';
import { CourseService } from '../service/course.service';
import { SpecializationDTO } from '../dto/specialization.dto';
import { CourseDTO } from '../dto/course.dto';
import { RoleService } from '../service/role.service';
import { RoleDTO } from '../dto/role.dto';
import { SemesterService } from '../service/semester.service';
import { StudentDTO } from '../dto/student.dto';
import { Semester } from '../model/semester.model';
import { SemesterDTO } from '../dto/semester.dto';
import { MatStepper } from '@angular/material/stepper';
import { StudentGradesService } from '../service/student-grades.service';
import { TeacherSubjectStudentGradeLinks } from '../model/teacherSubjectStudentGradeLinks.model';
import { SubjectDTO } from '../dto/subject.dto';
import { TeacherDTO } from '../dto/teacher.dto';
import { Teacher } from '../model/teacher.model';
import { NotificationService } from '../service/notification.service';
import { StatusEnum } from '../model/enum/status.enum';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateStudentComponent implements OnInit {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thridFormGroup: FormGroup;
  public forthFormGroup: FormGroup;
  public rolesFormControl = new FormControl();
  public courses: CourseDTO[];
  public roles: RoleDTO[];
  public specializations: SpecializationDTO[];
  public semester: SemesterDTO;

  public currentSubjectId: number;
  public isChecked: boolean = false;
  constructor(private formBuilder: FormBuilder, 
              private studentService: StudentService, 
              private courseService: CourseService, 
              private roleService: RoleService, 
              private semesterService: SemesterService,
              private studentGradeService: StudentGradesService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initForm();
    this.getCousers();
    this.getRoles();
  }

  private initForm(){
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login:['', Validators.required],
      privateEmail: ['', Validators.required],
      universityEmail: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      passport: ['', Validators.required],
      citizen: ['', Validators.required],
      birthDay: ['', Validators.required],
      studentStatus: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.thridFormGroup = this.formBuilder.group({
      course: ['', Validators.required],
      specialization: ['', Validators.required],
    })
    this.forthFormGroup = this.formBuilder.group({
      teacher: ['', Validators.required]
    })
  }
  private getCousers(){
    this.courseService.getCourses().subscribe(
      res=>{
        if(res != null){
          this.courses = res;
        }
      }
    );
  }
  public getCourseSpecializations(id:number){  
    this.specializations = this.courses.filter(x=>x.id == id)[0].specializationDTO;
  }
  public createUser(stepper: MatStepper){
    let student = this.initStudent();
    this.studentService.createStudent(student).subscribe(
      res=>{
          this.notificationService.showNotification(`Student: ${student.firstName} ${student.lastName} was created`, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
          stepper.reset();
      },
      error=>{
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
    );
  }

  private initStudent(){
    return {
      firstName: this.firstFormGroup.get('firstName').value,
      lastName: this.firstFormGroup.get('lastName').value,
      login: this.firstFormGroup.get('login').value,
      privateEmail: this.firstFormGroup.get('privateEmail').value,
      email: this.firstFormGroup.get('universityEmail').value,
      gender: this.firstFormGroup.get('gender').value,
      studentDetails:{
        passport: this.secondFormGroup.get('passport').value,
        citizen: this.secondFormGroup.get('citizen').value,
        birthDay: this.secondFormGroup.get('birthDay').value
      },
      studentStatus: this.secondFormGroup.get('studentStatus').value,
      address:{
        street: this.secondFormGroup.get('street').value,
        postalCode: this.secondFormGroup.get('postalCode').value,
        city: this.secondFormGroup.get('city').value
      },
      roles: this.rolesFormControl.value
    }
  }

  private getRoles(){
    this.roleService.getRoles().subscribe(
      res=>{
        this.roles = res;
      }
    );
  }
}
