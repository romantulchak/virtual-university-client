import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentDTO } from '../dto/student.dto';

const API_URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  public getStudentInformation(id: number):Observable<StudentDTO>{
    return this.httpClient.get<StudentDTO>(API_URL + 'student/getStudentInformation/' + id);
  }
}
