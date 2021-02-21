import { Component, OnInit } from '@angular/core';
import { StudentDTO } from '../dto/student.dto';
import { StudentService } from '../service/student.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  
  private studentId;
  public student: StudentDTO;
  constructor(private studentService: StudentService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.studentId = this.tokenStorageService.getUser().id;
    this.getStudentInformation();
  }



  public getStudentInformation(){
    this.studentService.getStudentInformation(this.studentId).subscribe(
      res=>{
        if(res != null)
          this.student = res;
      }
    );
    
  }

}
