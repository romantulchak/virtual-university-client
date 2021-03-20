import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CourseDTO } from '../dto/course.dto';
import { SemesterDTO } from '../dto/semester.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { Specialization } from '../model/specialization.model';
import { CourseService } from '../service/course.service';
import { SemesterService } from '../service/semester.service';
import { SpecializationService } from '../service/specialization.service';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-create-specialization',
  templateUrl: './create-specialization.component.html',
  styleUrls: ['./create-specialization.component.scss']
})
export class CreateSpecializationComponent implements OnInit {

  constructor(private courseService: CourseService, private formBuilder: FormBuilder,
              private semesterService: SemesterService,
              private specializationService: SpecializationService,
              private subjectService: SubjectService) { }
  public courses: CourseDTO[];
  public firstFormGroup: FormGroup;
  public semesters: SemesterDTO[];
  public subjects: SubjectDTO[];
  public subjectsFormControl: FormControl = new FormControl();
  ngOnInit(): void {
    this.initForm();
  
    this.getCourses();
    this.getSemesters();
    this.getSubjects();
  }

  private initForm(){
    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      courseName: ['', Validators.required],
      semester:['', Validators.required]
    });
  }
  private getCourses(){
    this.courseService.getCourses().subscribe(
      res=>{
        this.courses = res;
      }
    );
  }
  private getSemesters(){
    this.semesterService.getSemesters().subscribe(
      res=>{
        this.semesters = res;
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
      semesters: [this.firstFormGroup.get('semester').value],
      subjects: this.subjectsFormControl.value
    }
    this.specializationService.createSpecialization(specialization).subscribe(
      res=>{
        console.log("Ok");
        
      }
    );
  }

}
