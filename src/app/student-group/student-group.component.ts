import { Component, OnInit } from '@angular/core';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { StudentGroupService } from '../service/student-group.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-student-group',
  templateUrl: './student-group.component.html',
  styleUrls: ['./student-group.component.scss']
})
export class StudentGroupComponent implements OnInit {


  public studentGroup: StudentGroupDTO;
  private studentId: number;

  constructor(private groupService: StudentGroupService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.studentId = this.tokenStorageService.getUser().id;
    this.getStudentGroup();
  }

  private getStudentGroup(){
    this.groupService.findStudentGroup(this.studentId).subscribe(
      res=>{
        this.studentGroup = res;
        
      }
    );
  }
  

}
