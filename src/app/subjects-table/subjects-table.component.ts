import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SubjectDTO } from '../dto/subject.dto';
import { FilterHelper } from '../helpers/filter.helper';
import { Subject } from '../model/subject.model';
import { SubjectTeacherGroup } from '../model/subjectTeacherGroup.model';
import { Teacher } from '../model/teacher.model';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.scss']
})
export class SubjectsTableComponent implements OnInit, OnChanges {


  @Input("source") source: MatTableDataSource<SubjectDTO>;

  @Input("showTecahers") isShowTeachers: boolean = false;

  @Output() getTeachers: EventEmitter<SubjectTeacherGroup> = new EventEmitter<SubjectTeacherGroup>(null);
  @Output() sendFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() getSubjects: EventEmitter<Subject> = new EventEmitter<Subject>();

  @Input() displayedColumns: string[];
  @Input("showAddSubjectButton") isAddSubject: boolean = false;
  @Input("showTeacherDetails") isShowTeacherDetails: boolean = false;

  @ViewChild(MatPaginator) subjectsPaginator: MatPaginator;
  @ViewChild(MatSort) subjectsSort: MatSort;
  constructor(private filterHelper: FilterHelper) { }

  ngOnInit(): void {
    
  }
  ngOnChanges(){
    this.source.paginator = this.subjectsPaginator;
    this.source.sort = this.subjectsSort;
  }



  public setTeacherForSubject(subject: Subject, teacher: Teacher){
    let subjectTeacherGroup: SubjectTeacherGroup ={
      studentGroup: null,
      subject: subject, 
      teacher: teacher
    }
    this.getTeachers.emit(subjectTeacherGroup);
  }

  public filter(e: Event, source){
    this.filterHelper.filter(e, source);
  }
  public addSubject(subject: Subject){
    this.getSubjects.emit(subject);
  }

}
