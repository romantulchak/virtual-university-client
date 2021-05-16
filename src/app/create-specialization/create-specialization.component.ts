import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CourseDTO } from '../dto/course.dto';
import { SemesterDTO } from '../dto/semester.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { StatusEnum } from '../model/enum/status.enum';
import { Specialization } from '../model/specialization.model';
import { CourseService } from '../service/course.service';
import { NotificationService } from '../service/notification.service';
import { SpecializationService } from '../service/specialization.service';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-create-specialization',
  templateUrl: './create-specialization.component.html',
  styleUrls: ['./create-specialization.component.scss']
})
export class CreateSpecializationComponent implements OnInit {

  constructor(private courseService: CourseService, private formBuilder: FormBuilder,
              private specializationService: SpecializationService,
              private subjectService: SubjectService,
              private notificationService: NotificationService) { }
  public courses: CourseDTO[];
  public firstFormGroup: FormGroup;
  public semesters: SemesterDTO[];
  public subjects: SubjectDTO[];
  public subjectsFormControl: FormControl = new FormControl();
  ngOnInit(): void {
    this.initForm();
  
    this.getCourses();
    this.getSubjects();
  }

  private initForm(){
    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      courseName: ['', Validators.required],
    });
  }
  private getCourses(){
    this.courseService.getCourses().subscribe(
      res=>{
        this.courses = res;
      }
    );
  }
  private getSubjects(){
    this.subjectService.getAllSubjects().subscribe(
      res=>{
        this.subjects = res;
      }
    );
  }
  public create(){
    let specialization: Specialization = {
      name: this.firstFormGroup.get('name').value,
      course: this.firstFormGroup.get('courseName').value,
      subjects: this.subjectsFormControl.value
    }
    this.specializationService.createSpecialization(specialization).subscribe(
      res => {
        this.notificationService.showNotification(`Specialization: ${specialization.name} was created`, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
      },
      error=>{
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
    );
  }

}
