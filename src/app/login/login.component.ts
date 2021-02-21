import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../request/loginRequest.request';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginRequest: LoginRequest = new LoginRequest();
  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) { }
  public hide = true;
  ngOnInit(): void {
  }

  public login(){
    this.authService.login(this.loginRequest).subscribe(
      res=>{
        console.log(res);
        this.tokenStorageService.saveToken(res.token);
        this.tokenStorageService.saveType(res.userType);
        this.tokenStorageService.saveUser(res);
      }
    );
  }

}
