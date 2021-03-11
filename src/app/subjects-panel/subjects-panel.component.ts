import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubjectDTO } from '../dto/subject.dto';
import { TeacherDTO } from '../dto/teacher.dto';
import { SubjectService } from '../service/subject.service';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'app-subjects-panel',
  templateUrl: './subjects-panel.component.html',
  styleUrls: ['./subjects-panel.component.scss']
})
export class SubjectsPanelComponent implements OnInit {

  constructor(private teacherService: TeacherService, private subjectService: SubjectService) { }
  public teachers: TeacherDTO[];
  public subjects: SubjectDTO[];
  public subjectsFormControl: FormControl = new FormControl();
  private currentTeacherId: number;
  ngOnInit(): void {
    this.getAllTeachers();
  }

  private getAllTeachers(){
    this.teacherService.getAllTeachers().subscribe(
      res=>{
        this.teachers = res;
      }
    )
  }

  public searchSubjects(id: number){
    this.subjectService.getAvailableSubjects(id).subscribe(
      res=>{
        this.subjects = res;
        console.log(res);
        this.currentTeacherId = id;
        
      }
    );
  }

  public addSubject(){
    console.log(this.subjectsFormControl.value);
    this.teacherService.addSubjectsToTeacher(this.currentTeacherId, this.subjectsFormControl.value).subscribe(
      res=>{
        console.log("Ok");
        
      }
    );
  }
}
