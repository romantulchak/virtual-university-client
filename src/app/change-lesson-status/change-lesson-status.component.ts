import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StatusEnum} from '../model/enum/status.enum';
import {LessonService} from '../service/lesson.service';
import {NotificationService} from '../service/notification.service';
import {TokenStorageService} from '../service/tokenStorage.service';
import {ChangeLessonStatusRequest} from '../request/change-lesson-status.request';

@Component({
  selector: 'app-change-lesson-status',
  templateUrl: './change-lesson-status.component.html',
  styleUrls: ['./change-lesson-status.component.scss']
})
export class ChangeLessonStatusComponent implements OnInit {

  public request = {
    currentStatus: '',
    message: ''
  };
  private teacherId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private lessonService: LessonService,
              private tokenStorageService: TokenStorageService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.request.currentStatus = this.data.lesson.status;
    this.teacherId = this.tokenStorageService.getUser().id;
  }

  public sendRequest(): void {
    if (this.teacherId) {
      const changeLessonStatusRequest = new ChangeLessonStatusRequest(this.data.lesson.id, this.data.semester.id, this.teacherId, this.request.currentStatus, this.request.message);
      this.lessonService.changeLessonStatus(changeLessonStatusRequest).subscribe(
        () => {
          this.notificationService.showNotification('The request has been sent', StatusEnum[StatusEnum.OK], StatusEnum.OK);
        },
        error => {
          this.notificationService.showNotification(error.error.message, error.statusText, error.status);
        }
      );
    }
  }
}
