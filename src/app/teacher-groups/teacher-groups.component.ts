import { Component, OnInit } from '@angular/core';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { StudentGradesService } from '../service/student-grades.service';
import { StudentGroupService } from '../service/student-group.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-teacher-groups',
  templateUrl: './teacher-groups.component.html',
  styleUrls: ['./teacher-groups.component.scss']
})
export class TeacherGroupsComponent implements OnInit {

  constructor(private studentGroupService: StudentGroupService, private tokenStorageService: TokenStorageService) { }
  private teacherId: number;
  public studentGroups: StudentGroupDTO[];
  ngOnInit(): void {
    this.teacherId = this.tokenStorageService.getUser().id;
    this.getGroupsForTeacher();
  }

  private getGroupsForTeacher(){
    this.studentGroupService.getGroupsForTeacher(this.teacherId).subscribe(
      res=>{
        this.studentGroups = res;
      }
    );
  }
}
