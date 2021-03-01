import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SemesterDTO } from "../dto/semester.dto";
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
    
}