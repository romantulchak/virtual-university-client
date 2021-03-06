import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/student.model';
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
  private student: StudentDTO;
  private studentGrade: TeacherSubjectStudentGradeLinks[] = [];
  constructor(private formBuilder: FormBuilder, 
              private studentService: StudentService, 
              private courseService: CourseService, 
              private roleService: RoleService, 
              private semesterService: SemesterService,
              private studentGradeService: StudentGradesService) { }

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

    let student:Student = {
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
      specializations: [this.thridFormGroup.get('specialization').value],
      roles: this.rolesFormControl.value
    }
    this.studentService.createStudent(student).subscribe(
      res=>{
        if(res != null){
          this.student = res;
          this.getSemesterForStudent(stepper);
        }
      }
    );
  }
  private getSemesterForStudent(stepper: MatStepper){
    this.semesterService.getSemesterForStudent(this.student.specializations[0].id, this.student.currentSemester).subscribe(
      res=>{
        if(res != null){
          this.semester = res;
          setTimeout(() => {
            stepper.next();
          }, 100);
        }
        
      }
    );
  }


  public addStudentGradeToArray(semester:Semester, subject: SubjectDTO, teacher: Teacher){
    this.currentSubjectId = subject.id;
    this.isChecked = true;
    
    let stGrade: TeacherSubjectStudentGradeLinks ={
      specialization: this.thridFormGroup.get('specialization').value,
      subject: subject,
      teacher: teacher,
      student: this.student as unknown as Student,
      semester: semester

    }
    if(this.studentGrade.filter(x=>x.subject.id == subject.id)){
      this.studentGrade = this.studentGrade.filter(x=>x.teacher.id != teacher.id); 
    }
    this.studentGrade.push(stGrade);
  }


  public createStudentGrades(){
    this.studentGradeService.createStudentGrades(this.studentGrade).subscribe(
      res=>{
        console.log("ok");
        
      }
    );
  }
  private getRoles(){
    this.roleService.getRoles().subscribe(
      res=>{
        this.roles = res;
      }
    );
  }
}
