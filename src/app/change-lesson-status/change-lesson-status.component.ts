import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusEnum } from '../model/enum/status.enum';
import { ScheduleLessonRequest } from '../model/scheduleLessonRequest.model';
import { LessonService } from '../service/lesson.service';
import { NotificationService } from '../service/notification.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-change-lesson-status',
  templateUrl: './change-lesson-status.component.html',
  styleUrls: ['./change-lesson-status.component.scss']
})
export class ChangeLessonStatusComponent implements OnInit {

  public scheduleLessonRequest: ScheduleLessonRequest = new ScheduleLessonRequest();
  private teacherId: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              private lessonService: LessonService, 
              private tokenStorageService: TokenStorageService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.scheduleLessonRequest.actualStatus = this.data.lesson.status;
    this.teacherId = this.tokenStorageService.getUser().id;
  }

  public sendRequest(){
    if(this.teacherId != undefined){
      this.scheduleLessonRequest.lesson = this.data.lesson;
      this.lessonService.changeLessonStatus(this.teacherId, this.scheduleLessonRequest).subscribe(
        res=>{
          this.notificationService.showNotification('The request has been sent', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
        },
        error=>{
          console.log(error);
          
          this.notificationService.showNotification(error.error.message, error.statusText, error.status);
        }
      );
    }
  }
}
