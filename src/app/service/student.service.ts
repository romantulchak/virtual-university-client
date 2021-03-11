import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentDTO } from '../dto/student.dto';
import { Student } from '../model/student.model';
import { ResetPasswordRequest } from '../request/resetPasswordRequest.request';

const API_URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  public getStudentInformation(id: number):Observable<StudentDTO>{
    return this.httpClient.get<StudentDTO>(API_URL + 'student/getStudentInformation/' + id);
  }
  public resetStudentPassowrd(resetPasswordRequest: ResetPasswordRequest):Observable<any>{
    return this.httpClient.put(API_URL + 'student/resetPassword', resetPasswordRequest);
  }
  public createStudent(student:Student):Observable<StudentDTO>{
    return this.httpClient.post<StudentDTO>(API_URL + 'student/createStudent', student);
  }

  public getStudentByName(firstName: string, lastName: string):Observable<StudentDTO[]>{
    let params = new HttpParams();
    params = params.append('firstName', firstName).append('lastName', lastName);
    return this.httpClient.get<StudentDTO[]>(API_URL + 'student/getStudentByName', {params: params});
  }
}
