import { Component, Input, OnInit } from '@angular/core';
import { StudentGroupDTO } from '../dto/studentGroup.dto';

@Component({
  selector: 'app-group-information',
  templateUrl: './group-information.component.html',
  styleUrls: ['./group-information.component.scss']
})
export class GroupInformationComponent implements OnInit {

  @Input() group: StudentGroupDTO;


  constructor() { }

  ngOnInit(): void {
  }

}
