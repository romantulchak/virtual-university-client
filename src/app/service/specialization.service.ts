import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SemesterDTO } from "../dto/semester.dto";
import { SpecializationDTO } from "../dto/specialization.dto";
import { Specialization } from "../model/specialization.model";
import { Subject } from "../model/subject.model";

const API_URL = environment.api;

@Injectable({
    providedIn:'root'
})
export class SpecializationService{
    constructor(private httpClient: HttpClient){}

    public createSpecialization(specialization: Specialization):Observable<any>{
        return this.httpClient.post(API_URL + 'specialization/createSpecialization', specialization);
    }
    public getAllSpecializationForUser(studentId: number): Observable<SpecializationDTO[]>{
        return this.httpClient.get<SpecializationDTO[]>(API_URL + 'specialization/specializationForStudent/' + studentId);
    }
    public getTeacherSpecializations(id: number):Observable<SpecializationDTO[]>{
        return this.httpClient.get<SpecializationDTO[]>(API_URL + 'specialization/teacherSpecializations/' + id);
    }
    public getAllSpecializations():Observable<SpecializationDTO[]>{
        return this.httpClient.get<SpecializationDTO[]>(API_URL + 'specialization/findAllSpecializations');
    }
    public addSemesterToSpecialization(semesterId: number, specializationId: number): Observable<any>{
        return this.httpClient.put(`${API_URL}specialization/addSemesterToSpecialization/${semesterId}/${specializationId}`, null);
    }
    public addSubjectsToSpecialization(subjects: Subject[], specializationId: number):Observable<any>{
        return this.httpClient.put(API_URL + 'specialization/addSubjects/' + specializationId, subjects);
    }
}