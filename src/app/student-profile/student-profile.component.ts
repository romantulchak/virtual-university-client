import { Component, OnInit } from '@angular/core';
import { Link } from '../model/link.model';
import { LinkService } from '../service/link.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  public links: Link[] = [
    {
      name: 'Home',
      route: '/profile/student',
      children: []
    },
    {
      name: 'Grades',
      route: 'grades',
      children: []
    },
    {
      name: 'My group',
      route: 'my-group',
      children: []
    },
    {
      name: 'Schedule',
      route: 'schedule',
      children: []
    },
  ];

  constructor(private linkService: LinkService){

  }

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
