import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course.model';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  public course: Course = new Course();
  ngOnInit(): void {
  }


  public createCourse(){
    this.courseService.createCourse(this.course).subscribe(
      res=>{
        console.log("Create");
        
      }
    );
  }

}
