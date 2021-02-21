import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../service/tokenStorage.service';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileGuardGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {      
      if(this.tokenStorageService.getUser() != null && this.tokenStorageService.getType() == 'ROLE_STUDENT')
      { 
         return true;
        
      } 
      else{
        if(this.tokenStorageService.getType() == 'ROLE_TEACHER'){

          window.location.href = "/teacher-profile";
          return false;
          
      }
    }
  }
}
