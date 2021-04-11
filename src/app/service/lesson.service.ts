import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Lesson } from "../model/lesson.model";

const API_URL = environment.api;

@Injectable({
    providedIn:'root'
})
export class LessonService{
    constructor(private http: HttpClient){}

    public create(lesson: Lesson):Observable<any>{
       return this.http.post(API_URL + 'lesson/create', lesson);
    }
}