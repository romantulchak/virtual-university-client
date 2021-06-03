import { Component, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { ScheduleLessonRequestDTO } from '../dto/scheduleLessonRequest.dto';
import { RequestStatusEnum } from '../model/enum/request-status.enum';
import { RequestDecisionEnum } from '../model/enum/request.enum';
import { StatusEnum } from '../model/enum/status.enum';
import { Request } from '../model/request.model';
import { ChangeStatusRequest } from '../request/changeStatusRequest.request';
import { ChangeStatusResponse } from '../response/changeStatusResponse.responce';
import { LessonService } from '../service/lesson.service';
import { NotificationService } from '../service/notification.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-lesson-status-request-panel',
  templateUrl: './lesson-status-request-panel.component.html',
  styleUrls: ['./lesson-status-request-panel.component.scss']
})
export class LessonStatusRequestPanelComponent implements OnInit {

  public requests: ScheduleLessonRequestDTO[];
  public requestDecision = RequestDecisionEnum;
  public requestStatus = RequestStatusEnum;
  public currentUsername: string;
  private currentRequest: ScheduleLessonRequestDTO;
  constructor(private lessonService: LessonService, 
              private notificationService: NotificationService,
              private rxStompService: RxStompService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.findLessonRequests();
    this.observeLessonRequests();
    this.currentUsername = this.tokenStorageService.getUser().username;
  }

  private findLessonRequests(){
    this.lessonService.findLessonRequests(0).subscribe(
      res=>{
        console.log(res);
        
        this.requests = res;
      }
    );
  }

  public setStatus(decision: RequestDecisionEnum, request: ScheduleLessonRequestDTO){
    this.lessonService.changeRequestDecision(request.id, decision).subscribe(
      res=>{
        this.notificationService.showNotification('Request statust changed', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
        request.decision = decision;
      },
      error=>{
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
    );
    
  }

  public checkout(request: ScheduleLessonRequestDTO){
     let changeStatusRequest = new ChangeStatusRequest(request.id, RequestStatusEnum[RequestStatusEnum.CHECK_OUT]);
     this.lessonService.changeRequestStatus(changeStatusRequest).subscribe(
       res=>{
          this.notificationService.showNotification('Checkout', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);         
       }
     );
  }


  public checkin(request: ScheduleLessonRequestDTO){
    let changeStatusRequest = new ChangeStatusRequest(request.id, RequestStatusEnum[RequestStatusEnum.CHECK_IN]);
    console.log(changeStatusRequest);
    
    this.lessonService.changeRequestStatus(changeStatusRequest).subscribe(
      res=>{
         this.notificationService.showNotification('Checkin', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);         
      }
    );
 }

  private observeLessonRequests(){
    this.rxStompService.watch('/topic/request-status').subscribe(
      res=>{
        let info = JSON.parse(res.body);
        this.currentRequest = this.requests.filter(request => request.id == info.id)[0];
        if(this.currentRequest != null){
          this.currentRequest.info = new ChangeStatusResponse(info.requestStatus, info.userFullName, info.username)
        }
      }
    );
  }

}
