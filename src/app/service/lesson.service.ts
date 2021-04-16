import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LessonDTO } from '../dto/lesson.dto';
import { Lesson } from '../model/lesson.model';

const API_URL = environment.api;

@Injectable({
    providedIn: 'root'
})
export class LessonService{

    public lesson: BehaviorSubject<LessonDTO> = new BehaviorSubject(null);

    constructor(private http: HttpClient){}

    public create(lesson: Lesson): Observable<LessonDTO>{
       return this.http.post<LessonDTO>(API_URL + 'lesson/create', lesson);
    }
    public delete(lessonId: number): Observable<any>{
        return this.http.delete(API_URL + 'lesson/delete/' + lessonId);
    }
}
