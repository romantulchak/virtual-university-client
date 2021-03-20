import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './service/tokenStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public isAdmin: boolean;
  constructor(private tokenStorageService: TokenStorageService){}
  ngOnInit(): void{
    this.isAdmin = this.isUserAdmin();
  }

  private isUserAdmin(){
    let user = this.tokenStorageService.getUser();
    return user.roles.find(role=> role === "ROLE_ADMIN" || role === "ROLE_MANAGER") != null;
  }
  
}
