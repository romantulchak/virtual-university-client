import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Link } from '../model/link.model';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.scss']
})
export class NavUserComponent implements OnInit {
  @Input('links') links: Link[];
  public isAdminPanelVisible:boolean;
  public navOpen: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.checkIfNavOpened();
    this.checkIfAdminPanelVisible();
  }

  private checkIfAdminPanelVisible(){
    this.isAdminPanelVisible = JSON.parse(localStorage.getItem('showAdminPanel'));
  }

  private checkIfNavOpened(){
    let isNavOpened = JSON.parse(localStorage.getItem('navOpened'));
    if(isNavOpened){
      this.navOpen = true;
    }
  }

  public openNav(){
    this.navOpen = true;
    localStorage.setItem('navOpened', "true");
  }

  public closeNav(){
    localStorage.setItem('navOpened', "false");
    this.navOpen = false;
  }
}
