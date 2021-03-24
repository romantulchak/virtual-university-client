import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StudentDTO } from "../dto/student.dto";
import { StudentGroupDTO } from "../dto/studentGroup.dto";
import { Student } from "../model/student.model";
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
    public addStudentsToGroup(students: StudentDTO[], groupId: number): Observable<any>{
        return this.http.put(API_URL + 'student-group/addStudents/' + groupId, students);
    }
    public findStudentGroup(studentId: number):Observable<StudentGroupDTO>{
        return this.http.get<StudentGroupDTO>(API_URL + 'student-group/findStudentGroup/' + studentId);
    }
    public findAllGroups():Observable<StudentGroupDTO[]>{
        return this.http.get<StudentGroupDTO[]>(API_URL + 'student-group');
    }
    public findGroupById(id: number):Observable<StudentGroupDTO>{
        return this.http.get<StudentGroupDTO>(API_URL + 'student-group/' + id)
    }

}
    