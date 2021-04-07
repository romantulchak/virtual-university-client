import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubjectDTO } from '../dto/subject.dto';

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.scss']
})
export class SubjectCardComponent implements OnInit {

  @Input("subject") subject: SubjectDTO;
  @Output() selectedSubject: EventEmitter<SubjectDTO> = new EventEmitter<SubjectDTO>();
  constructor() { }

  ngOnInit(): void {
  }

  public selectSubject(subject: SubjectDTO){
      this.selectedSubject.emit(subject);
  }




}
