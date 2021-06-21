import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../service/tokenStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminChildGuard implements CanActivate, CanActivateChild {
  constructor(private tokenStorageService: TokenStorageService, private router: Router){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("ASDASDSAD");
      
    let user = this.tokenStorageService.getUser();
    if(user != null){
      if(user.roles.includes('ROLE_ADMIN' || 'ROLE_MANAGER')){
        return true;
      }
    }
    this.router.navigateByUrl('/not-found');
    return false;
  }
 
  

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return this.canActivate(childRoute, state);
  }
  
}
