import { Component, OnInit } from '@angular/core';
import { Link } from '../model/link.model';
import { LinkService } from '../service/link.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {
  public links: Link[] = [
    {
      name: 'Home',
      route: '/profile/teacher',
      children: []
    },
    {
      name: 'Subjects',
      route: 'subjects',
      children: []
    },
    {
      name: 'My groups',
      route: 'my-groups',
      children: []
    },
  ];
  constructor(public linkService: LinkService) { }

  ngOnInit(): void {
    this.linkService.links.next(this.links);
    this.checkLinks();
  }


  private checkLinks(){
    this.linkService.links.subscribe(
      res=>{
        if(res != null){
          this.links = res;
        }
      }
    );
  }

}
