import { Component, OnInit } from '@angular/core';
import { StudentDTO } from '../dto/student.dto';
import { ResetPasswordRequest } from '../request/resetPasswordRequest.request';
import { StudentService } from '../service/student.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  
    ngOnInit(){}

}
