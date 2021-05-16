import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpecializationDTO } from '../dto/specialization.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { SemesterEnum } from '../model/enum/semester.enum';
import { StatusEnum } from '../model/enum/status.enum';
import { Semester } from '../model/semester.model';
import { Specialization } from '../model/specialization.model';
import { NotificationService } from '../service/notification.service';
import { SemesterService } from '../service/semester.service';
import { SpecializationService } from '../service/specialization.service';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-create-semester',
  templateUrl: './create-semester.component.html',
  styleUrls: ['./create-semester.component.scss']
})
export class CreateSemesterComponent implements OnInit, OnChanges {
  public subjects: SubjectDTO[];
  public subjectFormControl = new FormControl();
  public semesterForm:FormGroup;
  public specializations: SpecializationDTO[];
  public semesterRange: FormGroup;
  @Input("showSpecializations") showSpecializations: boolean = true;
  @Input("isCreate") isCreate: boolean;
  @Output("createSemester") semester: EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder, private semesterService: SemesterService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initTable();
    if(this.showSpecializations){
    }
  }
  ngOnChanges():void{
    if(this.isCreate){
      this.createSemester();
    }
  }
  private initTable() {
    this.semesterForm = this.formBuilder.group({
      name: ['', Validators.required],
      semesterNumber: [1, Validators.required],
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
        this.isCreate = false;
        this.semester.emit(semester);
        this.notificationService.showNotification(`Semester: ${res.name} was created`, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
      },
      error=>{
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
      
    );
  }


  private buildSemester(): Semester {
    return {
      name: this.semesterForm.get('name').value,
      semesterNumber: this.semesterForm.get('semesterNumber').value,
      startDate: this.semesterRange.get('start').value,
      endDate: this.semesterRange.get('end').value,
    };
  }

}
