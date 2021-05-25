import { Component, OnInit } from '@angular/core';
import { ScheduleLessonRequestDTO } from '../dto/scheduleLessonRequest.dto';
import { RequestStatusEnum } from '../model/enum/request.enum';
import { StatusEnum } from '../model/enum/status.enum';
import { LessonService } from '../service/lesson.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-lesson-status-request-panel',
  templateUrl: './lesson-status-request-panel.component.html',
  styleUrls: ['./lesson-status-request-panel.component.scss']
})
export class LessonStatusRequestPanelComponent implements OnInit {

  public requests: ScheduleLessonRequestDTO[];
  public requestStatus = RequestStatusEnum;
  constructor(private lessonService: LessonService, 
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.findLessonRequests();
  }

  private findLessonRequests(){
    this.lessonService.findLessonRequests(0).subscribe(
      res=>{
        console.log(res);
        
        this.requests = res;
      }
    );
  }

  public setStatus(decision: RequestStatusEnum, request: ScheduleLessonRequestDTO){
    this.lessonService.changeRequestStatus(request.id, decision).subscribe(
      res=>{
        this.notificationService.showNotification('Request statust changed', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
        request.decision = decision;
      },
      error=>{
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
    );
    
  }

}
