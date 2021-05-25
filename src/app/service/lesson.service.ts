import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LessonDTO } from '../dto/lesson.dto';
import { ScheduleLessonRequestDTO } from '../dto/scheduleLessonRequest.dto';
import { RequestStatusEnum } from '../model/enum/request.enum';
import { Lesson } from '../model/lesson.model';
import { ScheduleLessonRequest } from '../model/scheduleLessonRequest.model';

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
    
    public changeLessonStatus(teacherId: number, scheduleLessonRequest: ScheduleLessonRequest):Observable<any>{
        return this.http.post(`${API_URL}lesson/change-status-request/${scheduleLessonRequest.lesson.id}/${teacherId}`, scheduleLessonRequest);
    }
    
    public findLessonRequests(page: number):Observable<ScheduleLessonRequestDTO[]>{
        let params = new HttpParams();
        params = params.append('page', page.toString());
        return this.http.get<ScheduleLessonRequestDTO[]>(API_URL + 'lesson/getLessonRequests', {params: params});
    }
    public changeRequestStatus(requestId: number, decision: RequestStatusEnum): Observable<any>{
        let params = new HttpParams();
        params = params.append('requestId', requestId.toString())
                        .append('decision', decision.toString());
        return this.http.put(API_URL + 'lesson/changeRequestStatus',null ,{params: params});
    }
}
