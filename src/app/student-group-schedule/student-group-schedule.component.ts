import { Component, OnInit } from '@angular/core';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { StudentGroupService } from '../service/student-group.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-student-group-schedule',
  templateUrl: './student-group-schedule.component.html',
  styleUrls: ['./student-group-schedule.component.scss']
})
export class StudentGroupScheduleComponent implements OnInit {

  constructor(private studentGroupService: StudentGroupService, private tokenStorageService: TokenStorageService) { }
  private studentId: number;
  public group: StudentGroupDTO;
  ngOnInit(): void {
   this.studentId = this.tokenStorageService.getUser().id;
    this.getGroup();
  }

  private getGroup(){
    this.studentGroupService.findStudentGroup(this.studentId).subscribe(
      res=>{
          this.group = res;
      }
    );
  }

}
