import { Component, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { StatusEnum } from './model/enum/status.enum';
import { NotificationService } from './service/notification.service';
import { TokenStorageService } from './service/tokenStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public isAdmin: boolean;
  constructor(private tokenStorageService: TokenStorageService, 
              private rxStompService: RxStompService,
              private notificationService: NotificationService){}
  ngOnInit(): void{
    this.isAdmin = this.isUserAdmin();
    this.observeNotification();
    this.observeScheduleChange();
  }

  private observeNotification(){
    this.rxStompService.watch(`/user/${this.tokenStorageService.getUser().username}/queue/notification-snac`).subscribe(
      res=>{ 
        this.notificationService.showNotification(res.body, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
      }
    );
  }

  private observeScheduleChange(){
    this.rxStompService.watch(`/user/${this.tokenStorageService.getUser().username}/queue/schedule-changed`).subscribe(
      res=>{
        this.notificationService.showNotification(res.body, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
      }
    );
  }

  private isUserAdmin(){
    let user = this.tokenStorageService.getUser();
    if(user != null){
      return user.roles.find(role=> role === "ROLE_ADMIN" || role === "ROLE_MANAGER") != null;
    }
    return false;
  }
  
}
