import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { timeout } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { PageableDTO } from "../dto/pageable/pageable.dto";
import { SubjectDTO } from "../dto/subject.dto";
import { SubjectTeacherGroupDTO } from "../dto/subjectTeacherGroup.dto";
import { SubjectFile } from "../model/subject-file.model";
import { Subject } from "../model/subject.model";
import { TokenStorageService } from "./tokenStorage.service";

const API_URL = environment.api;
@Injectable({
    providedIn:'root'
})
export class SubjectService{
    private token: string;
    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService){
        this.token = this.tokenStorageService.getToken();
        
    }

    public getAllSubjects():Observable<SubjectDTO[]>{
       return this.http.get<SubjectDTO[]>(API_URL + 'subject');
    }

    public createSubject(subject: Subject, files: File[]): Observable<any>{
        let data = new FormData();
        let headers = new HttpHeaders();
        headers.append('Content-Type','multipart/form-data');
        this.appendFiles(files, data);
        data.append('subject', JSON.stringify(subject));
        return this.http.post(API_URL + 'subject/createSubject', data, {headers: headers});
    }
    public getAvailableSubjects(teacherId: number): Observable<SubjectDTO[]>{
        return this.http.get<SubjectDTO[]>(API_URL + 'subject/availableSubjects/' + teacherId);
    }
    public getSubjectsForTeacher(teacherId: number, page: number):Observable<PageableDTO<SubjectDTO[]>>{
        return this.http.get<PageableDTO<SubjectDTO[]>>(`${API_URL}subject/findTeacherSubjects/${teacherId}/${page}`);
    }
    public getAllForSpecialization(semesterId: number):Observable<SubjectDTO[]>{
        return this.http.get<SubjectDTO[]>(API_URL + 'subject/findAllForSpecialization/' + semesterId);
    }
    public getAvailableSubjectsForSpecializations(specializationId: number):Observable<SubjectDTO[]>{
        return this.http.get<SubjectDTO[]>(API_URL + 'subject/availableSubject/' + specializationId);
    }
    public getAvailableSubjectsForGroup(groupId: number):Observable<SubjectDTO[]>{
        return this.http.get<SubjectDTO[]>(`${API_URL}subject/availableSubjectForGroup/${groupId}`);
    }
    public getFilesForSubject(subjectId: number, groupId: number, semesterId: number, teacherId: number):Observable<SubjectFile[]>{
        let params = new HttpParams();
        params = params.append('subjectId', subjectId.toString())
                        .append('groupId', groupId.toString())
                        .append('semesterId', semesterId.toString())
                        .append('teacherId', teacherId.toString());
        return this.http.get<SubjectFile[]>(API_URL + 'subject/getFilesForSubject', {params: params});
    }

    public downloadFile(filename: string): Observable<Blob>{
        return this.http.get(API_URL + 'subject/downloadFile/' + filename, {responseType: 'blob'});
    }
    public findAllSubjectsWithTeachers():Observable<SubjectDTO[]>{
        return this.http.get<SubjectDTO[]>(API_URL + 'subject/findAllSubjectsWithTeachers');
    }
    public findAllSubjectsWithTeachersForSemester(semesterId: number){
        return this.http.get<SubjectDTO[]>(API_URL + 'subject/findAllSubjectsWithTeachersForSemester/' + semesterId);
    }
    public uploadTeacherFiles(files: File[], subjectId: number, groupId: number, semesterId: number):Observable<any>{
        let params = new HttpParams();
        params = params.append('subjectId', subjectId.toString())
                        .append('groupId', groupId.toString())
                        .append('semesterId', semesterId.toString());
        let data = new FormData();
        this.appendFiles(files, data);
        let headers = new HttpHeaders();
        headers.append('Content-Type','multipart/form-data');
        return this.http.post(API_URL + 'subject/uploadTeacherFile', data, {headers: headers, params: params});
    }

    public findTeacherFilesForSubject(subjectId: number, groupId: number, semesterId: number):Observable<any>{
        let params = new HttpParams();
        params = params.append('subjectId', subjectId.toString())
                        .append('groupId', groupId.toString())
                        .append('semesterId', semesterId.toString())
        return this.http.get<any>(API_URL + 'subject/findTeacherFiles', {params: params});
    }

    private appendFiles(files: File[], data:FormData){
        for (let file of files) {            
            data.append('file', file);
        }
    }
}