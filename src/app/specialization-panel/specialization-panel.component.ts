import { Component, OnInit } from '@angular/core';
import { SemesterDTO } from '../dto/semester.dto';
import { SpecializationDTO } from '../dto/specialization.dto';
import { SemesterService } from '../service/semester.service';
import { SpecializationService } from '../service/specialization.service';

@Component({
  selector: 'app-specialization-panel',
  templateUrl: './specialization-panel.component.html',
  styleUrls: ['./specialization-panel.component.scss']
})
export class SpecializationPanelComponent implements OnInit {

  constructor(private semesterService: SemesterService, private specializationService: SpecializationService) { }
  public specializations: SpecializationDTO[];
  public semesters: SemesterDTO[];
  public currentSpecialization: number
  ngOnInit(): void {
    this.findAllSpecializations();
  }

  private findAllSpecializations(){
    this.specializationService.getAllSpecializations().subscribe(
      res=>{
        console.log(res);
        
          this.specializations = res;
      }
    );
  }
  public getSemestersForSpecializations(specializationId: number){
    this.semesterService.getAvailableSemestersForSpecialization(specializationId).subscribe(
      res=>{
        console.log(res);
        this.currentSpecialization = specializationId;
        this.semesters = res;
        
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
}
