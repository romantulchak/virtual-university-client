import { Component, OnInit } from '@angular/core';
import { ServerNotificationDTO } from '../dto/server-notification.dto';
import { ServerNotificationService } from '../service/server-notification.service';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss']
})
export class NotificationBoxComponent implements OnInit {

  public notifications: ServerNotificationDTO[] = [];

  private page: number = 0;

  constructor(private serverNotificationService: ServerNotificationService) { }

  ngOnInit(): void {
    this.findNotifications(this.page);
  }

  private findNotifications(page: number){
    this.serverNotificationService.findAllNotificationsForUser(page).subscribe(
      res=>{
        this.notifications.push(...res);
      }
    );
  }

  public scrollNotificationsBox(){
    this.page++;
    this.findNotifications(this.page);
  }

}
