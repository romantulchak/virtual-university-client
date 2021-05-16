import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StudentDTO } from "../dto/student.dto";
import { StudentGroupDTO } from "../dto/studentGroup.dto";
import { SubjectTeacherGroupDTO } from "../dto/subjectTeacherGroup.dto";
import { Student } from "../model/student.model";
import { StudentGroup } from "../model/studentGroup.model";
import { SubjectTeacherGroup } from "../model/subjectTeacherGroup.model";


const API_URL = environment.api;

@Injectable({
    providedIn:'root'
})
export class StudentGroupService{

    constructor(private http: HttpClient){}

    public teacherCurrentGroup: BehaviorSubject<StudentGroupDTO> = new BehaviorSubject<StudentGroupDTO>(null)

    public create(studentGroup: StudentGroup):Observable<any>{
        return this.http.post(API_URL + 'student-group/create', studentGroup);
    }
    public addStudentsToGroup(students: StudentDTO[], groupId: number): Observable<any>{
        return this.http.put(API_URL + 'student-group/addStudents/' + groupId, students);
    }
    public findStudentGroup(studentId: number):Observable<StudentGroupDTO>{
        return this.http.get<StudentGroupDTO>(`${API_URL}student-group/findStudentGroup/${studentId}`);
    }
    public findAllGroups():Observable<StudentGroupDTO[]>{
        return this.http.get<StudentGroupDTO[]>(API_URL + 'student-group');
    }
    public findGroupById(id: number):Observable<StudentGroupDTO>{
        return this.http.get<StudentGroupDTO>(API_URL + 'student-group/' + id)
    }
    public addSubjectsToGroup(subjectTeacherGroup: SubjectTeacherGroup[], groupId: number):Observable<any>{
        return this.http.put(API_URL + 'student-group/addSubjects/' + groupId, subjectTeacherGroup);
    }
    public delete(id: number):Observable<any>{
        return this.http.delete(API_URL + 'student-group/deleteGroup/' + id);
    }
    public getGroupsForTeacher(id: number):Observable<StudentGroupDTO[]>{
        return this.http.get<StudentGroupDTO[]>(API_URL + 'student-group/groupsForTeacher/' + id);
    }
    public deleteStudentFromGroup(groupId: number, studentId: number):Observable<any>{
        let params = new HttpParams();
        params = params.append('groupId', groupId.toString()).append('studentId', studentId.toString());
        return this.http.delete(API_URL + 'student-group/deleteStudentFromGroup', {params: params});
    }
    public findSubjectsForGroup(groupId: number, semesterId: number):Observable<SubjectTeacherGroupDTO[]>{
        return this.http.get<SubjectTeacherGroupDTO[]>(`${API_URL}student-group/findSubjectsForGroup/${groupId}/${semesterId}`);
    }
    public changeGroupSemester(groupId: number, semesterId: number, subjects: SubjectTeacherGroup[]):Observable<any>{
        let params = new HttpParams();
        params = params.append('groupId', groupId.toString()).append('semesterId', semesterId.toString());
        return this.http.put(API_URL + 'student-group/changeGroupSemester', subjects, {params: params})
    }
    public findGroup(groupId: number):Observable<StudentGroupDTO>{
        return this.http.get<StudentGroupDTO>(API_URL + 'student-group/findGroup/' + groupId);
    }
}
    