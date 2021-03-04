import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

}
