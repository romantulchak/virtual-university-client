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

  constructor(private courseService: CourseService, private formBuilder: FormBuilder, private semesterService: SemesterService, private specializationService: SpecializationService) { }
  public courses: CourseDTO[];
  public firstFormGroup: FormGroup;
  public semesters: SemesterDTO;
  public subjects: SubjectDTO[];
  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      courseName: ['', Validators.required],
      semester:['', Validators.required]
    });
  
    this.getCourses();
    this.getSemesters();
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
  public showSubjects(event){
    this.subjects = event.value.subjects;
  }
  public create(){
    let specialization: Specialization = {
      name: this.firstFormGroup.get('name').value,
      course: this.firstFormGroup.get('courseName').value,
      semesters: [this.firstFormGroup.get('semester').value] 
    }
    this.specializationService.createSpecialization(specialization).subscribe(
      res=>{
        console.log("Ok");
        
      }
    );
    
  }
}
