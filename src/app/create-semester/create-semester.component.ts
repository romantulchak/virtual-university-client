import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectDTO } from '../dto/subject.dto';
import { SemesterEnum } from '../model/enum/semester.enum';
import { Semester } from '../model/semester.model';
import { SemesterService } from '../service/semester.service';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-create-semester',
  templateUrl: './create-semester.component.html',
  styleUrls: ['./create-semester.component.scss']
})
export class CreateSemesterComponent implements OnInit {
  public subjects: SubjectDTO[];
  public subjectFormControl = new FormControl();
  public semesterForm:FormGroup;
  constructor(private subjectService: SubjectService, private formBuilder: FormBuilder, private semesterService: SemesterService) { }

  ngOnInit(): void {
    this.semesterForm = this.formBuilder.group({
      name:['', Validators.required],
      semesterNumber:[1, Validators.required]
    })
    this.getAllSubjects();
    
  }

  private getAllSubjects(){
    this.subjectService.getAllSubjects().subscribe(
      res=>{
        if(res != null){
          this.subjects = res;
        }
      }
    );
  }
  public createSemester(){
    let semester: Semester = {
      name: this.semesterForm.get('name').value,
      semesterNumber: this.semesterForm.get('semesterNumber').value
    }
   
    
    this.semesterService.createSemester(semester).subscribe(
      res=>{
        console.log(res);
        
      }
      
    );
  }
}
