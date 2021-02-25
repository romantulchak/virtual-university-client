import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../service/tokenStorage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = this.tokenStorageService.getUser();
      if(user != null){
        switch(user.userType){
          case 'ROLE_STUDENT':
            window.location.href = "profile/student";
            break;
            case 'ROLE_TEACHER':
            window.location.href = "profile/teacher";  
            break;
        }
        return false;
      }
      return true;

  }
  
}
