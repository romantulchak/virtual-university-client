import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubjectDTO } from '../dto/subject.dto';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-all-subjects-button',
  templateUrl: './all-subjects-button.component.html',
  styleUrls: ['./all-subjects-button.component.scss']
})
export class AllSubjectsButtonComponent implements OnInit {

  @Input('semesterId') semesterId:number;
  @Output('all-subjects') allSubjects: EventEmitter<SubjectDTO[]> = new EventEmitter<SubjectDTO[]>();
  @Output('subjects-without-dublicate') subjects: EventEmitter<SubjectDTO[]> = new EventEmitter<SubjectDTO[]>();
  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
  }

  public findSubjects(semesterId?: number){
    if(this.semesterId != null || semesterId != null)
    {
      this.semesterId == semesterId;
      this.findAllSubjectsWithoutDublicates();
    }else{
      this.findAllSubjects();
    }
  }

  private findAllSubjects(){
    this.subjectService.findAllSubjectsWithTeachers().subscribe(
      res=>{
        this.allSubjects.emit(res);
      }
    );
  }

  private findAllSubjectsWithoutDublicates(){
      this.subjectService.findAllSubjectsWithTeachersForSemester(this.semesterId).subscribe(
        res=>{
          this.allSubjects.emit(res);
        }
      );
  }
}
