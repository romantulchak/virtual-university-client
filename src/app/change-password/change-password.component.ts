import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ResetPasswordRequest } from '../request/resetPasswordRequest.request';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @Input() userId: number;
  public resetPassword: ResetPasswordRequest = new ResetPasswordRequest();
  public hide: boolean;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }
  public passwordReset(confirmPassword: string): void{
    if (confirmPassword === this.resetPassword.newPassword){
      this.resetPassword.userId = this.userId;
      this.studentService.resetStudentPassowrd(this.resetPassword).subscribe(
        res => {
          console.log('Password changed');

        }
      );
    }else{
      console.log('Passwords mistmatches');

    }

  }
}
