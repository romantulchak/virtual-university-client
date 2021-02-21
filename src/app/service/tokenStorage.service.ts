import { Injectable } from "@angular/core";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_TYPE = 'type';

@Injectable({
    providedIn:'root'
})
export class TokenStorageService {
    constructor(){}
    
    signOut():void{
        localStorage.clear;
        window.location.reload();
    }
    
    public saveToken(token: string){
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }
    public saveType(type: string){
        localStorage.removeItem(USER_TYPE);
        localStorage.setItem(USER_TYPE, type);
    }
    public getToken():string{
        return localStorage.getItem(TOKEN_KEY);
    }
    public getType():string{
        return localStorage.getItem(USER_TYPE);
    }

    public saveUser(user):void{
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    public getUser(): any {
        return JSON.parse(localStorage.getItem(USER_KEY));
      }     
}