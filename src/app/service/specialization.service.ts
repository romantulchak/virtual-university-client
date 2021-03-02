import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SemesterDTO } from "../dto/semester.dto";
import { SpecializationDTO } from "../dto/specialization.dto";
import { Specialization } from "../model/specialization.model";

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
}