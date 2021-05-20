import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SubjectTeacherGroupDTO } from "../dto/subjectTeacherGroup.dto";

const API_URL = environment.api;

@Injectable({
    providedIn:'root'
})
export class SubjectTeacherService{
    constructor(private http: HttpClient){}

    public findSubjectsForGroupBySemester(semesterId: number, groupId: number): Observable<SubjectTeacherGroupDTO[]>{
        return this.http.get<SubjectTeacherGroupDTO[]>(`${API_URL}subject-teacher/findSubjectsForGroupBySemester/${semesterId}/${groupId}`);
    }

    public findSubjectsForGroupByTeacherAndSemester(groupId: number, semesterId: number, teacherId: number):Observable<SubjectTeacherGroupDTO[]>{
        let params = new HttpParams();
        params = params.append('teacherId', teacherId.toString())
                        .append('groupId', groupId.toString())
                        .append('semesterId', semesterId.toString());
        return this.http.get<SubjectTeacherGroupDTO[]>(API_URL + 'subject-teacher/findSubjectsForGroupByTeacherAndSemester', {params: params});
    }
}