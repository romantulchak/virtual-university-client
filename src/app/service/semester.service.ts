import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SemesterDTO } from '../dto/semester.dto';
import { Semester } from '../model/semester.model';

const API_URL = environment.api;

@Injectable({
    providedIn: 'root'
})
export class SemesterService{

    constructor(private http: HttpClient){}

    public createSemester(semester: Semester): Observable<any>{
       return this.http.post(API_URL + 'semester/createSemester', semester);
    }
    public getSemesters(): Observable<SemesterDTO[]>{
        return this.http.get<SemesterDTO[]>(API_URL + 'semester');
    }
    public getSemesterForStudent(specializationId: number, currentSemesterId: number): Observable<SemesterDTO>{
        return this.http.get<SemesterDTO>(API_URL + 'semester/findSemester/' + specializationId + '/' + currentSemesterId);
    }
    public getSemestersForSpecialization(specializetionId: number): Observable<SemesterDTO[]>{
        return this.http.get<SemesterDTO[]>(API_URL + 'semester/findSemestersForSpecialization/' + specializetionId);
    }
    public getSemestersForGroup(groupId: number):Observable<SemesterDTO[]>{
        return this.http.get<SemesterDTO[]>(API_URL + 'semester/findSemestersForGroup/' + groupId);
    }
}
