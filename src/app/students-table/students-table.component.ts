import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentDTO } from '../dto/student.dto';
import { FilterHelper } from '../helpers/filter.helper';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input("source") source: MatTableDataSource<StudentDTO>;
  @Input("showAddButton") isShowAddButton: boolean = false;
  @Input("showDeleteButton") isShowDeleteButton: boolean = false;
  @Input() displayedColumns: string[];
  
  @Output() studentToArray: EventEmitter<Student[]> = new EventEmitter<Student[]>();
  @Output() studentToRemove: EventEmitter<StudentDTO> = new EventEmitter<StudentDTO>();
  @ViewChild(MatPaginator) studentsPaginator: MatPaginator;
  @ViewChild(MatSort) studentsSort: MatSort;


  private studentToGroup: Student[] = [];
  constructor(private filterHelper: FilterHelper) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    if(this.source != null){
      this.source.paginator = this.studentsPaginator;
      this.source.sort = this.studentsSort;
    }
  }

  ngOnChanges(){

    if(this.source != null){
      this.source.paginator = this.studentsPaginator;
      this.source.sort = this.studentsSort;
    }
    this.studentToGroup = [];
  }
  public filter(e: Event, source: any){
     this.filterHelper.filter(e, source);
    
  }

  public deleteStudentFromGroup(student: StudentDTO){
    if(window.confirm(`Are you sure that you want do remove ${student.firstName} ${student.lastName} from group?`)){
      this.studentToRemove.emit(student);
    }
  }



  public addStudentToArray(student: Student) {
 
    if (this.studentToGroup.filter(x => x.id == student.id).length != 0) {
      this.studentToGroup = this.studentToGroup.filter(x => x.id != student.id);
    } else {
      this.studentToGroup.push(student);
    }
    this.studentToArray.emit(this.studentToGroup);
  }




}
