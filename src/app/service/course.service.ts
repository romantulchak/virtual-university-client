import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseDTO } from '../dto/course.dto';
import { Course } from '../model/course.model';

const API_URL = `${environment.apiUrl}/course`;

@Injectable({
    providedIn: 'root'
})
export class CourseService{
    constructor(private http: HttpClient){}

    public getCourses(): Observable<CourseDTO[]>{
        return this.http.get<CourseDTO[]>(API_URL);
    }

    public createCourse(course: Course): Observable<any>{
        return this.http.post(`${API_URL}/create`, course);
    }
}
