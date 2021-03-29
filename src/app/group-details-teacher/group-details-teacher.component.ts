import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentGroupService } from '../service/student-group.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-group-details-teacher',
  templateUrl: './group-details-teacher.component.html',
  styleUrls: ['./group-details-teacher.component.scss']
})
export class GroupDetailsTeacherComponent implements OnInit {
  private groupId: number;
  private teacherId: number;

  constructor(private router: ActivatedRoute, private studentGroupService: StudentGroupService, private tokenStorageService: TokenStorageService) {

      router.params.subscribe(
        res=>{
          this.groupId = res.id;
        }
      );

   }

  ngOnInit(): void {
    this.teacherId = this.tokenStorageService.getUser().id;
    this.getGroupDetails();
  }

  private getGroupDetails(){
    this.studentGroupService.findGroupByIdForTeacher(this.groupId, this.teacherId).subscribe(
      res=>{
        console.log(res);
        
      },
      error=>{
        console.log("You haven't access to this group");
        
      }
    );
  }

}
