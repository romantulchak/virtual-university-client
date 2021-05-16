import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherDTO } from '../dto/teacher.dto';
import { StatusEnum } from '../model/enum/status.enum';
import { Subject } from '../model/subject.model';
import { NotificationService } from '../service/notification.service';
import { SubjectService } from '../service/subject.service';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent implements OnInit {

  constructor(private teacherService: TeacherService,
              private subjectService: SubjectService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService) { }
  public teachers: TeacherDTO[];
  public subject: Subject = new Subject();
  public firstFormGroup: FormGroup;
  public teacherFormControl: FormControl = new FormControl();
  private files: File[] = [];
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
    this.subjectService.createSubject(this.subject, this.files).subscribe(
      res => {
        this.notificationService.showNotification(`Specialization: ${this.subject.name} was created`, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
      },
      error=>{
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
    );
    
  }

  public selectFile(event){
    this.files = [];
    this.files = event.target.files;    
  }

}
