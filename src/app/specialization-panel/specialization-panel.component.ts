import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SemesterDTO } from '../dto/semester.dto';
import { SpecializationDTO } from '../dto/specialization.dto';
import { SubjectDTO } from '../dto/subject.dto';
import { FilterHelper } from '../helpers/filter.helper';
import { Subject } from '../model/subject.model';
import { SemesterService } from '../service/semester.service';
import { SpecializationService } from '../service/specialization.service';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'app-specialization-panel',
  templateUrl: './specialization-panel.component.html',
  styleUrls: ['./specialization-panel.component.scss']
})
export class SpecializationPanelComponent implements OnInit {

  constructor(private semesterService: SemesterService, private specializationService: SpecializationService, private subjectService: SubjectService, private filterHelper: FilterHelper) { }
  public specializations: SpecializationDTO[];
  public semesters: SemesterDTO[];
  public currentSpecializationId: number;
  public source: MatTableDataSource<SubjectDTO>;
  private subjects: Subject[] = [];
  public displayedData: string[] = ['id', 'name', 'add'];
  ngOnInit(): void {
    this.findAllSpecializations();
  }

  private findAllSpecializations(){
    this.specializationService.getAllSpecializations().subscribe(
      res=>{
          this.specializations = res;
      }
    );
  }


  public addSemesterToSpecialization(semesterId: number, specializationId: number){
    this.specializationService.addSemesterToSpecialization(semesterId, specializationId).subscribe(
      res=>{
        console.log("Ok");
        
        
      }
    );
  }
  public getAvailableSubjectsForSpecialization(id: number){
    this.subjectService.getAvailableSubjectsForSpecializations(id).subscribe(
      res=>{
        this.currentSpecializationId = id;
        this.source = new MatTableDataSource(res);
      }
    );
  }

  public addSubjectsToSpecialization(){
    if(this.subjects.length != 0){
      this.specializationService.addSubjectsToSpecialization(this.subjects, this.currentSpecializationId).subscribe(
        res=>{
          console.log("Added");
          
        }
      );
    }else{
      console.log("Subjects is empty");
      
    }
    
  }
  public filter(event){
    this.filterHelper.filter(event);
  }
  public addSubjectsToArray(subject: Subject){

    if(this.subjects.filter(x=>x.id == subject.id).length != 0){
      this.subjects = this.subjects.filter(x=>x.id != subject.id);
    }else{
      this.subjects.push(subject);
    }
    
  }
}
