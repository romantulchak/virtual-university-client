import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Link } from '../model/link.model';
import { LinkService } from '../service/link.service';

@Component({
  selector: 'app-group-details-teacher-layout',
  templateUrl: './group-details-teacher-layout.component.html',
  styleUrls: ['./group-details-teacher-layout.component.scss']
})
export class GroupDetailsTeacherLayoutComponent implements OnInit {

  public groupId: number;


  constructor(private router: ActivatedRoute, private linkService: LinkService) {
    router.params.subscribe(
      res=>{
        this.groupId = res.id;
        
      }
    )}


  ngOnInit(): void {
    let links: Link[] = [
      {
        name: 'Group',
        route: `group-details/${this.groupId}`,
        children: []
      },
      {
        name: 'Schedule',
        route: `group-details/${this.groupId}/schedule`,
        children: []
      },
      {
        name: 'My groups',
        route: 'my-groups',
        children: []
      },
    ]
    this.linkService.links.next(links);
  }

}
