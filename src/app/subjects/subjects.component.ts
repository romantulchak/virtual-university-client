import { Component, OnInit } from '@angular/core';
import { SpecializationDTO } from '../dto/specialization.dto';
import { SpecializationService } from '../service/specialization.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  constructor(private specializationService: SpecializationService, private tokenStorageService: TokenStorageService) { }
  private studentId: number;
  public specializations: SpecializationDTO[];
  ngOnInit(): void {
    this.studentId = this.tokenStorageService.getUser().id;
    this.getSpecializationsForStudent();
  }

  private getSpecializationsForStudent(){
    this.specializationService.getAllSpecializationForUser(this.studentId).subscribe(
      res=>{
        this.specializations = res;
        console.log(res);
        
      }
    );
  }
}
