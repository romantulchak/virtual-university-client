import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { ScheduleLessonRequestDTO } from '../dto/scheduleLessonRequest.dto';
import { RequestStatusEnum } from '../model/enum/request-status.enum';
import { RequestDecisionEnum } from '../model/enum/request.enum';
import { StatusEnum } from '../model/enum/status.enum';
import { Request } from '../model/request.model';
import { ChangeDecisionRequest } from '../request/changeDecisionRequest.request';
import { ChangeStatusRequest } from '../request/changeStatusRequest.request';
import { ChangeStatusResponse } from '../response/changeStatusResponse.responce';
import { LessonService } from '../service/lesson.service';
import { NotificationService } from '../service/notification.service';
import { ScheduleDayService } from '../service/schedule-day.service';
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
  public totalPages: number[];
  public currentPage: number;
  private currentRequest: ScheduleLessonRequestDTO;
  constructor(private lessonService: LessonService, 
              private notificationService: NotificationService,
              private rxStompService: RxStompService,
              private tokenStorageService: TokenStorageService,
              private scheduleDayService: ScheduleDayService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.findLessonRequests(1);
    this.observeLessonRequests();
    this.currentUsername = this.tokenStorageService.getUser().username;
  }

  public findLessonRequests(page: number){
    if(page != this.currentPage){
      this.lessonService.findLessonRequests(page).subscribe(
        res=>{
          this.totalPages = Array.from(new Array(res.totalPages), (x, i) => i+1);
          this.requests = res.data;
          this.currentPage = res.currentPage;
          console.log(res);
          
        }
      );
    }
  }

  public setStatus(decision: RequestDecisionEnum, request: ScheduleLessonRequestDTO){
    let changeDecisionRequest = new ChangeDecisionRequest(request.id, decision, request.lesson.comment);
    this.lessonService.changeRequestDecision(changeDecisionRequest).subscribe(
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

  public getDayLessons(request: ScheduleLessonRequestDTO){
    let date = this.datePipe.transform(request.lesson.dateStart, 'yyyy-MM-dd');
    this.scheduleDayService.getDayByDateAndGroupName(date, request.lesson.groupName).subscribe(
      res=>{
        console.log(res);
        
      }
    );
  }
}
