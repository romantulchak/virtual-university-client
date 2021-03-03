import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherDTO } from '../dto/teacher.dto';
import { Subject } from '../model/subject.model';
import { SubjectService } from '../service/subject.service';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent implements OnInit {

  constructor(private teacherService: TeacherService, private subjectService: SubjectService, private formBuilder: FormBuilder) { }
  public teachers: TeacherDTO[];
  public subject: Subject = new Subject();
  public firstFormGroup: FormGroup;
  public teacherFormControl: FormControl = new FormControl();

  ngOnInit(): void {
    this.getAllTeachers();

    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  private getAllTeachers(){
    this.teacherService.getAllTeachers().subscribe(
      res=>{
        this.teachers = res;
      }
    )
  }

  public createSubject(){
    this.subject.name = this.firstFormGroup.get('name').value;
    this.subject.type = this.firstFormGroup.get('type').value;
    this.subject.teachers = this.teacherFormControl.value;
    this.subjectService.createSubject(this.subject).subscribe(
      res=>{
        console.log("Ok");
        
      }
    );
    
    
  }

}
