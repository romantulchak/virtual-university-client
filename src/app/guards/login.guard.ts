import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../service/tokenStorage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let user = this.tokenStorageService.getUser();
      if(user == null){
      return true;
      }else{
        if(user.userType == 'ROLE_STUDENT')
          window.location.href = "/student-profile";
        else
          window.location.href = "/teacher-profile";  
      }
  }
  
}
