import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SubjectDTO } from "../dto/subject.dto";

const API_URL = environment.api;
@Injectable({
    providedIn:'root'
})
export class SubjectService{
    constructor(private http: HttpClient){

    }

    public getAllSubjects():Observable<SubjectDTO[]>{
       return this.http.get<SubjectDTO[]>(API_URL + 'subject');
    }
}