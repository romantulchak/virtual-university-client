import { Component, OnInit } from '@angular/core';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { StudentGroupService } from '../service/student-group.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(private groupsService: StudentGroupService, private tokenStorageServcie: TokenStorageService) { }
  public groups: StudentGroupDTO[];
  
  ngOnInit(): void {
    this.findAllGroups();
  }

  public isAdmin():boolean{
    return this.tokenStorageServcie.getUser().roles.includes('ROLE_ADMIN')
  }

  private findAllGroups(){
    this.groupsService.findAllGroups().subscribe(
      res=>{
        this.groups = res;
      }
    );
  }
  public delete(group: StudentGroupDTO){
    this.groupsService.delete(group.id).subscribe(
      res=>{
        this.groups = this.groups.filter(x=>x.id != group.id);
      }
    );
  }
}
