import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CourseDTO } from "../dto/course.dto";

const API_URL = environment.api;

@Injectable({
    providedIn:'root'
})
export class CourseService{
    constructor(private http: HttpClient){}

    public getCourses(): Observable<CourseDTO[]>{
        return this.http.get<CourseDTO[]>(API_URL + 'courses');
    }
}