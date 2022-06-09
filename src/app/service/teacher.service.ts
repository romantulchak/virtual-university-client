import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubjectDTO } from '../dto/subject.dto';
import { TeacherDTO } from '../dto/teacher.dto';
import { Teacher } from '../model/teacher.model';
import { ResetPasswordRequest } from '../request/resetPasswordRequest.request';

const API_URL = `${environment.apiUrl}/teacher`;

@Injectable({
    providedIn: 'root'
})
export class TeacherService{
    constructor(private http: HttpClient){}

    public getAllTeachers(): Observable<TeacherDTO[]>{
        return this.http.get<TeacherDTO[]>(`${API_URL}`);
    }

    public getTeacherInformation(id: number): Observable<TeacherDTO>{
        return this.http.get<TeacherDTO>(`${API_URL}/find-teacher/${id}`);
    }

    public createTeacher(teacher: Teacher): Observable<any>{
        return this.http.post(`${API_URL}/create-teacher`, teacher);
    }

    public addSubjectsToTeacher(teacherId: number, subjects: SubjectDTO[]): Observable<void>{
        return this.http.put<void>(`${API_URL}/add-subjects-to-teacher/${teacherId}`, subjects);
    }

    public findTeachersBySubject(subjectId: number): Observable<TeacherDTO[]>{
        return this.http.get<TeacherDTO[]>(`${API_URL}/find-teachers-for-subject/${subjectId}`);
    }

    public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<void>{
        return this.http.put<void>(`${API_URL}/reset-password`, resetPasswordRequest);
    }
}
