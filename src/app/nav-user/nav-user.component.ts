import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Link } from '../model/link.model';
import { ServerNotificationService } from '../service/server-notification.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.scss']
})
export class NavUserComponent implements OnInit {
  @Input('links') links: Link[];
  public isAdminPanelVisible:boolean;
  public navOpen: boolean = false;
  public counter: number = 0;
  public isNotificationBoxOpened: boolean = false;
  constructor(private serverNotificationService: ServerNotificationService,
              private tokenStorageService: TokenStorageService,
              private rxStompService: RxStompService) { }

  ngOnInit(): void {
    this.checkIfNavOpened();
    this.checkIfAdminPanelVisible();
    this.getNotReadNotificationCount();
    this.observeNotificationCounter();
  }


  private observeNotificationCounter(){
    this.rxStompService.watch(`/user/${this.tokenStorageService.getUser().username}/queue/notification`).subscribe(
      res=>{
        this.counter = Number.parseInt(res.body);
      }
    );
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
    this.getNotReadNotificationCount();
  }

  public closeNav(){
    localStorage.setItem('navOpened', "false");
    this.navOpen = false;
  }
  public getNotReadNotificationCount(){
    this.serverNotificationService.getNotReadNotificationCount().subscribe(
      res=>{
        this.counter = res;
      }
    );
  }
  public openNotificationBox(){
    this.isNotificationBoxOpened = true;
  }
  public exit(){
    this.tokenStorageService.clearStorage();
    window.location.href = "/";
  }
}
