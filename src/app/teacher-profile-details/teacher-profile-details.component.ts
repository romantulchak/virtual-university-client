import { Component, OnInit } from '@angular/core';
import { TeacherDTO } from '../dto/teacher.dto';
import { TeacherService } from '../service/teacher.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-teacher-profile-details',
  templateUrl: './teacher-profile-details.component.html',
  styleUrls: ['./teacher-profile-details.component.scss']
})
export class TeacherProfileDetailsComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private teacherService: TeacherService) { }
  private teacherId:number;
  public teacher: TeacherDTO;
  ngOnInit(): void {
    this.teacherId = this.tokenStorageService.getUser().id;
    this.getTeacherInforamtion();
  }

  private getTeacherInforamtion(){
    this.teacherService.getTeacherInformation(this.teacherId).subscribe(
      res=>{
        this.teacher = res;
      }
    );
  }

}
