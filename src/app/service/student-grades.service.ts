import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentGroupDTO } from '../dto/studentGroup.dto';
import { TeacherSubjectStudentGradeLinkDTO } from '../dto/teacherSubjectStudentGradeLink.dto';
import { TeacherSubjectStudentGradeLinks } from '../model/teacherSubjectStudentGradeLinks.model';

const API_URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class StudentGradesService {

  constructor(private http: HttpClient) { }


  public createStudentGrades(studentGrades: TeacherSubjectStudentGradeLinks[]):Observable<any>{
    return this.http.post(API_URL + 'student-grades/create', studentGrades);
  }
  public getStudentGrades(studentId: number):Observable<TeacherSubjectStudentGradeLinkDTO[]>{
    return this.http.get<TeacherSubjectStudentGradeLinkDTO[]>(API_URL + 'student-grades/' + studentId);
  }
  public getStudentGradesForTeacher(teacherId: number, specializationId: number, semesterId:number):Observable<TeacherSubjectStudentGradeLinkDTO[]>{
    return this.http.get<TeacherSubjectStudentGradeLinkDTO[]>(`${API_URL}student-grades/findStudentGradesForTeacher/${teacherId}/${specializationId}/${semesterId}`);
  }
  public setGradeForStudent(studentGrade: TeacherSubjectStudentGradeLinkDTO):Observable<any>{
    return this.http.put(API_URL + 'student-grades/setGradeForStudent', studentGrade);
  }
  public studentGradesBySemester(studentId: number, semesterId: number):Observable<TeacherSubjectStudentGradeLinkDTO[]>{
    let params = new HttpParams();
    params = params.append('studentId', studentId.toString()).append('semesterId', semesterId.toString());
    return this.http.get<TeacherSubjectStudentGradeLinkDTO[]>(API_URL + 'student-grades/getStudentGrades', {params: params});
  }
}
