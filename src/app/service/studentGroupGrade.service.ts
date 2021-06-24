import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PageableDTO } from "../dto/pageable/pageable.dto";
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
    public getStudentGradesBySubjectAndGroupForTeacher(groupId: number, subjectId: number, teacherId: number, semesterId: number, page: number, size: number):Observable<PageableDTO<StudentGroupGradeDTO[]>>{
        let params = new HttpParams();
        params = params.append('teacherId', teacherId.toString())
                        .append('groupId', groupId.toString())
                        .append('subjectId', subjectId.toString())
                        .append('semesterId', semesterId.toString())
                        .append('page', page.toString())
                        .append('size', size.toString());
        return this.http.get<PageableDTO<StudentGroupGradeDTO[]>>(API_URL + 'student-group-grade/findForTeacher', {params: params});
    }
    public getStudentGrades(studentId: number, semesterId: number):Observable<StudentGroupGradeDTO[]>{
        let params = new HttpParams();
        params = params.append('studentId', studentId.toString())
                        .append('semesterId', semesterId.toString());
        return this.http.get<StudentGroupGradeDTO[]>(API_URL + 'student-group-grade/studentGrades', {params: params});
    }
    public getGradeForStudentBySubject(groupId: number, subjectId: number, studentId: number, semesterId: number):Observable<number>{
        let params = new HttpParams();
        params = params.append('groupId', groupId.toString())
                        .append('studentId', studentId.toString())
                        .append('subjectId', subjectId.toString())
                        .append('semesterId', semesterId.toString());
        return this.http.get<number>(API_URL + 'student-group-grade/findGradeForStudentBySubject', {params: params});
    }

    public findGradesForChart(groupId: number, subjectId: number, teacherId: number, semesterId: number):Observable<StudentGroupGradeDTO[]>{
        let params = new HttpParams();
        params = params.append('teacherId', teacherId.toString())
                        .append('groupId', groupId.toString())
                        .append('subjectId', subjectId.toString())
                        .append('semesterId', semesterId.toString());
        return this.http.get<StudentGroupGradeDTO[]>(API_URL + 'student-group-grade/findGradesForChart', {params: params});
    }

}