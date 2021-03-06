import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SpecializationDTO } from "../dto/specialization.dto";
import { TeacherDTO } from "../dto/teacher.dto";
import { Teacher } from "../model/teacher.model";

const API_URL = environment.api;


@Injectable({
    providedIn:'root'
})
export class TeacherService{
    constructor(private http: HttpClient){}

    public getAllTeachers():Observable<TeacherDTO[]>{
        return this.http.get<TeacherDTO[]>(API_URL + 'teacher');
    }
    public getTeacherInformation(id: number):Observable<TeacherDTO>{
        return this.http.get<TeacherDTO>(API_URL + 'teacher/findTeacherById/' + id);
    }
    public createTeacher(teacher: Teacher):Observable<any>{
        return this.http.post(API_URL + 'teacher/createTeacher', teacher);
    }
}
