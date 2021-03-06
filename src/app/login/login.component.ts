import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusEnum } from '../model/enum/status.enum';
import { LoginRequest } from '../request/loginRequest.request';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginRequest: LoginRequest = new LoginRequest();
  constructor(private authService: AuthService, 
              private tokenStorageService: TokenStorageService, 
              private router: Router,
              private notificationService: NotificationService) { }
  public hide = true;
  ngOnInit(): void {
  }

  public login(){
    this.authService.login(this.loginRequest).subscribe(
      res=>{
        this.tokenStorageService.saveToken(res.token);
        this.tokenStorageService.saveType(res.userType);
        this.tokenStorageService.saveUser(res);
        if(res.userType === 'ROLE_STUDENT'){
          this.router.navigate(['profile/student']);
        }else if(res.userType === 'ROLE_TEACHER'){
          this.router.navigate(['profile/teacher']);
        }
        this.notificationService.showNotification('Login successful', StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
      },
      error=>{
        this.notificationService.showNotification('Login or password is incorrect', error.statusText, error.status);
      }
    );
  }

}
