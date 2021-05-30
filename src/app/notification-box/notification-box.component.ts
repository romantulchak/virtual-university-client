import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { ServerNotificationDTO } from '../dto/server-notification.dto';
import { ServerNotificationService } from '../service/server-notification.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss'],
  animations: [
    trigger('anim', [
       transition('void => active', [
         style({ height: '0', opacity: '0', transform: 'translateY(20px)' }),
         sequence([
           animate(".5s ease", style({ height: '*', opacity: '.2', transform: 'translateY(20px)' })),
           animate(".95s ease", style({ height: '*', opacity: 1, transform: 'translateY(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'  }))
         ])
       ])
   ])
 ]
})
export class NotificationBoxComponent implements OnInit {

  public notifications: ServerNotificationDTO[] = [];
  private currentNotification: ServerNotificationDTO;
  private page: number = 0;
  @Output('closeNotificationBox') closeNotificationBoxEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(private serverNotificationService: ServerNotificationService,
              private rxStompService: RxStompService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.findNotifications(this.page);
    this.checkIfNotificaitonRead();
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

  public readNotification(notification: ServerNotificationDTO){
    if(notification.read == false){
      let obj = {
        notificationId: notification.id,
        username: this.tokenStorageService.getUser().username,
        userId: this.tokenStorageService.getUser().id
      }
      this.currentNotification = notification;
      this.rxStompService.publish({
        destination: '/app/test',
        body: JSON.stringify(obj)
      });
    }
  }

  private checkIfNotificaitonRead(){
    this.rxStompService.watch(`/user/${this.tokenStorageService.getUser().username}/topic/read-notification`).subscribe(
      res=>{
        this.currentNotification.read = JSON.parse(res.body);        
      }
    );
  }

  public closeNotificationBox(){
    this.closeNotificationBoxEvent.emit(false);
  }

}
