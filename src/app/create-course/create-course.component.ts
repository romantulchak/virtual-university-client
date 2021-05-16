import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course.model';
import { StatusEnum } from '../model/enum/status.enum';
import { CourseService } from '../service/course.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  constructor(private courseService: CourseService, private notificationService: NotificationService) { }

  public course: Course = new Course();
  ngOnInit(): void {
  }


  public createCourse(): void{
    this.courseService.createCourse(this.course).subscribe(
      res => {
        this.notificationService.showNotification(`Course: ${this.course.name} was created`, StatusEnum[StatusEnum.OK], StatusEnum["OK"]);
      },
      error=>{
        this.notificationService.showNotification(error.error.message, error.statusText, error.status);
      }
    );
  }

}
