import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleDTO } from '../dto/role.dto';

const API_URL = environment.api;

@Injectable({
    providedIn: 'root'
})
export class RoleService{
    constructor(private http: HttpClient){}

    public getRoles(): Observable<RoleDTO[]>{
        return this.http.get<RoleDTO[]>(API_URL + 'roles');

    }

}
