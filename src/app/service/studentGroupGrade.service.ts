import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StudentGroupGradeDTO } from "../dto/student-group-grade.dto";
import { StudentGroupGrade } from "../model/studentGroupGrade.model";


const API_URL = environment.api;

@Injectable({
    providedIn:'root'
})
export class StudentGroupGradeService{
    constructor(private http: HttpClient){}


    public setGrade(studentGroupGrades: StudentGroupGrade[]): Observable<any>{
        return this.http.post(API_URL + 'student-group-grade/setGrade', studentGroupGrades);
    }
    public getStudentGradesBySubjectAndGroupForTeacher(groupId: number, subjectId: number, teacherId: number):Observable<StudentGroupGradeDTO[]>{
        let params = new HttpParams();
        params = params.append('teacherId', teacherId.toString())
                        .append('groupId', groupId.toString())
                        .append('sbujectId', subjectId.toString());
        return this.http.get<StudentGroupGradeDTO[]>(API_URL + 'student-group-grade/findForTeacher', {params: params});
    }

}