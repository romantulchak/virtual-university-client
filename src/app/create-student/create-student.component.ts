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
  public rolesFormControl = new FormControl();
  public courses: CourseDTO[];
  public roles: RoleDTO[];
  public specializations: SpecializationDTO[];
  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private courseService: CourseService, private roleService: RoleService) { }

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
  public createUser(){

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
        console.log("res");
        
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
