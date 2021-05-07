import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpecializationDTO } from '../dto/specialization.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { SemesterEnum } from '../model/enum/semester.enum';
import { Semester } from '../model/semester.model';
import { Specialization } from '../model/specialization.model';
import { SemesterService } from '../service/semester.service';
import { SpecializationService } from '../service/specialization.service';
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
  public specializations: SpecializationDTO[];
  public semesterRange: FormGroup;
  @Input("specialization") specialization: Specialization; 
  @Input("showSpecializations") showSpecializations: boolean = true;
  @Output("createSemester") semester: EventEmitter<any> = new EventEmitter<any>();;
  constructor(private formBuilder: FormBuilder, private semesterService: SemesterService, private specializationService: SpecializationService) { }

  ngOnInit(): void {
    this.initTable();
    if(this.showSpecializations){
      this.getSpecializations();
    }
  }
  private initTable() {
    this.semesterForm = this.formBuilder.group({
      name: ['', Validators.required],
      semesterNumber: [1, Validators.required],
      specialization: ['', Validators.required]
    });
    this.semesterRange = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

  public createSemester(){
    let semester: Semester = this.buildSemester()
   
    this.semesterService.createSemester(semester).subscribe(
      res=>{
        let semester = {
          isSemesterCreated: true,
          data: res
        }
        this.semester.emit(semester);
      }
      
    );
  }


  private buildSemester(): Semester {
    let specialization = this.semesterForm.get('specialization').value;
    return {
      name: this.semesterForm.get('name').value,
      semesterNumber: this.semesterForm.get('semesterNumber').value,
      startDate: this.semesterRange.get('start').value,
      endDate: this.semesterRange.get('end').value,
      specialization: specialization == '' ? this.specialization : specialization
    };
  }

  private getSpecializations(){
    this.specializationService.getAllSpecializations().subscribe(
      res=>{
        this.specializations = res;
        console.log(res);
        
      }
    );
  }
}
