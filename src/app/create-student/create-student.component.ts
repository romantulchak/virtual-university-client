import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { CourseService } from '../service/course.service';
import { SpecializationDTO } from '../dto/specialization.dto';
import { RoleDTO } from '../dto/role.dto';
import { SemesterDTO } from '../dto/semester.dto';
import { MatStepper } from '@angular/material/stepper';
import { StudentGradesService } from '../service/student-grades.service';
import { NotificationService } from '../service/notification.service';
import { StatusEnum } from '../model/enum/status.enum';
import {Student} from '../model/student.model';

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
  public roles: RoleDTO[];
  public specializations: SpecializationDTO[];
  public semester: SemesterDTO;
  public isChecked = false;

  constructor(private formBuilder: FormBuilder,
              private studentService: StudentService,
              private courseService: CourseService,
              private studentGradeService: StudentGradesService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void{
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login: ['', Validators.required],
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
    });
    this.forthFormGroup = this.formBuilder.group({
      teacher: ['', Validators.required]
    });
  }

  public createUser(stepper: MatStepper): void{
    const student = this.initStudent();
    this.studentService.createStudent(student).subscribe(
      () => {
          this.notificationService.showNotification(`Student: ${student.firstName} ${student.lastName} was created`, StatusEnum[StatusEnum.OK], StatusEnum.OK);
          stepper.reset();
      },
      error => {
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
    );
  }

  private initStudent(): Student{
    return {
      firstName: this.firstFormGroup.get('firstName').value,
      lastName: this.firstFormGroup.get('lastName').value,
      login: this.firstFormGroup.get('login').value,
      privateEmail: this.firstFormGroup.get('privateEmail').value,
      email: this.firstFormGroup.get('universityEmail').value,
      gender: this.firstFormGroup.get('gender').value,
      studentDetails: {
        passport: this.secondFormGroup.get('passport').value,
        citizen: this.secondFormGroup.get('citizen').value,
        birthDay: this.secondFormGroup.get('birthDay').value
      },
      studentStatus: this.secondFormGroup.get('studentStatus').value,
      address: {
        street: this.secondFormGroup.get('street').value,
        postalCode: this.secondFormGroup.get('postalCode').value,
        city: this.secondFormGroup.get('city').value
      },
      roles: []
    };
  }

}
