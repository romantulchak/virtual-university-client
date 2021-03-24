import { Component, OnInit } from '@angular/core';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { StudentGroupService } from '../service/student-group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(private groupsService: StudentGroupService) { }
  public groups: StudentGroupDTO[];
  ngOnInit(): void {
    this.findAllGroups();
  }

  private findAllGroups(){
    this.groupsService.findAllGroups().subscribe(
      res=>{
        this.groups = res;
      }
    );
  }

}
