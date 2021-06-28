import { Component, OnInit } from '@angular/core';
import { StudentDTO } from '../dto/student.dto';
import { ResetPasswordRequest } from '../request/resetPasswordRequest.request';
import { StudentService } from '../service/student.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-student-profile-details',
  templateUrl: './student-profile-details.component.html',
  styleUrls: ['./student-profile-details.component.scss']
})
export class StudentProfileDetailsComponent implements OnInit {
  private studentId;
  public student: StudentDTO;
  public hide: boolean = true;
  constructor(private studentService: StudentService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.studentId = this.tokenStorageService.getUser().id;
    this.getStudentInformation();
  }

  public getStudentInformation(){
    this.studentService.getStudentInformation(this.studentId).subscribe(
      res=>{
        if(res != null){
          this.student = res;
        }        
      }
    );
  }

 

}
