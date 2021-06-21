import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseDTO } from '../dto/course.dto';
import { RoleDTO } from '../dto/role.dto';
import { SpecializationDTO } from '../dto/specialization.dto';
import { Course } from '../model/course.model';
import { StatusEnum } from '../model/enum/status.enum';
import { Teacher } from '../model/teacher.model';
import { CourseService } from '../service/course.service';
import { NotificationService } from '../service/notification.service';
import { RoleService } from '../service/role.service';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})
export class CreateTeacherComponent implements OnInit {
  //TODO: Merger CreateTeacherComponent and CreateStudentComponent
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public rolesFormControl: FormControl = new FormControl();
  public specializationFormControl: FormControl = new FormControl();
  public courses: CourseDTO[];
  public specializations: SpecializationDTO[];
  public roles: RoleDTO[];
  constructor(private formBuilder: FormBuilder, 
              private courseService: CourseService,
              private roleService: RoleService, 
              private teacherService: TeacherService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initForm();
    this.getCousers();
    this.getRoles();
  }

  public initForm(){
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login:['', Validators.required],
      privateEmail: ['', Validators.required],
      universityEmail: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({

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

  private getRoles(){
    this.roleService.getRoles().subscribe(
      res=>{
        let roles = res.filter(role => role.name != 'ROLE_TEACHER' && role.name != 'ROLE_STUDENT');
        this.roles = roles;
      }
    );
  }

  public createTeacher(){
    let teacher = this.buildTeacher();
    this.teacherService.createTeacher(teacher).subscribe(
      res=>{
        this.notificationService.showNotification(`Teacher: ${teacher.firstName} ${teacher.lastName} was created`, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
      },
      error=>{
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
    );
  }

  private buildTeacher(){
    return {
      firstName: this.firstFormGroup.get('firstName').value,
      lastName: this.firstFormGroup.get('lastName').value,
      login: this.firstFormGroup.get('login').value,
      privateEmail: this.firstFormGroup.get('privateEmail').value,
      email: this.firstFormGroup.get('universityEmail').value,
      gender: this.firstFormGroup.get('gender').value,
      roles: this.rolesFormControl.value, 
      specializations: this.specializationFormControl.value,
    }
    
  }
}
