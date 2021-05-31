import { Component, Input, OnInit } from '@angular/core';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { StudentGroupService } from '../service/student-group.service';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent implements OnInit {

  @Input("group") group: StudentGroupDTO;
  constructor(private studentGroupService: StudentGroupService) { }

  ngOnInit(): void {
  }
  public selectGroup(group: StudentGroupDTO){
    this.studentGroupService.teacherCurrentGroup.next(group);
  }
}
