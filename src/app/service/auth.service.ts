import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from "../request/loginRequest.request";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";


const API_URL = environment.api;
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(private http: HttpClient){
        
    }
    public login(loginRequest: LoginRequest):Observable<any>{
        return this.http.post<any>(API_URL + 'auth/login', loginRequest);
    }
}   