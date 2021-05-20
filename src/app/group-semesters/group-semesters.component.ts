import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { SemesterDTO } from '../dto/semester.dto';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { SemesterService } from '../service/semester.service';

@Component({
  selector: 'app-group-semesters',
  templateUrl: './group-semesters.component.html',
  styleUrls: ['./group-semesters.component.scss']
})
export class GroupSemestersComponent implements OnInit, OnChanges {

  @Input("group") group: StudentGroupDTO;
  @Output("semesterSelected") semesterSelected: EventEmitter<SemesterDTO> = new EventEmitter<SemesterDTO>();
  public semesters: SemesterDTO[];
  public selectedSemester: SemesterDTO;
  constructor(private semesterService: SemesterService) { }

  ngOnInit(): void {
  }
  ngOnChanges(){
    if(this.group != null){
      this.getSemestersForGroup();
    }
  }
  public getSemestersForGroup(){
    this.semesterService.getSemestersForGroup(this.group.id).subscribe(
      res=>{
        if(res != null){
          this.semesters = res;
          this.selectedSemester = this.semesters.find(x=>x.id == this.group.semester.id);
          this.semesterSelected.emit(this.selectedSemester);
        }
      }
    );
  }
  public selectSemester(data:any){
    this.selectedSemester = data.value;
    this.semesterSelected.emit(this.selectedSemester);
  }

}
