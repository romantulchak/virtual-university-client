import { Component, Input, OnInit } from '@angular/core';
import { StatusEnum } from '../model/enum/status.enum';
import { Notification } from '../model/notification.model';
import { User } from '../model/user.model';
import { ResetPasswordRequest } from '../request/resetPasswordRequest.request';
import { NotificationService } from '../service/notification.service';
import { StudentService } from '../service/student.service';
import { TeacherService } from '../service/teacher.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  private type: string;
  @Input() userId: number;
  public resetPassword: ResetPasswordRequest = new ResetPasswordRequest();
  public hide: boolean;
  constructor(private studentService: StudentService,
              private notificationService: NotificationService,
              private teacherService: TeacherService, 
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.type = this.tokenStorageService.getType();
  }

  //TODO: fix it
  public passwordReset(confirmPassword: string): void{
    if (confirmPassword === this.resetPassword.newPassword){
      this.resetPassword.userId = this.userId;
      if(this.type === 'ROLE_TEACHER'){
        this.teacherService.resetPassword(this.resetPassword).subscribe(
          res => {
            this.notificationService.showNotification('Password changed', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
          },
          error => {
            this.notificationService.showNotification(error.error.message, error.statusText, error.status);
          }
        );
      }else{
        this.studentService.resetStudentPassowrd(this.resetPassword).subscribe(
          res => {
            this.notificationService.showNotification('Password changed', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
          },
          error=>{
            this.notificationService.showNotification(error.error.message, error.statusText, error.status);
          }
        );
      }
      
   
    }else{
      this.notificationService.showNotification('Password mismatch', StatusEnum[StatusEnum.BAD_REEQUSET], StatusEnum["BAD_REEQUSET"])
    }
  }



}
