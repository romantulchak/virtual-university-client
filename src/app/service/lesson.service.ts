import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LessonDTO } from '../dto/lesson.dto';
import { PageableDTO } from '../dto/pageable/pageable.dto';
import { ScheduleLessonRequestDTO } from '../dto/scheduleLessonRequest.dto';
import { Lesson } from '../model/lesson.model';
import { ChangeDecisionRequest } from '../request/changeDecisionRequest.request';
import { ChangeStatusRequest } from '../request/changeStatusRequest.request';
import {ChangeLessonStatusRequest} from '../request/change-lesson-status.request';

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

    public changeLessonStatus(changeLessonStatus: ChangeLessonStatusRequest): Observable<void>{
        return this.http.post<void>(`${API_URL}lesson/change-status-request`, changeLessonStatus);
    }

    public findLessonRequests(page: number):Observable<PageableDTO<ScheduleLessonRequestDTO[]>>{
        let params = new HttpParams();
        params = params.append('page', page.toString());
        return this.http.get<PageableDTO<ScheduleLessonRequestDTO[]>>(API_URL + 'lesson/getLessonRequests', {params: params});
    }
    public changeRequestDecision(changeDecisionRequest: ChangeDecisionRequest): Observable<any>{
        return this.http.put(API_URL + 'lesson/changeRequestDecision',changeDecisionRequest);
    }

    public changeRequestStatus(request: ChangeStatusRequest): Observable<any>{
        return this.http.put(API_URL + 'lesson/changeRequestStatus',request);
    }
}
