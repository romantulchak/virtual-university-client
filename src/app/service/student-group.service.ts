import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StudentGroup } from "../model/studentGroup.model";


const API_URL = environment.api;

@Injectable({
    providedIn:'root'
})
export class StudentGroupService{

    constructor(private http: HttpClient){}

    public create(studentGroup: StudentGroup):Observable<any>{
        return this.http.post(API_URL + 'student-group/create', studentGroup);
    }
}
    