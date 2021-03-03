import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TeacherDTO } from "../dto/teacher.dto";

const API_URL = environment.api;


@Injectable({
    providedIn:'root'
})
export class TeacherService{
    constructor(private http: HttpClient){}

    public getAllTeachers():Observable<TeacherDTO[]>{
        return this.http.get<TeacherDTO[]>(API_URL + 'teacher');
    }
}
